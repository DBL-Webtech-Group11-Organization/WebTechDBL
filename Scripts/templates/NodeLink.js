
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
        for (i = 0; i < NodeData[0].length/10; i++) { //NodeData[0].length takes all info but that makes a graph with MANY nodes
            links.push({source: NodeData[0][i], target: NodeData[1][i]})
            if (NodeData[2][i] === 0) {job_list.push("CEO")}
            if (NodeData[2][i] === 1) {job_list.push("Director")}
            if (NodeData[2][i] === 2) {job_list.push("Employee")}
            if (NodeData[2][i] === 3) {job_list.push("In House Lawyer")}
            if (NodeData[2][i] === 4) {job_list.push("Manager")}
            if (NodeData[2][i] === 5) {job_list.push("Managing Director")}
            if (NodeData[2][i] === 6) {job_list.push("President")}
            if (NodeData[2][i] === 7) {job_list.push("Trader")}
            if (NodeData[2][i] === 8) {job_list.push("Unkown")}
            if (NodeData[2][i] === 9) {job_list.push("Vice President")}

        }
    }

        // create empty nodes array
        var nodes = {};
        // compute nodes from links data
        links.forEach(function (link) {
            link.source = nodes[link.source] ||
                (nodes[link.source] = {name: link.source});
            link.target = nodes[link.target] ||
                (nodes[link.target] = {name: link.target});
        });

        // add a SVG to the body for our viz
        var nodeLink = d3.select('body').append('svg')
            .attr('width', width)
            .attr('height', height);


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
            .attr("fill", "red")
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

    nodeLink.selectAll(".node").on("mouseover", function (d,i){
        tooltip.style("opacity", 1)

         .html("Job: " + job_list[i])

         .style("left", (d3.event.pageX) + "px")
         .style("top", (d3.event.pageY) + "px")
        console.log(NodeData[2][i])
    });



           


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
