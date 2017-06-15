function ready(fn) {
	if (document.readyState != "loading"){
		fn();
	} else {
		document.addEventListener("DOMContentLoaded", fn);
	}
}

function labor() {
	d3.select(".minWage").attr("hidden", null);
}

ready(init);

function init() {
	var data1 = [
	{name:"Australia", value:21967.2},
	{name:"Belgium", value:21170.2},
	{name:"Canada", value:16792.4},
	{name:"Chile", value:6998.3},
	{name:"Czech Republic", value:8399.1},
	{name:"Estonia", value:8595.0},
	{name:"France", value:20413.6},
	{name:"Germany", value:20847.4},
	{name:"Greece", value:11492.1},
	{name:"Hungary", value:9155.1},
	{name:"Ireland", value:18942.8},
	{name:"Israel", value:13059.7},
	{name:"Japan", value:15292.1},
	{name:"Korea", value:14440.9},
	{name:"Latvia", value:7829.6},
	{name:"Luxembourg", value:22836.1},
	{name:"Mexico", value:1895.7},
	{name:"Netherlands", value:22209.8},
	{name:"New Zealand", value:19346.4},
	{name:"Poland", value:11977.5},
	{name:"Portugal", value:10941.1},
	{name:"Slovak Republic", value:8980.0},
	{name:"Slovenia", value:14520.8},
	{name:"Spain", value:12317.4},
	{name:"Turkey", value:12074.8},
	{name:"United Kingdom", value:17568.3},
	{name:"United States", value:14892.1}	
	];
	
	var svg = d3.select(".chart");
		
	var width = 600, height = 535;
	
	var leftMargin = 150, topMargin = 50;
	
	var x = d3.scale.linear()
		.domain([0, d3.max(data1, function(d){return d.value;})])
		.range([0, width]);
		
	var y = d3.scale.ordinal()
		.domain(data1.map(function (d) {
			return d.name;
		}))
		.rangeRoundBands([topMargin, topMargin + height], .5, 0);
	
	svg
		.selectAll("rect")
		.data(data1)
		.enter()
			.append("rect")
			.attr("y", topMargin)
			.attr("width", function(d){
				return x(d.value);
			})
			.attr("height", 15)
			.style("fill", "steelblue")
			.attr("transform", function(d, i){
				return "translate(" + leftMargin + ", " + i * 20 + ")";
			})
			.selectAll("text")
			.append("text")

	var xAxis = d3.svg.axis()
		.scale(x)
		.tickSize(2)
		.orient("bottom");

	svg
		.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(" + leftMargin + ", " + (topMargin + height) + ")")
		.call(xAxis)
			.append("text")
			.attr("class", "label")
			.attr("x", width)
			.attr("y", -2)
			.style("text-anchor", "end")
			.style("font-weight", "bold")
			.text("US Dollar");

	var yAxis = d3.svg.axis()
		.scale(y)
		.tickSize(2)
		.orient("left");

	svg
		.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(150, 0)")
		.call(yAxis)
			.append("text")
			.attr("class", "label")
			.attr("x", -30)
			.attr("y", topMargin - 5)
			.style("text-anchor", "start")
			.style("font-weight", "bold")
			.text("Nation");
			
	var chartTitle = svg.append("g")
		.attr("class", "title");
		
	chartTitle.append("text")
		.attr("x", (leftMargin + width) / 2)
		.attr("y", 15)
		.attr("text-anchor", "middle")
		.style("font-size", "20px")
		.style("font-weight", "bold")
		.text("Real minimum wages")
}