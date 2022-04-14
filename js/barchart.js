// Bar chart specifications
const widthbar = 1000;
const heightbar = 2500;
const marginbar = {left:150, right:50, bottom:50, top:50};
const yTooltipOffset2 = 15;

// Create legend for bar chart with specified colors
const svg10 = d3.select("#bar-legend")
                .append("svg")
                .attr("width", 450)
                .attr("height", 260);

// Colors and legend formatting
svg10.append("text")
    .attr("x", 190)
    .attr("y", 20)
    .text("Range of Diet Costs Legend")
    .style("font-size", "20px")
svg10.append("circle")
    .attr("cx", 200)
    .attr("cy", 50)
    .attr("r", 6)
    .style("fill", "#ffbaba")
svg10.append("circle")
    .attr("cx", 200)
    .attr("cy", 80)
    .attr("r", 6)
    .style("fill", "#ff7b7b")
svg10.append("circle")
    .attr("cx", 200)
    .attr("cy", 110)
    .attr("r", 6)
    .style("fill", "#ff5252")
svg10.append("circle")
    .attr("cx", 200)
    .attr("cy", 140)
    .attr("r", 6)
    .style("fill", "#ff0000")
svg10.append("circle")
    .attr("cx", 200)
    .attr("cy", 170)
    .attr("r", 6)
    .style("fill", "#a70000")
svg10.append("circle")
    .attr("cx", 200)
    .attr("cy", 200)
    .attr("r", 6)
    .style("fill", "#641E16")
svg10.append("circle")
    .attr("cx", 200)
    .attr("cy", 230)
    .attr("r", 6)
    .style("fill", "#000000")
svg10.append("text")
    .attr("x", 220)
    .attr("y", 55)
    .text("$0 - $1 USD")
    .style("font-size", "15px")
svg10.append("text")
    .attr("x", 220)
    .attr("y", 85)
    .text("$1 - $2 USD")
    .style("font-size", "15px")
svg10.append("text")
    .attr("x", 220)
    .attr("y", 115)
    .text("$2 - $3 USD")
    .style("font-size", "15px")
svg10.append("text")
    .attr("x", 220)
    .attr("y", 145)
    .text("$3 - $4 USD")
    .style("font-size", "15px")
svg10.append("text")
    .attr("x", 220)
    .attr("y", 175)
    .text("$4 - $5 USD")
    .style("font-size", "15px")
svg10.append("text")
    .attr("x", 220)
    .attr("y", 205)
    .text("$5 - $6 USD")
    .style("font-size", "15px")
svg10.append("text")
    .attr("x", 220)
    .attr("y", 235)
    .text("$6 - $7 USD")
    .style("font-size", "15px")

// Create bar chart with pre-defined size (from above)
const svg1 = d3.select("#csv-bar")
              .append("svg")
              .attr("width", widthbar+marginbar.left+marginbar.right)
              .attr("height", heightbar + marginbar.top + marginbar.bottom)
              .append("g")
              .style("margin-top", "10px")
              .attr("transform", "translate("+marginbar.left + "," + marginbar.top + ")");

// Add x-axis
let x = d3.scaleLinear()
          .range([0, widthbar]);
let xAxis = svg1.append("g")
                .attr("class", "myXaxis")

 // Add y-axis
let y = d3.scaleBand()
          .range([0, heightbar])
          .padding(.1);
let yAxis = svg1.append("g")
                .attr("transform", "translate(0," + heightbar + ")")
let title;

// Create tool tip to change opacity when data filter is selected
const tooltip1 = d3.select("#csv-bar")
                    .append("div")
                    .attr("id", "tooltip1")
                    .select("opacity", 0)
                    .attr("class", "tooltip");

// Function to select and filter data that is shown in bar chart
function update(selectedVar) {

  d3.csv("data/clean_nutrition_df.csv").then((data) => {
    y.domain(data.map(function(d) {return d.country_name; }))
    x.domain([0, d3.max(data, function(d) {return +d[selectedVar] }) ]);
    xAxis.transition().duration(1000).call(d3.axisTop(x));

  var mouseover1 = function(event, d) {
    tooltip1.html("Country:" + d.country_name + "<br>" + function(d) {return (d[selectedVar])} + "<br>")
            .style("opacity", 1);
};


// User interaction definitions
const mousemove1 = function(event, d) {
    tooltip1.style("left", (event.pageX) + "px")
    .style("bottom", (event.pageY + yTooltipOffset2) + "px");
}


const mouseleave1 = function(event, d) {
    tooltip1.style("opacity", 0);
}

// Bar chart color definitions
let colors = d3.scaleThreshold()
                   .domain([0, 1, 2, 3, 4, 5, 6, 7])
                   .range(["#FFFFFF","#ffbaba","#ff7b7b", "#ff5252", "#ff0000", "#a70000", "#641E16", "#000000"]);

// Create bar chart
let bars = svg1.selectAll("rect")
                        .data(data)
            bars.enter()
             .append("rect")
             .merge(bars)
             .transition()
             .duration(1000)
             .attr("y", function(d) {return y(d.country_name); })
             .attr("x", 0)
             .attr("width", function(d) {return x(d[selectedVar]); })
             .attr("height", y.bandwidth())
             .style("fill", function(d) {return colors(d[selectedVar]); })


          svg1.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y));


          svg1.selectAll("rect")
            .on("mouseover", mouseover1)
            .on("mousemove", mousemove1)
            .on("mouseleave", mouseleave1);

//  Depict countries corresponding to data
 let text = svg1.append("text")
                .data(data)
                text
                .exit()
                .remove()
                .transition()
                .duration(1000)
                .attr("x", function(d) {return x(d[selectedVar]);})
                .attr("y", y.bandwidth())
                .text(function(d) {
                  return d[selectedVar]
                })
                .style("fill", "black")
          })
      }

      update('cost_energy')
