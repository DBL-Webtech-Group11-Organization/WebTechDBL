/*
function amountemployees(){

}

*/

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

    var forcegraph_data = NodeData
    var maxID = 0;

    //creating empty matrix
    for (var i = 0; i < forcegraph_data[0].length; i++){
        if (maxID < forcegraph_data[0][i]){
            maxID = forcegraph_data[0][i]
        }
        if(maxID < forcegraph_data[1][i]){
            maxID = forcegraph_data[1][i]
        }
    }
    var matrix = new Array(maxID + 1);
    for (var i = 0; i <= maxID; i++){
        matrix[i] = new Array(maxID + 1)
        for (var j = 0; j <=maxID; j++){
            matrix[i][j] = 0;
        }
    }

    var p = 0;
    var q = 0;
    var maxValue = 0;

    //reading from list what which interactions there are
     if (forcegraph_data !== [0, 0, 0] && typeof forcegraph_data[0] != 'undefined') {
        for (var i = 0; i < forcegraph_data[0].length; i++) {
                p = forcegraph_data[0][i];
                q = forcegraph_data[1][i];
                matrix[p][q] = matrix[p - 1][q - 1] + 1;


            if (maxValue<matrix[p][q]){
                maxValue = matrix[p][q];
            }
        }
    }
    /*grouping
      //switching the collumns and rows:
    // loops trough the rows
    for (var i = 1; i < 148 ; i++){
        var maxSquareSum=0;
        var successor = i+1;

        //loops trough the columns
        for (var j = i+1; j< 149; j++){

            //calculating squareSum for specific column j
            var squareSum = 0;
            for (var k=1; k < 149; k++){
                squareSum = squareSum + (matrix[i][k] * matrix[j][k]);
            }

            //compare squareSum to maxSquareSum to decide succesor of [i]
            if (maxSquareSum < squareSum){
                maxSquareSum = squareSum;
                successor = j;
            }
        }

        //if (i+1 != successor){
            for (var m = 1; m < 149; m++){

                var t = matrix[i+1][m];
                matrix[i+1][m] = matrix[successor][m];
                matrix[successor][m] = t;

                t = matrix[m][i+1];
                matrix[m][i+1]= matrix[m][successor];
                matrix[m][successor]= matrix[m][i+1];

            }
         //WRITE CODE TO SWITCH LABLES!!!!!!
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


    var matrixSVG = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .style("margin-left", -margin.left + "px")
      .append("g")
        .attr("transform", "translate(" +  /*margin.left + */  250 +"," + margin.top + ")");

    matrixSVG.append("rect")
        .attr("class", "background")
        .attr("width", width)
        .attr("height", height);

    //change later in variable amount of employees


    /*
    //scaling the values
    for (var i = 0; i < numrows; i++) {
      for (var j = 0; j < numcols; j++) {
        matrix[i][j] = matrix[i][j]/ maxValue -1;
      }
    }*/

    var numrows = maxID;
    var numcols = maxID;

    var x = d3.scale.ordinal()
        .domain(d3.range(numrows))
        .rangeBands([0, width]);

    var y = d3.scale.ordinal()
        .domain(d3.range(numrows))
        .rangeBands([0, height]);

    var rowLabels = new Array(maxID);
    for (var i = 1; i < maxID; i++) {
      rowLabels[i] = "To ID"+(i+1);
    }

    var columnLabels = new Array(maxID);
    for (var i = 1; i < maxID; i++) {
      columnLabels[i] = "From ID"+(i+1);
    }

    var colorMap = d3.scale.linear()
        .domain([0, 2, maxValue])
        .range(["red", "white", "blue"]);
        //.range(["red", "black", "green"]);
        //.range(["brown", "#ddd", "darkgreen"]);

    var row = matrixSVG.selectAll(".row")
        .data(matrix)
      .enter().append("g")
        .attr("class", "row")
        .attr("transform", function(d, i) {return "translate(0," + y(i) + ")"; });

    row.selectAll(".cell")
                .data(function(d) { return d; })
              .enter().append("rect")
                .attr("class", "cell")
                .attr("x", function(d, i) {return x(i); })
                .attr("width", x.rangeBand())
                .attr("height", y.rangeBand())
                .style("stroke-width", 0.5);

    row.append("line")
        .attr("x2", width);

    row.append("text")
        .attr("x", 0)
        .attr("y", y.rangeBand() / 2)
        .attr("dy", ".32em")
        .attr("text-anchor", "end")
        .text(function(d, i) { return "To ID: " + i; });

    var column = matrixSVG.selectAll(".column")
        .data(matrix)
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
        .text(function(d, i) { return "From ID: " + i; });

    row.selectAll(".cell")
        .data(function(d, i) { return matrix[i]; })
        .style("fill", colorMap);


    matrixSVG.selectAll(".row").selectAll(".cell").on("mouseover", function (d,i){
            for (var y = 0; y < matrix[0].length; y++){
                if (matrix[y][i] == d){
                    tooltip.style("opacity", 1)
                         .html("From ID:" + i + "<br/>"+ "To ID:" + y + "<br/>" +"Amount of emails sent: " + d)
                         .style("left", (d3.event.pageX-25) + "px")
                         .style("top", (d3.event.pageY-75) + "px");
                }
            }
        nodeLink.selectAll(".node").filter(function (x,y){return y==i}).attr("stroke-width", 1.5)
        nodeLink.selectAll(".node").filter(function (x,y){return y==i}).attr("stroke", "orange")


    });

    matrixSVG.selectAll(".row").selectAll(".cell").on('mouseout', function (d){
        tooltip.style("opacity", 0)
        nodeLink.selectAll(".node").attr("stroke", "none");
        matrixSVG.selectAll(".cell").attr("stroke", "none");
    });



