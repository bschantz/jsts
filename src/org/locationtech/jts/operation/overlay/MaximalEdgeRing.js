import MinimalEdgeRing from './MinimalEdgeRing';
import EdgeRing from '../../geomgraph/EdgeRing';
import ArrayList from '../../../../../java/util/ArrayList';
export default class MaximalEdgeRing extends EdgeRing {
	constructor(...args) {
		super();
		if (args.length === 2) {
			let [start, geometryFactory] = args;
			super(start, geometryFactory);
		}
	}
	get interfaces_() {
		return [];
	}
	buildMinimalRings() {
		var minEdgeRings = new ArrayList();
		var de = this.startDe;
		do {
			if (de.getMinEdgeRing() === null) {
				var minEr = new MinimalEdgeRing(de, this.geometryFactory);
				minEdgeRings.add(minEr);
			}
			de = de.getNext();
		} while (de !== this.startDe);
		return minEdgeRings;
	}
	setEdgeRing(de, er) {
		de.setEdgeRing(er);
	}
	linkDirectedEdgesForMinimalEdgeRings() {
		var de = this.startDe;
		do {
			var node = de.getNode();
			node.getEdges().linkMinimalDirectedEdges(this);
			de = de.getNext();
		} while (de !== this.startDe);
	}
	getNext(de) {
		return de.getNext();
	}
	getClass() {
		return MaximalEdgeRing;
	}
}

