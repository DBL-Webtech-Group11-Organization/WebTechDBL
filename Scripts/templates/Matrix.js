/*
function amountemployees(){

}

*/
window.onload = D3Matrix()

function D3Matrix(){

    var margin = {top: 100, right: 100, bottom: 100, left: 100},
    width = 750,
    height = 750;

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
    var maxSquareSum = 0;


    //creating empty matrix
    var matrix = new Array(numrows);
    for (var i = 0; i < numrows; i++) {
      matrix[i] = new Array(numcols);
      for (var j = 0; j < numcols; j++) {
        matrix[i][j] = 0;
      }
    }

    var forcegraph_data = NodeData
    //reading from list what which interactions there are
     if (forcegraph_data !== [0, 0, 0] && typeof forcegraph_data[0] != 'undefined') {
        for (var i = 0; i < forcegraph_data[0].length; i++) {
            p = forcegraph_data[0][i];
            q = forcegraph_data[1][i];
            console.log("TESt")
            matrix[p][q] = matrix[p][q]+1;

            if (maxValue<matrix[p][q]){
                maxValue = matrix[p][q];
            }
        }
    }
/*
    //switching the collumns and rows:
    for(var i = 1; i < forcegraph_data[0].length - 2 ; i++){
        var successor = 0;

        for(var j = i+1; j< forcegraph_data[0].length-1; j++){

            //calculating squaresum for collumns i and j
            var squareSum = 0;
            for(var k=1; k < forcegraph_data[0].length-1; k++){
                squareSum = squareSum + matrix[i][k];//*matrix[j][k]);
            }

            //compare squaresum to maxSquareSum to descide succesor of [i]
            if(maxSquareSum < squareSum){
                maxSquareSum = squareSum;
                successor = j;
            }
        }

        //if (i+1 != successor){
            for(var k = 1; k< forcegraph_data[0].length-1; k++){

                var t = matrix[i+1][k];
                matrix[i+1][k] = matrix[successor][k];
                matrix[successor][k] = t;

                t = matrix[k][i+1];
                matrix[k][i+1]= matrix[k][successor];
                matrix[k][successor]= matrix[k][i+1];

            }
        //}
    }

*/

    var newWidth = maxID * 10
    var newHeight = maxID * 10

    var margin = {top: 100, right: 100, bottom: 100, left: 100},
    width = newWidth,
    height = newHeight;

    var tooltip = d3.select('body').append('div')
        .style('position', 'absolute')
        .style('background', '#f4f4f4')
        .style('padding', '5 15px')
        .style('border', '1px #333 solid')
        .style('border-radius', '5px')
        .style('opacity', '0')


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
        .domain([0, 2, maxValue])
        .range(["red", "white", "blue"]);

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
