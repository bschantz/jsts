import DistanceToPointFinder from './DistanceToPointFinder';
import CoordinateFilter from '../../../geom/CoordinateFilter';
import Coordinate from '../../../geom/Coordinate';
import PointPairDistance from './PointPairDistance';
import CoordinateSequenceFilter from '../../../geom/CoordinateSequenceFilter';
export default class BufferCurveMaximumDistanceFinder {
	constructor(...args) {
		this.inputGeom = null;
		this.maxPtDist = new PointPairDistance();
		if (args.length === 1) {
			let [inputGeom] = args;
			this.inputGeom = inputGeom;
		}
	}
	get interfaces_() {
		return [];
	}
	static get MaxPointDistanceFilter() {
		return MaxPointDistanceFilter;
	}
	static get MaxMidpointDistanceFilter() {
		return MaxMidpointDistanceFilter;
	}
	computeMaxMidpointDistance(curve) {
		var distFilter = new MaxMidpointDistanceFilter(this.inputGeom);
		curve.apply(distFilter);
		this.maxPtDist.setMaximum(distFilter.getMaxPointDistance());
	}
	computeMaxVertexDistance(curve) {
		var distFilter = new MaxPointDistanceFilter(this.inputGeom);
		curve.apply(distFilter);
		this.maxPtDist.setMaximum(distFilter.getMaxPointDistance());
	}
	findDistance(bufferCurve) {
		this.computeMaxVertexDistance(bufferCurve);
		this.computeMaxMidpointDistance(bufferCurve);
		return this.maxPtDist.getDistance();
	}
	getDistancePoints() {
		return this.maxPtDist;
	}
	getClass() {
		return BufferCurveMaximumDistanceFinder;
	}
}
class MaxPointDistanceFilter {
	constructor(...args) {
		this.maxPtDist = new PointPairDistance();
		this.minPtDist = new PointPairDistance();
		this.geom = null;
		if (args.length === 1) {
			let [geom] = args;
			this.geom = geom;
		}
	}
	get interfaces_() {
		return [CoordinateFilter];
	}
	filter(pt) {
		this.minPtDist.initialize();
		DistanceToPointFinder.computeDistance(this.geom, pt, this.minPtDist);
		this.maxPtDist.setMaximum(this.minPtDist);
	}
	getMaxPointDistance() {
		return this.maxPtDist;
	}
	getClass() {
		return MaxPointDistanceFilter;
	}
}
class MaxMidpointDistanceFilter {
	constructor(...args) {
		this.maxPtDist = new PointPairDistance();
		this.minPtDist = new PointPairDistance();
		this.geom = null;
		if (args.length === 1) {
			let [geom] = args;
			this.geom = geom;
		}
	}
	get interfaces_() {
		return [CoordinateSequenceFilter];
	}
	filter(seq, index) {
		if (index === 0) return null;
		var p0 = seq.getCoordinate(index - 1);
		var p1 = seq.getCoordinate(index);
		var midPt = new Coordinate((p0.x + p1.x) / 2, (p0.y + p1.y) / 2);
		this.minPtDist.initialize();
		DistanceToPointFinder.computeDistance(this.geom, midPt, this.minPtDist);
		this.maxPtDist.setMaximum(this.minPtDist);
	}
	isDone() {
		return false;
	}
	isGeometryChanged() {
		return false;
	}
	getMaxPointDistance() {
		return this.maxPtDist;
	}
	getClass() {
		return MaxMidpointDistanceFilter;
	}
}

