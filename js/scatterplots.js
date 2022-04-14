// Set dimensions and margins for scatterplots
const width = 1200;
const height = 600;
const margin = {left:250, right:50, bottom:50, top:50};
const yTooltipOffset = 15;


// SCATTERPLOT 1 TOOLTIP & MOUSEOVER EVENT

//Tooltip Set-up
const tooltip2 = d3.select("#csv-scatter1") // Selects all points
                .append("div") // Adds the div properties
                .attr('id', "tooltip2") // Sets id to tooltip1
                .style("opacity", 0) // Sets bar opacity to 0
                .attr("class", "tooltip"); // Sets class to tooltip

// Event handler for mouseover on point
const mouseover2 = function(event, d) {
  tooltip2.html("Country: " + d.country_name + "<br> Cost of energy sufficient diet: $" + d.cost_energy + "0<br> Percentage of population unable to afford an energy sufficient diet: " + d.percent_unafford_energy + "%<br>") // Sets html to show name and score
          .style("opacity", 1); // Sets opacity to 1 so tooltip shows up
}

// Event handler for mouseover bar
const mousemove2 = function(event, d) {
  tooltip2.style("left", (event.pageX)+"px") // Set position of tooltip to be where x value of where mouse is plus offset
          .style("top", (event.pageY + yTooltipOffset) +"px"); // Set position of tooltip to be equal to y value of where mouse is plus offset
}

// Event handler for mouse leaving bar
const mouseleave2 = function(event, d) {
  tooltip2.style("opacity", 0); // sets the tooltip opacity to 0 so it disappears
}



// SCATTERPLOT 2 TOOLTIP & MOUSEOVER EVENT

// Tooltip setup
const tooltip3 = d3.select("#csv-scatter2") // Selects all points
                .append("div") // Adds the div properties
                .attr('id', "tooltip3") // Sets id to tooltip1
                .style("opacity", 0) // Sets bar opacity to 0
                .attr("class", "tooltip"); // Sets class to tooltip

// Event handler for mouseover on point
const mouseover3 = function(event, d) {
  tooltip3.html("Country: " + d.country_name + "<br> Cost of nutritious diet: $" + d.cost_nutrition + "0<br> Percentage of population unable to afford a nutritious diet: " + d.percent_unafford_nutrition + "%<br>") // Sets html to show name and score
          .style("opacity", 1); // Sets opacity to 1 so tooltip shows up
}

// Event handler for mouseover bar
const mousemove3 = function(event, d) {
  tooltip3.style("left", (event.pageX)+"px") // Set position of tooltip to be where x value of where mouse is plus offset
          .style("top", (event.pageY + yTooltipOffset) +"px"); // Set position of tooltip to be equal to y value of where mouse is plus offset
}

// Event handler for mouse leaving bar
const mouseleave3 = function(event, d) {
  tooltip3.style("opacity", 0); // sets the tooltip opacity to 0 so it disappears
}



// SCATTERPLOT 3 TOOLTIP & MOUSEOVER EVENT

// Tooltip setup
const tooltip4 = d3.select("#csv-scatter3") // Selects all points
                .append("div") // Adds the div properties
                .attr('id', "tooltip4") // Sets id to tooltip4
                .style("opacity", 0) // Sets bar opacity to 0
                .attr("class", "tooltip"); // Sets class to tooltip

// Event handler for mouseover on point
const mouseover4 = function(event, d) {
  tooltip4.html("Country: " + d.country_name + "<br> Cost of healthy diet: $" + d.cost_healthy + "0<br> Percentage of population unable to afford a healthy diet: " + d.percent_unafford_healthy + "%<br>") // Sets html to show name and score
          .style("opacity", 1); // Sets opacity to 1 so tooltip shows up
}

// Event handler for mouseover bar
const mousemove4 = function(event, d) {
  tooltip4.style("left", (event.pageX)+"px") // Set position of tooltip to be where x value of where mouse is plus offset
          .style("top", (event.pageY + yTooltipOffset) +"px"); // Set position of tooltip to be equal to y value of where mouse is plus offset
}

// Event handler for mouse leaving bar
const mouseleave4 = function(event, d) {
  tooltip4.style("opacity", 0); // sets the tooltip opacity to 0 so it disappears
}


