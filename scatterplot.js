//Scatterplot by Jenna Mena
d3.csv("pokemon_competitive_analysis.csv").then(data => {
    const svg = d3.select("body").append("svg")
        .attr("width", 1000)
        .attr("height", 1000);

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => +d.hp)]) //hp stat
        .range([50, 950]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => +d.attack)]) //attack stat
        .range([950, 50]);

        //Store selection in a variable
        const circles = svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(+d.hp))
        .attr("cy", d => yScale(+d.attack))
        .attr("r", 5)
        .attr("fill", "blue");

        //This is an event listener for the dropdown menu.
        d3.select("#y-axis-select").on("change", function() {
            const selectedStat = this.value;
            yScale.domain([0, d3.max(data, d => +d[selectedStat])]);
    
            circles.transition()
                .duration(500)
                .attr("cy", d => yScale(+d[selectedStat]));
        });
});
