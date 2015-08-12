/** @jsx m */

import Bacon from "baconjs";
import m from "mithril";

import {click, keyup, matches} from "./events";

var query = (term) => Bacon.fromPromise(m.request({method: "GET", url: `/types?q=${term}`}));

var view = (results, data) => {
	return <div className={(results.length && !data.selected ? "open " : "") + "dropdown"}>
		<input type="text" className="form-control" id="type" value={data.name} />
		<ul className="dropdown-menu">
			{results}
		</ul>
	</div>
};

var li = (item) => <li><a href="#" data-name={item.name} data-price={item.price}>{item.name} - ${item.price}</a></li>;

var inputValue = keyup
	.filter(matches("#type"))
	.map(".target.value")
	.startWith("");

var results = inputValue
	.filter(val => val.length > 1)
	.debounce(200)
	.flatMapLatest(query)
	.startWith([])
	.map(items => items.map(li));

export var selectedItem = click
	.filter(matches(".dropdown-menu a"))
	.map(".target.dataset")
	.startWith({ name: "", price: 0 });

var data = Bacon.when(
	[selectedItem], (item) => { 
		return {selected: true, name: item.name, price: item.price };
	},
	[inputValue], (value) => { 
		return {selected: !value.length, name: value, price: 0 };
	}
);

export default Bacon.combineWith(view, results, data);