import CoordinateList from '../../geom/CoordinateList';
import CoordinateArrays from '../../geom/CoordinateArrays';
import ArrayList from '../../../../../java/util/ArrayList';
export default class EdgeString {
	constructor(...args) {
		this.factory = null;
		this.directedEdges = new ArrayList();
		this.coordinates = null;
		if (args.length === 1) {
			let [factory] = args;
			this.factory = factory;
		}
	}
	get interfaces_() {
		return [];
	}
	getCoordinates() {
		if (this.coordinates === null) {
			var forwardDirectedEdges = 0;
			var reverseDirectedEdges = 0;
			var coordinateList = new CoordinateList();
			for (var i = this.directedEdges.iterator(); i.hasNext(); ) {
				var directedEdge = i.next();
				if (directedEdge.getEdgeDirection()) {
					forwardDirectedEdges++;
				} else {
					reverseDirectedEdges++;
				}
				coordinateList.add(directedEdge.getEdge().getLine().getCoordinates(), false, directedEdge.getEdgeDirection());
			}
			this.coordinates = coordinateList.toCoordinateArray();
			if (reverseDirectedEdges > forwardDirectedEdges) {
				CoordinateArrays.reverse(this.coordinates);
			}
		}
		return this.coordinates;
	}
	toLineString() {
		return this.factory.createLineString(this.getCoordinates());
	}
	add(directedEdge) {
		this.directedEdges.add(directedEdge);
	}
	getClass() {
		return EdgeString;
	}
}

