import RelateComputer from './RelateComputer';
import GeometryGraphOperation from '../GeometryGraphOperation';
export default class RelateOp extends GeometryGraphOperation {
	constructor(...args) {
		super();
		this._relate = null;
		const overloaded = (...args) => {
			if (args.length === 2) {
				return ((...args) => {
					let [g0, g1] = args;
					super(g0, g1);
					this._relate = new RelateComputer(this.arg);
				})(...args);
			} else if (args.length === 3) {
				return ((...args) => {
					let [g0, g1, boundaryNodeRule] = args;
					super(g0, g1, boundaryNodeRule);
					this._relate = new RelateComputer(this.arg);
				})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static relate(...args) {
		if (args.length === 2) {
			let [a, b] = args;
			var relOp = new RelateOp(a, b);
			var im = relOp.getIntersectionMatrix();
			return im;
		} else if (args.length === 3) {
			let [a, b, boundaryNodeRule] = args;
			var relOp = new RelateOp(a, b, boundaryNodeRule);
			var im = relOp.getIntersectionMatrix();
			return im;
		}
	}
	getIntersectionMatrix() {
		return this._relate.computeIM();
	}
	getClass() {
		return RelateOp;
	}
}

