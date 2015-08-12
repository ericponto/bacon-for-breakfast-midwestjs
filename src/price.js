/** @jsx m */

import Bacon from "baconjs";
import m from "mithril";

import {selectedItem} from "./type";
import {total} from "./counter";

var view = (price) => {
	return <strong>Total Price: ${price}</strong>
};

export default Bacon.combineWith((selected, count) => selected.price * count,
		selectedItem, total
	)
	.startWith(0)
	.map(val => val.toFixed(2))
	.map(view);