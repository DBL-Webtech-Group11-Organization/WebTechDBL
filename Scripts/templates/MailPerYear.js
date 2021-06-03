window.onload = initPage();
//you can only load one function on window.onload so we needed a function that executes multiple
function initPage() {
    ShowDropdown();
    ChartLoad();
    ForceDirectedLoad();
}

function ShowDropdown() {

    //Get names array from flask and create a dropdown html element
    var select = document.getElementById("File-Dropdown");

    //Create for every name in the array a new dropdown element and add it to the menu
    for (let i = 0; i < filesnames.length; i++){
        var opt = filesnames[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }


}
function ChartLoad() {
    /* This function is a chart where myData is the amount of mails sent per year (see commented data)
    * it is visualised using basic javascript and D3.js commands*/



    //var myData = [25,1063,9323,18167,2463] //[['1998', 25], ['1999', 1063], ['2000', 9323], ['2001', 18167], ['2002', 2463]]
    var x = []
    var y = []
    if (myData !== [0,0,0]) {
        for (i = 0; i < myData.length; i++) {
            x.push(myData[i][0]);
            y.push(myData[i][1]);
        }
        myData = y;
    }
    var dataCount = 50;

    /* for(var i = 0; i < dataCount; i++){
        myData.push(Math.round(Math.random() * 500));
    } */


    var margin = {
        top: 30,
        right: 30,
        bottom: 40,
        left: 50
    }

    var height = 500 - margin.top - margin.bottom;
    var width = 500 - margin.right - margin.left;
    var animateDuration = 700;
    var animateDelay = 30;

    var tooltip = d3.select('body').append('div')
        .style('position', 'absolute')
        .style('background', '#f4f4f4')
        .style('padding', '5 15px')
        .style('border', '1px #333 solid')
        .style('border-radius', '5px')
        .style('opacity', '0')

    var yScale = d3.scale.linear()
        .domain([0, d3.max(myData)])
        .range([0, height]);

    var xScale = d3.scale.ordinal()
        .domain(d3.range(0, myData.length))
        .rangeBands([0, width])

    var colors = d3.scale.linear()
        .domain([0, myData.length])
        .range(['#90ee90','#30c230'])

    var myChart = d3.select('#chart').append('svg')
            .attr('width', width + margin.right + margin.left)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate('+margin.left+','+margin.top+')')
            .style('background', '#f4f4f4')
            .selectAll('rect')
                .data(myData)
                .enter().append('rect')
                    .style('fill', function(d, i){
                        return colors(i);
                    })
                    .attr('width', xScale.rangeBand())
                    .attr('height', 0)
                    .attr('x', function(d, i){
                        return xScale(i);
                    })
                    .attr('y', height)
            .on('mouseover', function(d){
                tooltip.transition()
                    .style('opacity', 1)

                tooltip.html(d)
                    .style('left', (d3.event.pageX)+'px')
                    .style('top', (d3.event.pageY+'px'))
                d3.select(this).style('opacity', 0.5)

            })
            .on('mouseout', function(d){
                tooltip.transition()
                    .style('opacity', 0)
                d3.select(this).style('opacity', 1)
            })

    myChart.transition()
        .attr('height', function(d){
            return yScale(d);
        })
        .attr('y', function(d){
            return height - yScale(d)
        })
        .duration(animateDuration)
        .delay(function(d, i){
            return i * animateDelay
        })
        .ease('elastic')


    var vScale = d3.scale.linear()
        .domain([0, d3.max(myData)])
        .range([height, 0]);

    var hScale = d3.scale.ordinal()
        .domain(d3.range(0, myData.length))
        .rangeBands([0, width])

    // V Axis
    var vAxis = d3.svg.axis()
        .scale(vScale)
        .orient('left')
        .ticks(5)
        .tickPadding(5)

    // V Guide
    var vGuide = d3.select('svg')
        .append('g')
            vAxis(vGuide)
            vGuide.attr('transform','translate('+margin.left+','+margin.top+')')
            vGuide.selectAll('path')
                .style('fill', 'none')
                .style('stroke', '#000')
            vGuide.selectAll('line')
                .style('stroke', '#000')

    // H Axis
    var hAxis = d3.svg.axis()
        .scale(hScale)
        .orient('bottom')
        .tickValues(hScale.domain().filter(function(d, i){
            return !(i % (myData.length/myData.length)); //change this if many data points
        }));

    // H Guide
    var hGuide = d3.select('svg')
        .append('g')
            hAxis(hGuide)
            hGuide.attr('transform','translate('+margin.left+','+(height + margin.top)+')')
            hGuide.selectAll('path')
                .style('fill', 'none')
                .style('stroke', '#000')
            hGuide.selectAll('line')
                .style('stroke', '#000')



}

