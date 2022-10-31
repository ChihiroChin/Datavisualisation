function init() {
var w = 500;
var h = 150;
var barPadding = 1;

var dataset = [14, 5, 26, 23, 9, 20, 12, 17, 10, 4, 9];

var svg = d3.select("div")
            .append("svg")
            .attr("width", w)   
            .attr("height", h); 

svg.selectAll("rect")
    .data(dataset)
    .enter()            
    .append("rect")
    .attr("x", function(d, i) {                
        return i * (w / dataset.length); 
    })
    .attr("y", function(d) {
        return h - (d * 4);
    })
    .attr("width", w / dataset.length - barPadding)
    .attr("height", function(d) {
        return d * 4;
    })
    .attr("fill", "skyblue");

svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d) {
        return d;
    })
    .attr("x", function(d, i) {
        return i * (w / dataset.length) + 21;
    })
    .attr("y", function(d) {
        return h - (d * 4) + 15;
    })
    .attr("text-anchor", "middle");
}
    
window.onload = init;