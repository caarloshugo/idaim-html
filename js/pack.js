var obj  = '{"name": "","children": [{"name": "Disposiciones Normativas","children": [{"name": "Positivación del DAI","children": [{"name": "1.-", "size": 10000},{"name": "2.-", "size": 9000},{"name": "3.-", "size": 8000},{"name": "4.-", "size": 7000},{"name": "5.-", "size": 6000}]},{"name": "Información restringida","children": [{"name": "6.-", "size": 10000},{"name": "7.-", "size": 9000},{"name": "8.-", "size": 8000}]},{"name": "Sanciones al incumplimiento de la ley","children": [{"name": "9.-", "size": 10000},{"name": "10.-", "size": 10000}]}]},{"name": "Diseño institucional","children": [{"name": "Instituciones internas de acceso a la información","children": [{"name": "11.-", "size": 10000},{"name": "12.-", "size": 9000},{"name": "13.-", "size": 8000},{"name": "14.-", "size": 7000}]},{"name": "Promoción del DAI","children": [{"name": "15.-", "size": 10000},{"name": "16.-", "size": 9000},{"name": "17.-", "size": 8000}]},{"name": "Órganos garantes","children": [{"name": "18.-", "size": 10000},{"name": "19.-", "size": 9000},{"name": "20.-", "size": 8000}]}]},{"name": "Procedimientos","children": [{"name": "Procedimientos de acceso a la información","children": [{"name": "21.-", "size": 10000},{"name": "22.-", "size": 9000},{"name": "23.-", "size": 8000},{"name": "24.-", "size": 7000}]},{"name": "Procedimientos de revisión","children": [{"name": "25.-", "size": 10000},{"name": "26.-", "size": 9000},{"name": "27.-", "size": 8000}]},{"name": "Difusión proactiva de información pública","children": [{"name": "28.-", "size": 10000},{"name": "29.-", "size": 9000},{"name": "30.-", "size": 8000}]}]}]}';
var json = JSON.parse(obj);

var w = 550,
    h = 450,
    r = 450,
    x = d3.scale.linear().range([0, r]),
    y = d3.scale.linear().range([0, r]),
    node,
    root;

var pack = d3.layout.pack()
    .size([r, r])
    .value(function(d) { return d.size; })

var vis = d3.select("#chart").insert("svg:svg", "h2")
    .attr("width", w)
    .attr("height", h)
  .append("svg:g")
    .attr("transform", "translate(" + (w - r) / 2 + "," + (h - r) / 2 + ")");

  
  node = root = json;
console.log(node);
  var nodes = pack.nodes(root);
  
  vis.selectAll("circle")
      .data(nodes)
    .enter().append("svg:circle")
      .attr("class", function(d) { return d.children ? "parent" : "child"; })
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", function(d) { return d.r; })
      .on("click", function(d) { return zoom(node == d ? root : d); });

  vis.selectAll("text")
      .data(nodes)
    .enter().append("svg:text")
      .attr("class", function(d) { return d.children ? "parent" : "child"; })
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .style("opacity", function(d) { return d.r > 20 ? 1 : 0; })
      .text(function(d) { return d.name; });

  d3.select(window).on("click", function() { zoom(root); });


function zoom(d, i) {
  var k = r / d.r / 2;
  x.domain([d.x - d.r, d.x + d.r]);
  y.domain([d.y - d.r, d.y + d.r]);

  var t = vis.transition()
      .duration(d3.event.altKey ? 7500 : 750);

  t.selectAll("circle")
      .attr("cx", function(d) { return x(d.x); })
      .attr("cy", function(d) { return y(d.y); })
      .attr("r", function(d) { return k * d.r; });

  t.selectAll("text")
      .attr("x", function(d) { return x(d.x); })
      .attr("y", function(d) { return y(d.y); })
      .style("opacity", function(d) { return k * d.r > 20 ? 1 : 0; });

  node = d;
  d3.event.stopPropagation();
}
