var w2 = 550,
    h2 = 450,
    r2 = 450,
    x2 = d3.scale.linear().range([0, r2]),
    y2 = d3.scale.linear().range([0, r2]),
    node2,
    root2;

var pack2 = d3.layout.pack()
    .size([r2, r2])
    .value(function(d2) { return d2.size; })

var vis2 = d3.select("#chart2").insert("svg:svg", "h2")
    .attr("width", w2)
    .attr("height", h2)
  .append("svg:g")
    .attr("transform", "translate(" + (w2 - r2) / 2 + "," + (h2 - r2) / 2 + ")");

d3.json("js/flare.json", function(data2) {
  node2 = root2 = data2;

  var nodes2 = pack2.nodes(root2);
  
  vis2.selectAll("circle")
      .data(nodes2)
    .enter().append("svg:circle")
      .attr("class", function(d2) { return d2.children ? "parent" : "child"; })
      .attr("cx", function(d2) { return d2.x; })
      .attr("cy", function(d2) { return d2.y; })
      .attr("r", function(d2) { return d2.r; })
      .on("click", function(d2) { return zoom2(node2 == d2 ? root2 : d2); });

  
  vis2.selectAll("text")
      .data(nodes2)
    .enter().append("svg:text")
      .attr("class", function(d2) { return d2.children ? "parent" : "child"; })
      .attr("x", function(d2) { return d2.x; })
      .attr("y", function(d2) { return d2.y; })
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .style("opacity", function(d2) { return d2.r > 20 ? 1 : 0; })
      .text(function(d2) {if(d2.depth == 1) { return d2.name; } else { return ""; } });

  d3.select(window).on("click", function() { zoom2(root2); });
});

function zoom2(d, i) {
  var k = r2 / d.r / 2;
  x2.domain([d.x - d.r, d.x + d.r]);
  y2.domain([d.y - d.r, d.y + d.r]);

  var t = vis2.transition()
      .duration(d3.event.altKey ? 7500 : 750);

  t.selectAll("circle")
      .attr("cx", function(d) { return x2(d.x); })
      .attr("cy", function(d) { return y2(d.y); })
      .attr("r", function(d) { return k * d.r; });
console.log(d);
  t.selectAll("text")
      .attr("x", function(d) { return x2(d.x); })
      .attr("y", function(d) { return y2(d.y); })
      .style("opacity", function(d) { return k * d.r > 20 ? 1 : 0; });

  node2 = d;
  d3.event.stopPropagation();
}
