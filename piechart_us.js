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
            .style("font-weight", 300)
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
        var height = 1000;
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
        var svg = d3.select("#piechart-us")
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

        d3.select("#piechart-us-input")
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

    d3.csv("US_data.csv", (d) => {
        return {
            name: d.source,
            value: parseFloat(d.energy),
            year: parseInt(d.year)
        }
    }).then((data) => {
        generatePieChartInUK(data);
    })

//----------------map ------------------------------------
        var w = 1200;
          var h = 1000;
      
        var projection = d3.geoMercator()
                            .center([-90, 30])
                            .translate([w/2, h/2])
                            .scale(400);
      
        var color = d3.scaleQuantize()
                      .range(["#fff7ec","#fff7eb","#fff6ea","#fff6e9","#fff5e7","#fff5e6","#fff4e5","#fff4e4","#fff3e3","#fff3e2","#fff2e1","#fff2e0","#fff1de","#fff1dd","#fff0dc","#fff0db","#feefda","#feefd9","#feeed7","#feeed6","#feedd5","#feedd4","#feecd3","#feecd2","#feebd0","#feebcf","#feeace","#feeacd","#fee9cc","#fee9ca","#fee8c9","#fee8c8","#fee7c7","#fee7c6","#fee6c4","#fee5c3","#fee5c2","#fee4c1","#fee4bf","#fee3be","#fee3bd","#fee2bc","#fee1ba","#fee1b9","#fee0b8","#fee0b7","#fedfb5","#fedeb4","#fedeb3","#fdddb2","#fddcb1","#fddcaf","#fddbae","#fddaad","#fddaac","#fdd9ab","#fdd8a9","#fdd8a8","#fdd7a7","#fdd6a6","#fdd6a5","#fdd5a4","#fdd4a3","#fdd4a1","#fdd3a0","#fdd29f","#fdd29e","#fdd19d","#fdd09c","#fdcf9b","#fdcf9a","#fdce99","#fdcd98","#fdcc97","#fdcc96","#fdcb95","#fdca94","#fdc994","#fdc893","#fdc892","#fdc791","#fdc690","#fdc58f","#fdc48e","#fdc38d","#fdc28c","#fdc18b","#fdc08a","#fdbf89","#fdbe88","#fdbd87","#fdbc86","#fdbb85","#fdba84","#fdb983","#fdb882","#fdb781","#fdb680","#fdb57f","#fdb47d","#fdb27c","#fdb17b","#fdb07a","#fdaf79","#fdae78","#fdac76","#fdab75","#fdaa74","#fca873","#fca772","#fca671","#fca46f","#fca36e","#fca26d","#fca06c","#fc9f6b","#fc9e6a","#fc9c68","#fc9b67","#fb9a66","#fb9865","#fb9764","#fb9563","#fb9462","#fb9361","#fb9160","#fa905f","#fa8f5e","#fa8d5d","#fa8c5c","#f98b5b","#f9895a","#f98859","#f98759","#f88558","#f88457","#f88356","#f78155","#f78055","#f77f54","#f67d53","#f67c52","#f67b52","#f57951","#f57850","#f4774f","#f4754f","#f4744e","#f3734d","#f3714c","#f2704c","#f26f4b","#f16d4a","#f16c49","#f06b49","#f06948","#ef6847","#ef6646","#ee6545","#ed6344","#ed6243","#ec6042","#ec5f42","#eb5d41","#ea5c40","#ea5a3f","#e9593e","#e8573c","#e8563b","#e7543a","#e65339","#e65138","#e55037","#e44e36","#e44c35","#e34b34","#e24932","#e14831","#e04630","#e0442f","#df432e","#de412d","#dd402b","#dc3e2a","#dc3c29","#db3b28","#da3927","#d93826","#d83624","#d73423","#d63322","#d53121","#d43020","#d32e1f","#d22c1e","#d12b1d","#d0291b","#cf281a","#ce2619","#cd2518","#cc2317","#cb2216","#ca2015","#c91f14","#c81d13","#c71c12","#c61b11","#c51911","#c31810","#c2170f","#c1150e","#c0140d","#bf130c","#be120c","#bc110b","#bb100a","#ba0e09","#b80d09","#b70c08","#b60b07","#b50b07","#b30a06","#b20906","#b10805","#af0705","#ae0704","#ac0604","#ab0504","#a90503","#a80403","#a60402","#a50302","#a40302","#a20302","#a00201","#9f0201","#9d0201","#9c0101","#9a0101","#990101","#970101","#960100","#940100","#920000","#910000","#8f0000","#8e0000","#8c0000","#8a0000","#890000","#870000","#860000","#840000","#820000","#810000","#7f0000"]);
      
        var path = d3.geoPath()
                      .projection(projection);
      
        var svg = d3.select("#choroplethUS")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h)
                    .attr("fill", "grey");
      
        d3.csv("usa_data_map.csv").then(function(data){
      
            color.domain([
              d3.min(data, function(d){ return d.Total;}),
              d3.max(data, function(d){ return d.Total;})
            ]);
      
            d3.json("us-state.json").then(function(json){
      
              // Loop through once for each Total data value
              for(var i = 0; i < data.length; i++){
      
                //Grab US States
                var dataUSState = data[i].State;
      
                // Grab Total data & convert from string to Int
                var dataTotal = parseInt(data[i].Total);
      
                for(var j=0; j<json.features.length; j++){
      
                  var jsonUSState = json.features[j].properties.name;
      
                  if(dataUSState == jsonUSState){
      
                    //Copy dataTotal into json
                    json.features[j].properties.value = dataTotal;
                    break;
                  }
                }
              }
      
              //Mouseover to have hover effects
              let mouseOver = function(d) {
                  d3.selectAll("path")
                    .transition()
                    .duration(100)
                    .style("opacity", .5)
                  d3.select(this)
                    .transition()
                    .duration(100)
                    .style("opacity", 1)
                    .style("stroke", "black")
              }
      
              let mouseLeave = function(d) {
                  d3.selectAll("path")
                    .transition()
                    .duration(100)
                    .style("opacity", 1)
                  d3.select(this)
                    .transition()
                    .duration(100)
                    .style("stroke", "transparent")
              }
      
              svg.selectAll("path")
                  .data(json.features)
                  .enter()
                  .append("path")
                  .attr("d", path)
                  .style("fill", function(d){
                    //Get data value
                    var value = d.properties.value;
      
                    if(value){
                      return color(value);
                    }
                    else{
                      return "#CCC";
                    }
                  })
                  .on("mouseover", mouseOver)
                  .on("mouseleave", mouseLeave);
      
              d3.csv("usa_data_map.csv").then(function(data){
      
                //Add dots indicating US
                svg.selectAll("circle")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("cx", function(d){
                      return projection([d.Longitude, d.Latitude])[0];
                    })
                    .attr("cy", function(d){
                      return projection([d.Longitude, d.Latitude])[1];
                    })
                    .attr("r", 2)
                    .style("fill", function(d){
                      if(d.Total_Investment <= 20 & d.Total_Investment > 1){
                        return "yellow";
                      }
                      else if(d.Total_Investment <= 0){
                        return "red";
                      }
                      else {
                        return "green";
                      }
                    })
                    .style("stroke", "gray")
                    .style("stroke-width", 0.25)
                    .style("opacity", 1)
                    .append("title")
                    .text(function(d){
                      return "Country: " + d.Country + "\nValue: " + d.Country;
                    });
              });
            });
        });
       
      window.onload = init;
      
}