// SCATTERPLOT 1
const svg2 = d3.select("#csv-scatter1")
                  .append("svg")
                  .attr("width", width - margin.left - margin.right)
                  .attr("height", height - margin.top - margin.bottom)
                  .attr("viewBox", [0, 0, width, height]);

let brush1;
let myCircles1;

//SCATTERPLOT 2
const svg3 = d3.select("#csv-scatter2")
                  .append("svg")
                  .attr("width", width - margin.left - margin.right)
                  .attr("height", height - margin.top - margin.bottom)
                  .attr("viewBox", [0, 0, width, height])
                  .call(d3.brush()
                            .extent([margin.left, margin.top],
                                [width + margin.left + height + margin.top]));

let brush2;
let myCircles2;

//SCATTERPLOT 3
const svg4 = d3.select("#csv-scatter3")
                .append("svg")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0, 0, width, height])
                .call(d3.brush()
                            .extent([margin.left, margin.top],
                                [width + margin.left + height + margin.top]));

let brush3;
let myCircles3;

// Define colors for each category of scatterplot
const color = d3.scaleOrdinal()
                .domain(["High-income", "Upper-middle", "Lower-middle", "Low-income"])
                .range(["#A5D6A7", "#D1C4E9", "#B2EBF2", "#FFCDD2"])


// Create legend for scatterplot 1
const svg7 = d3.select("#csv-scatter1")
                .append("svg")
                .attr("width", 300)
                .attr("height", 600)
                .attr("viewBox", [0, 0, 300, 200]);;

svg7.append("text")
    .attr("x", 40)
    .attr("y", 75)
    .text("Income Classification Legend")
    .style("font-size", "20px")
svg7.append("circle")
    .attr("cx", 60)
    .attr("cy", 100)
    .attr("r", 6)
    .style("fill", "#A5D6A7")
svg7.append("circle")
    .attr("cx", 60)
    .attr("cy", 130)
    .attr("r", 6)
    .style("fill", "#D1C4E9")
svg7.append("circle")
    .attr("cx", 60)
    .attr("cy", 160)
    .attr("r", 6)
    .style("fill", "#B2EBF2")
svg7.append("circle")
    .attr("cx", 60)
    .attr("cy", 190)
    .attr("r", 6)
    .style("fill", "#FFCDD2")
svg7.append("text")
    .attr("x", 80)
    .attr("y", 105)
    .text("High-income")
    .style("font-size", "15px")
svg7.append("text")
    .attr("x", 80)
    .attr("y", 135)
    .text("Upper-middle")
    .style("font-size", "15px")
svg7.append("text")
    .attr("x", 80)
    .attr("y", 165)
    .text("Lower-middle")
    .style("font-size", "15px")
svg7.append("text")
    .attr("x", 80)
    .attr("y", 195)
    .text("Low-Income")
    .style("font-size", "15px")


// Create legend for scatterplot 2
const svg8 = d3.select("#csv-scatter2")
                .append("svg")
                .attr("width", 300)
                .attr("height", 600)
                .attr("viewBox", [0, 0, 300, 200]);;

svg8.append("text")
    .attr("x", 40)
    .attr("y", 75)
    .text("Income Classification Legend")
    .style("font-size", "20px")
svg8.append("circle")
    .attr("cx", 60)
    .attr("cy", 100)
    .attr("r", 6)
    .style("fill", "#A5D6A7")
svg8.append("circle")
    .attr("cx", 60)
    .attr("cy", 130)
    .attr("r", 6)
    .style("fill", "#D1C4E9")
svg8.append("circle")
    .attr("cx", 60)
    .attr("cy", 160)
    .attr("r", 6)
    .style("fill", "#B2EBF2")
svg8.append("circle")
    .attr("cx", 60)
    .attr("cy", 190)
    .attr("r", 6)
    .style("fill", "#FFCDD2")
svg8.append("text")
    .attr("x", 80)
    .attr("y", 105)
    .text("High-income")
    .style("font-size", "15px")
svg8.append("text")
    .attr("x", 80)
    .attr("y", 135)
    .text("Upper-middle")
    .style("font-size", "15px")
