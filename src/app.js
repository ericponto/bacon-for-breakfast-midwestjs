/** @jsx m */

import Bacon from "baconjs";
import m from "mithril";

import Header from "./header";
import Counter from "./counter";
import Type from "./type";
import Price from "./price";


Bacon.onValues(Header, Counter, Type, Price,
	(header, counter, type, price) => m.render(document.body, 
		<div id="app">
			{header}
			<div className="container">
				<div className="form-group">
					<label for="type">Select type of bacon:</label>
					{type}
				</div>
				<div className="form-group">
					<label for="count">Pieces of bacon:</label>
					{counter}
				</div>
				{price}
			</div>
		</div>
))