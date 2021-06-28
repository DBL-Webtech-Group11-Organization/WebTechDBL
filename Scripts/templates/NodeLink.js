
    var width = 800,
    height = 800;
    var links = []
    var job_list = []
    /*var links = [   { source: 'Baratheon', target:'Lannister' },
                    { source: 'Baratheon', target:'Stark' },
                    { source: 'Lannister', target:'Stark' },
                    { source: 'Stark', target:'Bolton' },
        ];*/

    if (NodeData !== []) { //function will start when data is present
        for (i = 0; i < NodeData[0].length/20; i++) { //NodeData[0].length takes all info but that makes a graph with MANY nodes
            links.push({source: NodeData[0][i], target: NodeData[1][i], status: "black"})
            if (NodeData[2][i] === 0) {job_list.push("CEO")}
            if (NodeData[2][i] === 1) {job_list.push("Director")}
            if (NodeData[2][i] === 2) {job_list.push("Employee")}
            if (NodeData[2][i] === 3) {job_list.push("In House Lawyer")}
            if (NodeData[2][i] === 4) {job_list.push("Manager")}
            if (NodeData[2][i] === 5) {job_list.push("Managing Director")}
            if (NodeData[2][i] === 6) {job_list.push("President")}
            if (NodeData[2][i] === 7) {job_list.push("Trader")}
            if (NodeData[2][i] === 8) {job_list.push("Unknown")}
            if (NodeData[2][i] === 9) {job_list.push("Vice President")}

        }
    }

        // create empty nodes array
        var nodes = {};
        var nodeToStatus = {};
        // compute nodes from links data
        links.forEach(function (link) {
            link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
            link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
            nodeToStatus[link.source.name] = link.status;
            nodeToStatus[link.target.name] = link.status;
        });
        function nodeColor(d) {
            if (job_list !== [])
                if (job_list[d.index] === "CEO") {
                    return 'blue';
                }
                if (job_list[d.index] === "Director") {
                    return 'green';
                }
                if (job_list[d.index] === "Employee") {
                    return 'red';
                }
                if (job_list[d.index] === "In House Lawyer") {
                    return 'yellow';
                }
                if (job_list[d.index] === "Manager") {
                    return 'black';
                }
                if (job_list[d.index] === "Managing Director") {
                    return 'white';
                }
                if (job_list[d.index] === "President") {
                    return 'cyan';
                }
                if (job_list[d.index] === "Trader") {
                    return 'brown';
                }
                if (job_list[d.index] === "Unknown") {
                    return 'pink';
                }
                if (job_list[d.index] === "Vice President") {
                    return 'purple';
                }
            else {
                return 'black';
            }
        }

        // add a SVG to the body for our viz
        var nodeLink = d3.select('body').append('svg')
            .attr('width', width)
            .attr('height', height);

        var legendx = 450;
        var legendy = 100;

        nodeLink.append('rect')
          .attr('x', 640)
          .attr('y', 215)
          .attr('width', 160)
          .attr('height', 300)
          .attr('stroke', 'black')
          .attr('fill', '#69a3b2');

        // variables on the nodelink graph
        nodeLink.append("circle").attr("cx",200 + legendx).attr("cy",130 + legendy).attr("r", 6).style("fill", "blue")
        nodeLink.append("circle").attr("cx",200 + legendx).attr("cy",160 + legendy).attr("r", 6).style("fill", "green")
        nodeLink.append("circle").attr("cx",200 + legendx).attr("cy",190 + legendy).attr("r", 6).style("fill", "red")
        nodeLink.append("circle").attr("cx",200 + legendx).attr("cy",220 + legendy).attr("r", 6).style("fill", "yellow")
        nodeLink.append("circle").attr("cx",200 + legendx).attr("cy",250 + legendy).attr("r", 6).style("fill", "black")
        nodeLink.append("circle").attr("cx",200 + legendx).attr("cy",280 + legendy) .attr("r", 6).style("fill", "white")
        nodeLink.append("circle").attr("cx",200 + legendx).attr("cy",310 + legendy).attr("r", 6).style("fill", "cyan")
        nodeLink.append("circle").attr("cx",200 + legendx).attr("cy",340 + legendy).attr("r", 6).style("fill", "brown")
        nodeLink.append("circle").attr("cx",200 + legendx).attr("cy",370 + legendy).attr("r", 6).style("fill", "pink")
        nodeLink.append("circle").attr("cx",200 + legendx).attr("cy",400 + legendy).attr("r", 6).style("fill", "purple")
        nodeLink.append("text").attr("x", 220 + legendx).attr("y", 130 + legendy).text("CEO").style("font-size", "15px").attr("alignment-baseline","middle")
        nodeLink.append("text").attr("x", 220 + legendx).attr("y", 160 + legendy).text("Director").style("font-size", "15px").attr("alignment-baseline","middle")
        nodeLink.append("text").attr("x", 220 + legendx).attr("y", 190 + legendy).text("Employee").style("font-size", "15px").attr("alignment-baseline","middle")
        nodeLink.append("text").attr("x", 220 + legendx).attr("y", 220 + legendy).text("In House Lawyer").style("font-size", "15px").attr("alignment-baseline","middle")
        nodeLink.append("text").attr("x", 220 + legendx).attr("y", 250 + legendy).text("Manager").style("font-size", "15px").attr("alignment-baseline","middle")
        nodeLink.append("text").attr("x", 220 + legendx).attr("y", 280 + legendy).text("Managing Director").style("font-size", "15px").attr("alignment-baseline","middle")
        nodeLink.append("text").attr("x", 220 + legendx).attr("y", 310 + legendy).text("President").style("font-size", "15px").attr("alignment-baseline","middle")
        nodeLink.append("text").attr("x", 220 + legendx).attr("y", 340 + legendy).text("Trader").style("font-size", "15px").attr("alignment-baseline","middle")
        nodeLink.append("text").attr("x", 220 + legendx).attr("y", 370 + legendy).text("Unknown").style("font-size", "15px").attr("alignment-baseline","middle")
        nodeLink.append("text").attr("x", 220 + legendx).attr("y", 400 + legendy).text("Vice President").style("font-size", "15px").attr("alignment-baseline","middle")



        // use the force
        var force = d3.layout.force() //build the layout
            .size([width, height]) //specified earlier
            .nodes(d3.values(nodes)) //add nodes
            .links(links) //add links
            .on("tick", tick) //what to do
            .linkDistance(100) //set for proper svg size
            .start(); //kick the party off!

        // add the links
        var link = nodeLink.selectAll('.link')
            .data(links)
            .enter().append('line')
            .attr('class', 'link')
            .attr("stroke-width", 0.3)
            .style("stroke", "black");

