var obj2  = '{"name": "","children": [{"name": "Disposiciones Normativas","children": [{"name": "Positivación del DAI","children": [{"name": "1.-", "size": 10000},{"name": "2.-", "size": 9000},{"name": "3.-", "size": 8000},{"name": "4.-", "size": 7000},{"name": "5.-", "size": 6000}]},{"name": "Información restringida","children": [{"name": "6.-", "size": 10000},{"name": "7.-", "size": 9000},{"name": "8.-", "size": 8000}]},{"name": "Sanciones al incumplimiento de la ley","children": [{"name": "9.-", "size": 10000},{"name": "10.-", "size": 10000}]}]},{"name": "Diseño institucional","children": [{"name": "Instituciones internas de acceso a la información","children": [{"name": "11.-", "size": 10000},{"name": "12.-", "size": 9000},{"name": "13.-", "size": 8000},{"name": "14.-", "size": 7000}]},{"name": "Promoción del DAI","children": [{"name": "15.-", "size": 10000},{"name": "16.-", "size": 9000},{"name": "17.-", "size": 8000}]},{"name": "Órganos garantes","children": [{"name": "18.-", "size": 10000},{"name": "19.-", "size": 9000},{"name": "20.-", "size": 8000}]}]},{"name": "Procedimientos","children": [{"name": "Procedimientos de acceso a la información","children": [{"name": "21.-", "size": 10000},{"name": "22.-", "size": 9000},{"name": "23.-", "size": 8000},{"name": "24.-", "size": 7000}]},{"name": "Procedimientos de revisión","children": [{"name": "25.-", "size": 10000},{"name": "26.-", "size": 9000},{"name": "27.-", "size": 8000}]},{"name": "Difusión proactiva de información pública","children": [{"name": "28.-", "size": 10000},{"name": "29.-", "size": 9000},{"name": "30.-", "size": 8000}]}]}]}';
var json2 = JSON.parse(obj2);

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

  node2 = root2 = json2;

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
      .attr("dy", ".22em")
      .attr("text-anchor", "middle")
      .style("opacity", function(d2) { return d2.r > 60 ? 1 : 0; })
      .text(function(d2) { return d2.name; });
		
  d3.select(window).on("click", function() { zoom2(root2); });


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

	
  t.selectAll("text")
      .attr("x", function(d) { return x2(d.x); })
      .attr("y", function(d) { return y2(d.y); })
      .style("opacity", function(d) { console.log(d.r); return k * d.r > 60 ? 1 : 0; });
	
  node2 = d;
  d3.event.stopPropagation();
}
