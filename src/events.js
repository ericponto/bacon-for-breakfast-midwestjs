import Bacon from "baconjs";

export var click = Bacon.fromEvent(document.body, "click");
export var keyup = Bacon.fromEvent(document.body, "keyup");

export var matches = (selector) => {
	return (e) => e.target.matches(selector);
}