svg8.append("text")
    .attr("x", 80)
    .attr("y", 165)
    .text("Lower-middle")
    .style("font-size", "15px")
svg8.append("text")
    .attr("x", 80)
    .attr("y", 195)
    .text("Low-Income")
    .style("font-size", "15px")

// Create legend for scatterplot 3
const svg9 = d3.select("#csv-scatter3")
                .append("svg")
                .attr("width", 300)
                .attr("height", 600)
                .attr("viewBox", [0, 0, 300, 200]);;

svg9.append("text")
    .attr("x", 40)
    .attr("y", 75)
    .text("Income Classification Legend")
    .style("font-size", "20px")
svg9.append("circle")
    .attr("cx", 60)
    .attr("cy", 100)
    .attr("r", 6)
    .style("fill", "#A5D6A7")
svg9.append("circle")
    .attr("cx", 60)
    .attr("cy", 130)
    .attr("r", 6)
    .style("fill", "#D1C4E9")
svg9.append("circle")
    .attr("cx", 60)
    .attr("cy", 160)
    .attr("r", 6)
    .style("fill", "#B2EBF2")
svg9.append("circle")
    .attr("cx", 60)
    .attr("cy", 190)
    .attr("r", 6)
    .style("fill", "#FFCDD2")
svg9.append("text")
    .attr("x", 80)
    .attr("y", 105)
    .text("High-income")
    .style("font-size", "15px")
svg9.append("text")
    .attr("x", 80)
    .attr("y", 135)
    .text("Upper-middle")
    .style("font-size", "15px")
svg9.append("text")
    .attr("x", 80)
    .attr("y", 165)
    .text("Lower-middle")
    .style("font-size", "15px")
svg9.append("text")
    .attr("x", 80)
    .attr("y", 195)
    .text("Low-Income")
    .style("font-size", "15px")

// Read data from csv file
d3.csv("data/clean_nutrition_df.csv").then((data) => {

    let x1, y1, x2, y2, x3, y3;

    let xKey1, yKey1, xKey2, yKey2, xKey3, yKey3;

// Use data to plot scatterplot 1 points
{
    xKey1 = "cost_energy";
    yKey1 = "percent_unafford_energy";


    // Set max y/height value based on highest data score
    let maxX1 = d3.max(data, (d) => { return d[xKey1]; });

    // Scale chart's x-value based off of size of data
    x1 = d3.scaleLinear()
                .domain([0, maxX1])
                .range([margin.left, width - margin.right]);

    // Add x-axis
    svg2.append("g")
       .attr("transform", `translate(0,${height - margin.bottom})`)
       .call(d3.axisBottom(x1))
       .attr("font-size", '20px')
       .call((g) => g.append("text")
                     .attr("x", width - margin.right)
                     .attr("y", margin.bottom - 4)
                     .attr("fill", "black")
                     .attr("text-anchor", "end")
                     .text("Cost of Energy Sufficient Diet (US $)")
    );
    // Set max y/height value based on highest data score
    let maxY1 = 80;
 
    // Scale chart based off of previously defined max y value
    y1 = d3.scaleLinear()
                .domain([0,maxY1])
                .range([height-margin.bottom,margin.top]);

    // Add y-axis
    svg2.append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y1))
        .attr("font-size", '20px')
        .call((g) => g.append("text")
                     .attr("x", 0)
                     .attr("y", margin.top - 15)
                     .attr("fill", "black")
                     .attr("text-anchor", "end")
                      .attr("transform", "translate(-100)rotate(-90)")
                     .text("Percent of Population Which Cannot Afford Diet (Diet > 65% of Income)"));


// Define brushing functionality
brush1 = d3.brush().extent([[0,0], [width, height]]);

svg2.call(brush1
     .on("start", clear)
     .on("brush", updateChart1));

    // Define scatter plots
    myCircles1 = svg2.append('g')
                     .selectAll("circle")
                     .data(data)
                   .enter()
                   .append("circle")
                   .attr("id", (d) => d.country_name)
                     .attr("cx", (d) => x1(d[xKey1]))
                     .attr("cy", (d) => y1(d[yKey1]))
                     .attr("r", 8)
                     .style("fill", (d) => color(d.income_classification_2017))
                     .style("opacity", 0.8)
                      .attr("class", "SimpleScatter")
                   .on("mouseover", mouseover2) // Calls mouseover2 event listener and link to event handler
                   .on("mousemove", mousemove2) // Calls mousemove2 event listener and link to event handler
                   .on("mouseleave", mouseleave2); // Calls mouseleave2 event listener and link to event handler

}


