function ready(fn) {
	if (document.readyState != "loading"){
		fn();
	} else {
		document.addEventListener("DOMContentLoaded", fn);
	}
}

function labor() {
	d3.select(".laborHour").attr("hidden", null);
}

ready(init);

function init() {
	var data1 = [
	{name:"Australia", value:1665},
	{name:"Austria", value:1625},
	{name:"Belgium", value:1541},
	{name:"Canada", value:1706},
	{name:"Chile", value:1988},
	{name:"Czech Republic", value:1779},
	{name:"Denmark", value:1457},
	{name:"Estonia", value:1852},
	{name:"Finland", value:1646},
	{name:"France", value:1482},
	{name:"Germany", value:1371},
	{name:"Greece", value:2042},
	{name:"Hungary", value:1749},
	{name:"Iceland", value:1880},
	{name:"Ireland", value:1820},
	{name:"Israel", value:1858},
	{name:"Italy", value:1725},
	{name:"Japan", value:1719},
	{name:"Korea", value:2113},
	{name:"Latvia", value:1903},
	{name:"Luxembourg", value:1507},
	{name:"Mexico", value:2246},
	{name:"Netherlands", value:1419},
	{name:"New Zealand", value:1757},
	{name:"Norway", value:1424},
	{name:"Poland", value:1963},
	{name:"Portugal", value:1868},
	{name:"Slovak Republic", value:1754},
	{name:"Slovenia", value:1676},
	{name:"Spain", value:1691},
	{name:"Sweden", value:1612},
	{name:"Switzerland", value:1590},
	{name:"United Kingdom", value:1674},
	{name:"United States", value:1790},
	{name:"OECD average", value:1766},
	];
	
	var svg = d3.select(".chart");
		
	var width = 600, height = 695;
	
	var laborLeftMargin = 150, laborTopMargin = 50;
	
	var x = d3.scale.linear()
		.domain([0, d3.max(data1, function(d){return d.value;})])
		.range([0, width]);
		
	var y = d3.scale.ordinal()
		.domain(data1.map(function (d) {
			return d.name;
		}))
		.rangeRoundBands([laborTopMargin, laborTopMargin + height], .5, 0);
	
	svg
		.selectAll("rect")
		.data(data1)
		.enter()
			.append("rect")
			.attr("y", laborTopMargin)
			.attr("width", function(d){
				return x(d.value);
			})
			.attr("height", 15)
			.style("fill", "steelblue")
			.attr("transform", function(d, i){
				return "translate(" + laborLeftMargin + ", " + i * 20 + ")";
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
		.attr("transform", "translate(" + laborLeftMargin + ", " + (laborTopMargin + height) + ")")
		.call(xAxis)
			.append("text")
			.attr("class", "label")
			.attr("x", width)
			.attr("y", -2)
			.style("text-anchor", "end")
			.style("font-weight", "bold")
			.text("hours");

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
			.attr("y", laborTopMargin - 5)
			.style("text-anchor", "start")
			.style("font-weight", "bold")
			.text("Nation");
			
	var chartTitle = svg.append("g")
		.attr("class", "title");
		
	chartTitle.append("text")
		.attr("x", (laborLeftMargin + width) / 2)
		.attr("y", 15)
		.attr("text-anchor", "middle")
		.style("font-size", "20px")
		.style("font-weight", "bold")
		.text("Average annual hours actually worked per worker")
}