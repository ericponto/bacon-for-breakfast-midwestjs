var express = require("express");
var app = express();
var _ = require("lodash");

app.use(express.static("./"));

var fuzzy = require("fuzzy-filter");

const TYPES = [
	{name: "Applewood", price: "0.50"},
	{name: "Bourbon", price: "0.75"},
	{name: "Cajun", price: "0.60"},
	{name: "Canadian", price: "0.55"},
	{name: "Candied", price: "1.00"},
	{name: "Cottage", price: "0.25"},
	{name: "Country", price: "1.05"},
	{name: "Hickory", price: "0.80"},
	{name: "Honey Barbeque", price: "0.35"},
	{name: "Jalapeno", price: "0.45"},
	{name: "Maple", price: "0.95"},
	{name: "Pancetta", price: "1.15"},
	{name: "Peppered", price: "0.65"},
	{name: "Pork Belly", price: "1.05"},
	{name: "Slab", price: "3.50"},
	{name: "Thick Cut", price: "1.10"},
	{name: "Turkey", price: "0.35"}
];

app.get("/types", function(req, res) {
	var q = req.query.q;

	if (q && q.length) {
		var typeNames = _.pluck(TYPES, "name");
		var matchedNames = fuzzy(q, typeNames) || [];

		res.send(_.filter(TYPES, function(type) {
			return _.indexOf(matchedNames, type.name) > -1;
		}));
	} else {
		res.send(TYPES);
	}
});

var server = app.listen(3333, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log("Example app listening at http://%s:%s", host, port);
});