// Use data to plot scatterplot 2 points
{
    xKey2 = "cost_nutrition";
    yKey2 = "percent_unafford_nutrition";

    // Set max y/height value based on highest data score
    let maxX2 = d3.max(data, (d) => { return d[xKey2];
     });


    // Scale chart based off of previously defined max y value
    x2 = d3.scaleLinear()
                .domain([0, maxX2])
                .range([margin.left, width - margin.right]);

    // Add x-axis
    svg3.append("g")
       .attr("transform", `translate(0,${height - margin.bottom})`)
       .call(d3.axisBottom(x2))
       .attr("font-size", '20px')
       .call((g) => g.append("text")
          .attr("x", width - margin.right)
          .attr("y", margin.bottom - 4)
          .attr("fill", "black")
          .attr("text-anchor", "end")
          .text("Cost of Nutrient Adequate Diet (US $)"));

    // Set max y/height value based on highest data score
    let maxY2 = d3.max(data, (d) => { return d[yKey2];
     });

    // Scale chart based off of previously defined max y value
    y2 = d3.scaleLinear()
                .domain([0,maxY2])
                .range([height-margin.bottom,margin.top]);


    // Add y-axis
    svg3.append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y2))
        .attr("font-size", '20px')
        .call((g) => g.append("text")
          .attr("x", 0)
          .attr("y", margin.top)
          .attr("fill", "black")
          .attr("text-anchor", "end")
          .attr("transform", "translate(-100)rotate(-90)")
        .text("Percent of Population Which Cannot Afford Diet (Diet > 65% of Income)"));

// Define brushing functionality
brush2 = d3.brush().extent([[0,0], [width, height]]);

svg3.call(brush2
    .on("start", clear)
    .on("brush", updateChart2));

    // Define scatter plots
    myCircles2 = svg3.append('g')
    .selectAll("circle")
       .data(data)
       .enter()
       .append("circle")
         .attr("id", (d) => d.country_name)
         .attr("cx", (d) => x2(d[xKey2]))
         .attr("cy", (d) => y2(d[yKey2]))
         .attr("r", 8)
         .style("fill", (d) => color(d.income_classification_2017))
         .style("opacity", 0.8)
          .attr("class", "SimpleScatter")
       .on("mouseover", mouseover3) // Calls mouseover3 event listener and link to event handler
       .on("mousemove", mousemove3) // Calls mousemove3 event listener and link to event handler
       .on("mouseleave", mouseleave3);

}


// Use data to plot scatterplot 3 points
{
    xKey3 = "cost_healthy";
    yKey3 = "percent_unafford_healthy";


    // Set max y/height value based on highest data score
    let maxX3 = d3.max(data, (d) => { return d[xKey3];
    });


    // Scale chart based off of previously defined max y value
    x3 = d3.scaleLinear()
                .domain([0, maxX3])
                .range([margin.left, width - margin.right]);


    // Add x-axis
    svg4.append("g")
       .attr("transform", `translate(0,${height - margin.bottom})`)
       .call(d3.axisBottom(x3))
       .attr("font-size", '20px')
       .call((g) => g.append("text")
          .attr("x", width - margin.right)
          .attr("y", margin.bottom - 4)
          .attr("fill", "black")
          .attr("text-anchor", "end")
          .text("Cost of Recommended Healthy Diet (US $)"));

    // Set max y/height value based on highest data score
    let maxY3 = d3.max(data, (d) => { return d[yKey3];
     });

    // Scale chart based off of previously defined max y value
    y3 = d3.scaleLinear()
                .domain([0,maxY3])
                .range([height-margin.bottom,margin.top]);

    // Add y-axis
    svg4.append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y3))
        .attr("font-size", '20px')
        .call((g) => g.append("text")
          .attr("x", 0)
          .attr("y", margin.top)
          .attr("fill", "black")
          .attr("text-anchor", "end")
          .attr("transform", "translate(-100)rotate(-90)")
        .text("Percent of Population Which Cannot Afford Diet (Diet > 65% of Income)"));

