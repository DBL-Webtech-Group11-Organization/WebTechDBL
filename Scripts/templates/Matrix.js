/*
function amountemployees(){

}

*/
window.onload = D3Matrix()

var cols = 10;// = amountemployees
var rows = 10;// = amountemployees

var colors = [];

function setup(){
    createCanvas(300,300);
    for(var i=0; i< cols; i++){
        colors[i]=[];
         for(var j=0; j< cols; j++){
         colors[i][j] = random(255);
         }
     }
}

function DrawMatrix(){
    background(51);

    for (var i=0; i< cols; i++) {
        for (var j=0; j< cols; j++) {
        var x = i * 30;
        var y = j * 30;

        fill(colors[i][j]);
        stroke(0);
        fill(255);
        rect(x,y,30,30);
        }
    }
}
/*   orginele code
function D3Matrix(){

    d3.csv("../csv_files/enron-v1.csv", function(data){
        console.log(data[1]);
    })

    var margin = {top: 100, right: 100, bottom: 100, left: 100},
    width = 384,
    height = 256;

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .style("margin-left", -margin.left + "px")
      .append("g")
        .attr("transform", "translate(" +  margin.left +   150 +"," + margin.top + ")");

    svg.append("rect")
        .attr("class", "background")
        .attr("width", width)
        .attr("height", height);

    var numrows = 150;
    var numcols = 150;

    var matrix = new Array(numrows);
    for (var i = 0; i < numrows; i++) {
      matrix[i] = new Array(numcols);
      for (var j = 0; j < numcols; j++) {
      // dus hier waardes eraan geven!!!
        matrix[i][j] = Math.random()*5 - 1;
      }
    }

    var x = d3.scale.ordinal()
        .domain(d3.range(numcols))
        .rangeBands([0, width]);

    var y = d3.scale.ordinal()
        .domain(d3.range(numrows))
        .rangeBands([0, height]);

    var rowLabels = new Array(numrows);
    for (var i = 0; i < numrows; i++) {
      rowLabels[i] = "Row "+(i+1);
    }

    var columnLabels = new Array(numrows);
    for (var i = 0; i < numcols; i++) {
      columnLabels[i] = "Column "+(i+1);
    }

    var colorMap = d3.scale.linear()
        .domain([-1, 0, 1])
        .range(["red", "white", "blue"]);
        //.range(["red", "black", "green"]);
        //.range(["brown", "#ddd", "darkgreen"]);

    var row = svg.selectAll(".row")
        .data(matrix)
      .enter().append("g")
        .attr("class", "row")
        .attr("transform", function(d, i) { return "translate(0," + y(i) + ")"; });

    row.selectAll(".cell")
        .data(function(d) { return d; })
      .enter().append("rect")
        .attr("class", "cell")
        .attr("x", function(d, i) { return x(i); })
        .attr("width", x.rangeBand())
        .attr("height", y.rangeBand())
        .style("stroke-width", 0);

    row.append("line")
        .attr("x2", width);

    row.append("text")
        .attr("x", 0)
        .attr("y", y.rangeBand() / 2)
        .attr("dy", ".32em")
        .attr("text-anchor", "end")
        .text(function(d, i) { return i; });

    var column = svg.selectAll(".column")
        .data(columnLabels)
      .enter().append("g")
        .attr("class", "column")
        .attr("transform", function(d, i) { return "translate(" + x(i) + ")rotate(-90)"; });

    column.append("line")
        .attr("x1", -width);

    column.append("text")
        .attr("x", 6)
        .attr("y", y.rangeBand() / 2)
        .attr("dy", ".32em")
        .attr("text-anchor", "start")
        .text(function(d, i) { return d; });

    row.selectAll(".cell")
        .data(function(d, i) { return matrix[i]; })
        .style("fill", colorMap);

}

*/
function D3Matrix(){

    d3.csv("../csv_files/enron-v1.csv", function(data){
        console.log(data[1]);
    })

    var margin = {top: 100, right: 100, bottom: 100, left: 100},
    width = 384,
    height = 256;

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .style("margin-left", -margin.left + "px")
      .append("g")
        .attr("transform", "translate(" +  /*margin.left + */  150 +"," + margin.top + ")");

    svg.append("rect")
        .attr("class", "background")
        .attr("width", width)
        .attr("height", height);

    //change later in variable amount of employees
    var numrows = 150;
    var numcols = 150;
    var maxValue = 0;
    var p = 0;
    var q = 0;


    //creating empty matrix
    var matrix = new Array(numrows);
    for (var i = 0; i < numrows; i++) {
      matrix[i] = new Array(numcols);
      for (var j = 0; j < numcols; j++) {
        matrix[i][j] = 0;
      }
    }

    //reading from list what which interactions there are
     if (forcegraph_data !== [0, 0, 0]) {
        for (var i = 0; i < forcegraph_data.length; i++) {
            p = forcegraph_data[i][0];
            q = forcegraph_data[i][1];
            matrix[p][q] = matrix[p][q]+1;

            if (maxValue<matrix[p][q]){
                maxValue = matrix[p][q];
            }
        }
    }

    //scaling the values
    for (var i = 0; i < numrows; i++) {
      for (var j = 0; j < numcols; j++) {
        matrix[i][j] = matrix[i][j]/ maxValue -1;
      }
    }

    var x = d3.scale.ordinal()
        .domain(d3.range(numcols))
        .rangeBands([0, width]);

    var y = d3.scale.ordinal()
        .domain(d3.range(numrows))
        .rangeBands([0, height]);

    var rowLabels = new Array(numrows);
    for (var i = 0; i < numrows; i++) {
      rowLabels[i] = "Row "+(i+1);
    }

    var columnLabels = new Array(numrows);
    for (var i = 0; i < numcols; i++) {
      columnLabels[i] = "Column "+(i+1);
    }

    var colorMap = d3.scale.linear()
        .domain([-1, 0, 1])
        .range(["red", "white", "blue"]);
        //.range(["red", "black", "green"]);
        //.range(["brown", "#ddd", "darkgreen"]);

    var row = svg.selectAll(".row")
        .data(matrix)
      .enter().append("g")
        .attr("class", "row")
        .attr("transform", function(d, i) { return "translate(0," + y(i) + ")"; });

    row.selectAll(".cell")
        .data(function(d) { return d; })
      .enter().append("rect")
        .attr("class", "cell")
        .attr("x", function(d, i) { return x(i); })
        .attr("width", x.rangeBand())
        .attr("height", y.rangeBand())
        .style("stroke-width", 0);

    row.append("line")
        .attr("x2", width);

    row.append("text")
        .attr("x", 0)
        .attr("y", y.rangeBand() / 2)
        .attr("dy", ".32em")
        .attr("text-anchor", "end")
        .text(function(d, i) { return i; });

    var column = svg.selectAll(".column")
        .data(columnLabels)
      .enter().append("g")
        .attr("class", "column")
        .attr("transform", function(d, i) { return "translate(" + x(i) + ")rotate(-90)"; });

    column.append("line")
        .attr("x1", -width);

    column.append("text")
        .attr("x", 6)
        .attr("y", y.rangeBand() / 2)
        .attr("dy", ".32em")
        .attr("text-anchor", "start")
        .text(function(d, i) { return d; });

    row.selectAll(".cell")
        .data(function(d, i) { return matrix[i]; })
        .style("fill", colorMap);

}
