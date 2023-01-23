
// example dataset
let dataset = [
    {item: "apple", amount: 50, price: 1.25},
    {item: "lychee", amount: 23, price: 2.25},
    {item: "pear", amount: 80, price: 2.00},
    {item: "orange", amount: 65, price: 0.99}
];

let keys = Object.keys(dataset[0])

let width = 800;
let height = 400;
let margin = {
    top: 50, 
    bottom: 50,
    left: 50,
    right: 50
};

let independent_var = keys[0];
let dependent_var = "amount";

let dropdown = d3.select("#dropdown-variables") 
    .append("select")
    .on("change", change_dependent_variable)
    .attr("class", "selection")
    .attr("name", "variable-list");

let options = dropdown.selectAll("options")
    .data(keys)
    .enter()
    .append("option");

options.text(function(d) { 
    return d;});

function change_dependent_variable(){
    let selectedIndex = 0 ;
}

// create a svg within id="bar-chart"
let bar_svg = d3.select("#bar-chart")
    .append('svg')
    .attr('height', height - margin.top - margin.bottom)
    .attr('width', width - margin.left - margin.right)
    .attr('viewBox', [0,0, width, height]);

// declaring the scale of the x-axis based off dataset.length
let x = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);

// declaring the scale of y-axis
let y = d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top]);

bar_svg
    .append('g')
    .attr('fill', 'royalblue')
    .selectAll('rect')
    .data(dataset.sort((a,b) => d3.descending(a["amount"], b["amount"])))
    .join('rect')
        .attr('x', (d,i) => x(i))
        .attr('y', (d) => y(d["amount"]))
        .attr('height', d => y(0) - y(d["amount"]))
        .attr('width', x.bandwidth());

function xAxis(g){
    g.attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickFormat(i => dataset[i].item))
    .attr('font-size', '20px')
};

function yAxis(g){
    g.attr('transform', `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y).ticks(null, dataset.format))
    .attr('font-size', '20px');
};

bar_svg.append('g').call(xAxis);

bar_svg.append("text")      // text label for the x axis
        .attr("x", (width/2) ) 
        .attr("y",  height  )
        .style("text-anchor", "middle")
        .text(independent_var)
        .attr('font-size', '20px');;

bar_svg.append('g').call(yAxis);

bar_svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text(dependent_var)
        .attr('font-size', '20px');;

bar_svg.node();