//Colors of job positions
var job_color={};
var job = {};
        // add the nodes
        var node = nodeLink.selectAll('.node')
            .data(force.nodes()) //add
            .enter().append('circle')
            .attr('class', 'node')
            .attr('r', 5) //radius of circle
            .style("fill", nodeColor)
            .style("stroke", "black")
            .style("opacity", 1);


                // for(var i=0;i<list_of_jobs.length; i++){
                //     job_color[i] = np.random.choice(range(256), size=3)}
                //
                // for(var j=0;j<list_of_emails.length;j++){
                //     for(var k=0;k<list_of_jobs.length;k++){
                //         if(pdData[j][3] == list_of_jobs[k])
                //             return job_color[k]
                //}}
            //});

        var tooltip = d3.select('body').append('div')
        .style('position', 'absolute')
        .style('background', '#f4f4f4')
        .style('padding', '5 15px')
        .style('border', '1px #333 solid')
        .style('border-radius', '5px')
        .style('opacity', '0')

    nodeLink.selectAll(".node").on("mouseover", function (d,i) {
        tooltip.style("opacity", 1)






                .html("Job: " + job_list[i])

                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px")
         nodeLink.selectAll(".node").filter(function (x,y){return y==i}).attr("r", 12)//Select the node and increase size
        });

        nodeLink.selectAll(".node").on("mouseout", function (d,i) {
        tooltip.style("opacity", 0);
         nodeLink.selectAll(".node").filter(function (x,y){return y==i}).attr("r", 5)//Selected node and reset size
        });

    // nodeLink.select(this).on("click", function(d, i) {
    //     tooltip.style("opacity", 0)
    //     this("opacity", 0.3)
    // });


        function tick(e) {

            node.attr('cx', function (d) {
                return d.x;
            })
                .attr('cy', function (d) {
                    return d.y;
                })
                .call(force.drag);

            link.attr('x1', function (d) {
                return d.source.x;
            })
                .attr('y1', function (d) {
                    return d.source.y;
                })
                .attr('x2', function (d) {
                    return d.target.x;
                })
                .attr('y2', function (d) {
                    return d.target.y;
                });

        }

//        circle.on("click", function() {
//  d3.select(this).attr("r", 12);
//});
//var toRemove;
//
//.on('click', function() {
//                if(toRemove){
//                    d3.select(toRemove).attr("r", 6);
//                }
//                toRemove = this;
//                d3.select(this).attr("r", 12);
//            });//