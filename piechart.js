window.onload = () => {

    const generateDoughnut = (disp_data) => {

        d3.select("#piechart_button_placeholder")
            .selectAll("input")
            .data(["2018", "2019", "2020"])
            .enter()
            .append("input")
            .attr("type", "button")
            .attr("class", "btn btn-success mx-1")
            .attr("value", (d) => {
                return d;
            })
            .style("font-weight", 500)
            .on("click", (_, d) => {

                year = parseInt(d);

                if (year == 2018) {
                    myData = disp_data.filter((d) => {
                        return d.year == 2018
                    })
                } else if (year == 2019) {
                    myData = disp_data.filter((d) => {
                        return d.year == 2019
                    })
                } else {
                    myData = disp_data.filter((d) => {
                        return d.year == 2020
                    })
                }

                // appends pie chart to svg
                var arcs = svg.selectAll("g.arc")
                    .data(pie([]))
                    .join("g");

                arcs = svg.selectAll("g.arc")
                    .data(pie(myData))
                    .join("g");

                arcs.merge(arcs)
                    .attr("class", "arc")
                    .attr("transform", `translate(${width / 2},${height / 3})`)
                    .append("path")
                    .attr("fill", function (d, i) {
                        return color(i);
                    })
                    .attr("d", function (d, i) {
                        return arc(d, i)
                    })
                    .on("mouseover", function (event, d) {
                        d3.select(this)
                            .attr("opacity", 1)
                    })
                    .on("mouseout", function (event, d) {
                        d3.select(this)
                            .attr("opacity", 1)
                    })
                    .append("title")
                    .text((d) => {
                        return `${d.data.name} ${d.data.value} MW`
                    })
            })
    }

    const generatePieChartInUK = (disp_data) => {
        var year = 2018
        var width = 1200;
        var height = 1200;
        var outerRadius = 300;
	    var innerRadius = 0;

        var myData = disp_data.filter((d) => {
            return d.year == 2018
        })

        // define color for each catogory
        var color = d3.scaleOrdinal(d3.schemeCategory10);

        // defines the arc of the pie cart
        var arc = d3.arc()
        .outerRadius(outerRadius)
        .innerRadius(innerRadius);

        // define d3 pie chart object
        var pie = d3.pie()
            .value(d => d.value)
            .sort(d => d.name)

        // selects myPieChart area from html.
        var svg = d3.select("#piechart-uk")
            .append("svg")
            .attr("width", width)
            .attr("height", height)

        // appends pie chart to svg
        var arcs = svg.selectAll("g.arc")
            .data(pie(myData))
            .enter()
            .append("g")
            .attr("class", "arc")
            .attr("transform", `translate(${width / 2},${height / 3})`)
            .append("path")
            .attr("fill", function (d, i) {
                return color(i);
            })
            .attr("d", function (d, i) {
                return arc(d, i)
            })
            .on("mouseover", function (event, d) {
                d3.select(this)
                    .attr("opacity", 0.7)
            })
            .on("mouseout", function (event, d) {
                d3.select(this)
                    .attr("opacity", 1)
            })
            .append("title")
            .text((d) => {
                return `${d.data.name} ${d.data.value} MW covers only ${d3.format(".1%")(d.value / d3.sum(pie(myData), d => d.value))}`
            })

        svg.selectAll("rect")
            .data(myData)
            .enter()
            .append("rect")
            .attr("fill", (_, i) => {
                return color(i)
            })
            .attr('width', 10)
            .attr('height', 10)
            .attr('x', 950)
            .attr('y', (_, i) => {
                return (i + 1) * 50;
            })

        svg.selectAll("text.second")
            .data(myData)
            .enter()
            .append("text")
            .text((d) => {
                return d.name
            })
            .attr("font-size", 12)
            .attr('x', 1000)
            .attr('y', (_, i) => {
                return (i + 1) * 50;
            })

        d3.select("#piechart-uk-input")
            .selectAll("input")
            .data(["2018", "2019", "2020"])
            .enter()
            .append("input")
            .attr("type", "button")
            .attr("class", "btn btn-success mx-1")
            .attr("value", (d) => {
                return d;
            })
            .style("font-weight", 50)
            .on("click", (_, d) => {

                year = parseInt(d);

                if (year == 2018) {
                    myData = disp_data.filter((d) => {
                        return d.year == 2018
                    })
                } else if (year == 2019) {
                    myData = disp_data.filter((d) => {
                        return d.year == 2019
                    })
                } else {
                    myData = disp_data.filter((d) => {
                        return d.year == 2020
                    })
                }

                // appends pie chart to svg
                var arcs = svg.selectAll("g.arc")
                    .data(pie([]))
                    .join("g");

                arcs = svg.selectAll("g.arc")
                    .data(pie(myData))
                    .join("g");

                arcs.merge(arcs)
                    .attr("class", "arc")
                    .attr("transform", `translate(${width / 2},${height / 3})`)
                    .append("path")
                    .attr("fill", function (d, i) {
                        return color(i);
                    })
                    .attr("d", function (d, i) {
                        return arc(d, i)
                    })
                    .on("mouseover", function (event, d) {
                        d3.select(this)
                            .attr("opacity", 0.7)
                    })
                    .on("mouseout", function (event, d) {
                        d3.select(this)
                            .attr("opacity", 1)
                    })
                    .append("title")
                    .text((d) => {
                        return `${d.data.name} ${d.data.value} MW covers only ${d3.format(".1%")(d.value / d3.sum(pie(myData), d => d.value))}`
                    })
            })
    }

    d3.csv("piechart.csv", (d) => {
        return {
            name: d.source,
            value: parseFloat(d.energy),
            year: parseInt(d.year)
        }
    }).then((data) => {
        generatePieChartInUK(data);
    })
}