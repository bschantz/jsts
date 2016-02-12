import Root from './Root';
import Interval from './Interval';
import ArrayList from '../../../../../java/util/ArrayList';
export default class Bintree {
	constructor(...args) {
		this.root = null;
		this.minExtent = 1.0;
		if (args.length === 0) {
			let [] = args;
			this.root = new Root();
		}
	}
	get interfaces_() {
		return [];
	}
	static ensureExtent(itemInterval, minExtent) {
		var min = itemInterval.getMin();
		var max = itemInterval.getMax();
		if (min !== max) return itemInterval;
		if (min === max) {
			min = min - minExtent / 2.0;
			max = min + minExtent / 2.0;
		}
		return new Interval(min, max);
	}
	size() {
		if (this.root !== null) return this.root.size();
		return 0;
	}
	insert(itemInterval, item) {
		this.collectStats(itemInterval);
		var insertInterval = Bintree.ensureExtent(itemInterval, this.minExtent);
		this.root.insert(insertInterval, item);
	}
	query(...args) {
		if (args.length === 1) {
			if (typeof args[0] === "number") {
				let [x] = args;
				return this.query(new Interval(x, x));
			} else if (args[0] instanceof Interval) {
				let [interval] = args;
				var foundItems = new ArrayList();
				this.query(interval, foundItems);
				return foundItems;
			}
		} else if (args.length === 2) {
			let [interval, foundItems] = args;
			this.root.addAllItemsFromOverlapping(interval, foundItems);
		}
	}
	iterator() {
		var foundItems = new ArrayList();
		this.root.addAllItems(foundItems);
		return foundItems.iterator();
	}
	remove(itemInterval, item) {
		var insertInterval = Bintree.ensureExtent(itemInterval, this.minExtent);
		return this.root.remove(insertInterval, item);
	}
	collectStats(interval) {
		var del = interval.getWidth();
		if (del < this.minExtent && del > 0.0) this.minExtent = del;
	}
	depth() {
		if (this.root !== null) return this.root.depth();
		return 0;
	}
	nodeSize() {
		if (this.root !== null) return this.root.nodeSize();
		return 0;
	}
	getClass() {
		return Bintree;
	}
}

