var data2 = [
	{name:"Australia", gdpph:47770, wage:21967.2, cont:"Oceania"},
	{name:"Belgium", gdpph:46701, wage:21170.2, cont:"Europe"},
	{name:"Canada", gdpph:44025, wage:16792.4, cont:"N.America"},
	{name:"Chile", gdpph:23311, wage:6998.3, cont:"S.America"},
	{name:"Czech Republic", gdpph:34704, wage:8399.1, cont:"Europe"},
	{name:"Estonia", gdpph:29378, wage:8595, cont:"Europe"},
	{name:"France", gdpph:41490, wage:20413.6, cont:"Europe"},
	{name:"Germany", gdpph:48839, wage:20847.4, cont:"Europe"},
	{name:"Greece", gdpph:26691, wage:11492.1, cont:"Europe"},
	{name:"Hungary", gdpph:26689, wage:9155.1, cont:"Europe"},
	{name:"Ireland", gdpph:70202, wage:18942.8, cont:"Europe"},
	{name:"Israel", gdpph:37915, wage:13059.7, cont:"Asia"},
	{name:"Japan", gdpph:41534, wage:15292.1, cont:"Asia"},
	{name:"Korea", gdpph:35921, wage:14440.9, cont:"Korea"},
	{name:"Latvia", gdpph:26044, wage:7829.6, cont:"Europe"},
	{name:"Luxembourg", gdpph:105768, wage:22836.1, cont:"Europe"},
	{name:"Mexico", gdpph:18583, wage:1895.7, cont:"N.America"},
	{name:"Netherlands", gdpph:50863, wage:22209.8, cont:"Europe"},
	{name:"New Zealand", gdpph:38833, wage:19346.4, cont:"Oceania"},
	{name:"Poland", gdpph:27464, wage:11977.5, cont:"Europe"},
	{name:"Portugal", gdpph:30612, wage:10941.1, cont:"Europe"},
	{name:"Slovak Republic", gdpph:30619, wage:8980, cont:"Europe"},
	{name:"Slovenia", gdpph:32888, wage:14520.8, cont:"Europe"},
	{name:"Spain", gdpph:36291, wage:12317.4, cont:"Europe"},
	{name:"Turkey", gdpph:24636, wage:12074.8, cont:"Asia"},
	{name:"United Kingdom", gdpph:42651, wage:17568.3, cont:"Europe"},
	{name:"United States", gdpph:57325, wage:14892.1, cont:"N.America"}
	];
	
	var svg = d3.select(".chart");

	var width = 500, height = 500;
	var leftMargin = 60, topMargin = 50;

	var x = d3.scale.linear()
		.domain([
			0,
			d3.max(data2, function(d){return d.gdpph;})
		])
		.range([leftMargin, leftMargin + width]);

	var y = d3.scale.linear()
		.domain([
			0,
			d3.max(data2, function(d){return d.wage;})
		])
		.range([topMargin + height, topMargin]);
		
	var color = d3.scale.ordinal()
		.domain(["Korea", "Asia", "Europe", "N.America", "S.America", "Oceania"])
		.range(["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33"]);

	svg
		.selectAll("circle")
		.data(data2)
			.enter()
				.append("circle")
				.attr("r", 3.5)
				.attr("cx", function(d) { return x(d.gdpph); })
				.attr("cy", function(d) { return y(d.wage); })
				.style("fill", function(d) { return color(d.cont); })
				
	svg
		.selectAll("circle")
			.on('mouseover', function(d, i) {
				tip.transition().duration(0)
				tip.style('top', y(d.y) - 20 + 'px')
				tip.style('left', x(d.x) + 'px')
				tip.style('display', 'block')
			})
			.on('mouseout', function(d, i) {
				tip.transition()
				.delay(500)
				.style('display', 'none');
			});

	var xAxis = d3.svg.axis()
			.scale(x)
			.tickSize(2)
			.orient("bottom");

	svg
		.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0, " + (topMargin + height) + ")")
		.call(xAxis)
			.append("text")
			.attr("class", "label")
			.attr("x", leftMargin + width)
			.attr("y", -2)
			.style("text-anchor", "end")
			.style("font-weight", "bold")
			.text("GDP per head(US dollar)");

	var yAxis = d3.svg.axis()
			.scale(y)
			.tickSize(2)
			.orient("left");

	svg
		.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(" + leftMargin + ", 0)")
		.call(yAxis)
			.append("text")
			.attr("class", "label")
			.attr("x", -60)
			.attr("y", topMargin - 7)
			.style("text-anchor", "start")
			.style("font-weight", "bold")
			.text("Real minimum wages(US dollar)");
		
	var legend = svg.selectAll("legend")
		.data(color.domain())
		.enter()
			.append("g")
			.attr("class", "legend")
			.attr("transform", function(d, i) {
				return "translate(0, " + (topMargin + i * 15) + ")";
			})
		
	legend.append("rect")
		.attr("x", leftMargin + width - 50)
		.attr("y", 100)
		.attr("width", 12)
		.attr("height", 12)
		.style("fill", color);
	legend.append("text")
		.attr("x", leftMargin + width - 35)
		.attr("y", 105)
		.attr("dy", ".35em")
		.style("text-anchor", "start")
		.text(function(d) { return d;});
		
	var chartTitle = svg.append("g")
		.attr("class", "title");
		
	chartTitle.append("text")
		.attr("x", (laborLeftMargin + laborWidth) / 2)
		.attr("y", 15)
		.attr("text-anchor", "middle")
		.style("font-size", "20px")
		.style("font-weight", "bold")
		.text("Production cost / Rating chart for movies")