import LineString from '../geom/LineString';
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import LinearLocation from './LinearLocation';
import LocationIndexOfPoint from './LocationIndexOfPoint';
import LocationIndexOfLine from './LocationIndexOfLine';
import ExtractLineByLocation from './ExtractLineByLocation';
import MultiLineString from '../geom/MultiLineString';
export default class LocationIndexedLine {
	constructor(...args) {
		this.linearGeom = null;
		if (args.length === 1) {
			let [linearGeom] = args;
			this.linearGeom = linearGeom;
			this.checkGeometryType();
		}
	}
	get interfaces_() {
		return [];
	}
	clampIndex(index) {
		var loc = index.clone();
		loc.clamp(this.linearGeom);
		return loc;
	}
	project(pt) {
		return LocationIndexOfPoint.indexOf(this.linearGeom, pt);
	}
	checkGeometryType() {
		if (!(this.linearGeom instanceof LineString || this.linearGeom instanceof MultiLineString)) throw new IllegalArgumentException("Input geometry must be linear");
	}
	extractPoint(...args) {
		if (args.length === 1) {
			let [index] = args;
			return index.getCoordinate(this.linearGeom);
		} else if (args.length === 2) {
			let [index, offsetDistance] = args;
			var indexLow = index.toLowest(this.linearGeom);
			return indexLow.getSegment(this.linearGeom).pointAlongOffset(indexLow.getSegmentFraction(), offsetDistance);
		}
	}
	isValidIndex(index) {
		return index.isValid(this.linearGeom);
	}
	getEndIndex() {
		return LinearLocation.getEndLocation(this.linearGeom);
	}
	getStartIndex() {
		return new LinearLocation();
	}
	indexOfAfter(pt, minIndex) {
		return LocationIndexOfPoint.indexOfAfter(this.linearGeom, pt, minIndex);
	}
	extractLine(startIndex, endIndex) {
		return ExtractLineByLocation.extract(this.linearGeom, startIndex, endIndex);
	}
	indexOf(pt) {
		return LocationIndexOfPoint.indexOf(this.linearGeom, pt);
	}
	indicesOf(subLine) {
		return LocationIndexOfLine.indicesOf(this.linearGeom, subLine);
	}
	getClass() {
		return LocationIndexedLine;
	}
}

