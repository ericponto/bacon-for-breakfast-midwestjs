/** @jsx m */

import Bacon from "baconjs";
import m from "mithril";

import {click, matches} from "./events";
import {sum} from "./utils";

var view = (total) => {
	return <div className="input-group">
		<div className="input-group-btn">
			<button className="btn btn-primary minus">-</button>
		</div>
		<input type="text" className="form-control" id="count" value={total} readonly/>
		<div className="input-group-btn">
			<button className="btn btn-primary plus">+</button>
		</div>
	</div>
}


var minus = click
	.filter(matches(".minus"))
	.map(-1);

var plus = click
	.filter(matches(".plus"))
	.map(1);

export var total = minus.merge(plus)
	.scan(0, sum);

export default total.map(view);