// Define brushing functionality
brush3 = d3.brush().extent([[0,0], [width, height]]);

    svg4.call(brush3
        .on("start", clear)
        .on("brush", updateChart3));

    // Define scatter plots
     myCircles3 = svg4.append('g')
     .selectAll("circle")
       .data(data)
       .enter()
       .append("circle")
         .attr("cx", (d) => x3(d[xKey3]))
         .attr("cy", (d) => y3(d[yKey3]))
         .attr("r", 8)
         .style("fill", (d) => color(d.income_classification_2017))
         .attr("class", "SimpleScatter")
         .style("opacity", 0.8)
       .on("mouseover", mouseover4) // Calls mouseover4 event listener and link to event handler
       .on("mousemove", mousemove4) // Calls mousemove4 event listener and link to event handler
       .on("mouseleave", mouseleave4);

svg4.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Percent of Population Which Cannot Afford Recommended Healthy Diet vs. Cost of Diet");

}


// Brushing code
// Eemove existing brushes
function clear() {
    svg2.call(brush1.move, null);
    svg3.call(brush2.move, null);
    svg4.call(brush3.move, null);
}

// Scatterplot1 Brushing
function updateChart1(brushEvent) {

    extent = brushEvent.selection;

    // Outline to points within the brush region in Scatterplot 1
    myCircles1.classed("selected", function (d) {
          return isBrushed(extent, x1(d.cost_energy), y1(d.percent_unafford_energy))
       })

    // Bold outline for all points in Scatterplot 2 corresponding to points within the brush region
    myCircles2.classed("selected", function (d) {
          return isBrushed(extent, x1(d.cost_energy), y1(d.percent_unafford_energy))
       })

    // Bold outline to all points in Scatterplot 3 corresponding to points within the brush region
    myCircles3.classed("selected", function (d) {
          return isBrushed(extent, x1(d.cost_energy), y1(d.percent_unafford_energy))
       })
}

// Call when scatterplot 2 is brushed
function updateChart2(brushEvent) {

     extent = brushEvent.selection;

    // Outline to points within the brush region in Scatterplot 2
    myCircles1.classed("selected", function (d) {
          return isBrushed(extent, x2(d.cost_nutrition), y2(d.percent_unafford_nutrition))
       })

    // Bold outline for all points in Scatterplot 2 corresponding to points within the brush region
    myCircles2.classed("selected", function (d) {
          return isBrushed(extent, x2(d.cost_nutrition), y2(d.percent_unafford_nutrition))
       })

     // Bold outline to all points in Scatterplot 2 corresponding to points within the brush region
    myCircles3.classed("selected", function (d) {
          return isBrushed(extent, x2(d.cost_nutrition), y2(d.percent_unafford_nutrition))
       })
}

// Call when scatterplot 3 is brushed
function updateChart3(brushEvent) {

    extent = brushEvent.selection;

    // Outline to points within the brush region in Scatterplot 3
    myCircles1.classed("selected", function (d) {
          return isBrushed(extent, x3(d.cost_healthy), y3(d.percent_unafford_healthy))
       })

    // Bold outline for all points in Scatterplot 3 corresponding to points within the brush region
    myCircles2.classed("selected", function (d) {
          return isBrushed(extent, x3(d.cost_healthy), y3(d.percent_unafford_healthy))
       })

    // Bold outline to all points in Scatterplot 3 corresponding to points within the brush region
    myCircles3.classed("selected", function (d) {
          return isBrushed(extent, x3(d.cost_healthy), y3(d.percent_unafford_healthy))
       })
}


// Finds dots within brushed region
function isBrushed(brush_coords, cx, cy) {
  if (brush_coords === null) return;

  let x0 = brush_coords[0][0],
      x1 = brush_coords[1][0],
      y0 = brush_coords[0][1],
      y1 = brush_coords[1][1];
  return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1; // This return TRUE or FALSE depending on if the points is in the selected area
}
});
