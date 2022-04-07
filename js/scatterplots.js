// Set dimensions and margins for plots
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

// Creates event handler that is triggered when mouse is over the point
const mouseover2 = function(event, d) {
  tooltip2.html("Country: " + d.country_name + "<br> Cost of energy sufficient diet: $" + d.cost_energy + "0<br> Percentage of population unable to afford an energy sufficient diet: " + d.percent_unafford_energy + "%<br>") // Sets html to show name and score
          .style("opacity", 1); // Sets opacity to 1 so tooltip shows up
}

// Creates event handler that is triggered when mouse is moved over the bar
const mousemove2 = function(event, d) {
  tooltip2.style("left", (event.pageX)+"px") // Set position of tooltip to be where x value of where mouse is plus offset
          .style("top", (event.pageY + yTooltipOffset) +"px"); // Set position of tooltip to be equal to y value of where mouse is plus offset
}

// Creates event handler that is triggered when mouse leaves the bar
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

// Creates event handler that is triggered when mouse is over the point
const mouseover3 = function(event, d) {
  tooltip3.html("Country: " + d.country_name + "<br> Cost of nutritious diet: $" + d.cost_nutrition + "0<br> Percentage of population unable to afford a nutritious diet: " + d.percent_unafford_nutrition + "%<br>") // Sets html to show name and score
          .style("opacity", 1); // Sets opacity to 1 so tooltip shows up
}

// Creates event handler that is triggered when mouse is moved over the bar
const mousemove3 = function(event, d) {
  tooltip3.style("left", (event.pageX)+"px") // Set position of tooltip to be where x value of where mouse is plus offset
          .style("top", (event.pageY + yTooltipOffset) +"px"); // Set position of tooltip to be equal to y value of where mouse is plus offset
}

// Creates event handler that is triggered when mouse leaves the bar
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

// Creates event handler that is triggered when mouse is over the point
const mouseover4 = function(event, d) {
  tooltip4.html("Country: " + d.country_name + "<br> Cost of healthy diet: $" + d.cost_healthy + "0<br> Percentage of population unable to afford a healthy diet: " + d.percent_unafford_healthy + "%<br>") // Sets html to show name and score
          .style("opacity", 1); // Sets opacity to 1 so tooltip shows up
}

// Creates event handler that is triggered when mouse is moved over the bar
const mousemove4 = function(event, d) {
  tooltip4.style("left", (event.pageX)+"px") // Set position of tooltip to be where x value of where mouse is plus offset
          .style("top", (event.pageY + yTooltipOffset) +"px"); // Set position of tooltip to be equal to y value of where mouse is plus offset
}

// Creates event handler that is triggered when mouse leaves the bar
const mouseleave4 = function(event, d) {
  tooltip4.style("opacity", 0); // sets the tooltip opacity to 0 so it disappears
}











//SCATTERPLOT 1
// Append svg object to the body of the page to house Scatterplot1
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
                  .attr("viewBox", [0, 0, width, height]);

let brush2;
let myCircles2;

//SCATTERPLOT 3
const svg4 = d3.select("#csv-scatter3")
                .append("svg")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0, 0, width, height]);

let brush3;
let myCircles3;


const color = d3.scaleOrdinal()
                .domain(["High-income", "Upper-middle", "Lower-middle", "Low-income"])
                .range(["#FF176", "#D1C4E9", "#B2EBF2", "#A5D6A7"])



d3.csv("/data/clean_nutrition_df.csv").then((data) => {

    let x1, y1, x2, y2, x3, y3;

    let xKey1, yKey1, xKey2, yKey2, xKey3, yKey3;

//SCATTERPLOT 1
{
    xKey1 = "cost_energy";
    yKey1 = "percent_unafford_energy";


    // set the max possible y/height value based on highest data score
    let maxX1 = d3.max(data, (d) => { return d[xKey1]; });

    // scale the chart's x-value based off of size of data
    let x1 = d3.scaleLinear()
                .domain([0, maxX1])
                .range([margin.left, width - margin.right]);

    // add x-axis
    svg2.append("g")
       .attr("transform", `translate(0,${height - margin.bottom})`)
       .call(d3.axisBottom(x1))
       .attr("font-size", '20px')
       .call((g) => g.append("text")
                     .attr("x", width - margin.right)
                     .attr("y", margin.bottom - 4)
                     .attr("fill", "black")
                     .attr("text-anchor", "end")
                     .text(xKey1)
    );

    // set the max possible y/height value based on highest data score
    let maxY1 = d3.max(data, (d) => { return d[yKey1]; });

    // scale the chart based off of previously defined maxmimum y value
    let y1 = d3.scaleLinear()
                .domain([0,maxY1])
                .range([height-margin.bottom,margin.top]);

    // add y-axis
    svg2.append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y1))
        .attr("font-size", '20px')
        .call((g) => g.append("text")
                     .attr("x", 0)
                     .attr("y", margin.top)
                     .attr("fill", "black")
                     .attr("text-anchor", "end")
                     .text(yKey1));

 // define csv bar chart
    myCircles1 = svg2.selectAll("circle")
                     .data(data)
                   .enter()
                   .append("circle")
                     .attr("cx", (d) => x1(d[xKey1]))
                     .attr("cy", (d) => y1(d[yKey1]))
                     .attr("r", 5)
                     .style("fill", (d) => color(d.income_classification_2017))
                     .attr("class", "SimpleScatter")
                   .on("mouseover", mouseover2) // Calls mouseover2 event listener and link to event handler
                   .on("mousemove", mousemove2) // Calls mousemove2 event listener and link to event handler
                   .on("mouseleave", mouseleave2); // Calls mouseleave2 event listener and link to event handler

brush1 = d3.brush().extent([[0,0], [width, height]]);

svg2.call(brush1
    .on("start", clear)
    .on("brush", updateChart1));

}


// SCATTERPLOT 2
{
    xKey2 = "cost_nutrition";
    yKey2 = "percent_unafford_nutrition";

// set the max possible y/height value based on highest data score
    let maxX2 = d3.max(data, (d) => { return d[xKey2];
     });


// scale the chart's x-value based off of size of data
    let x2 = d3.scaleLinear()
                .domain([0, maxX2])
                .range([margin.left, width - margin.right]);

 // add x-axis
    svg3.append("g")
       .attr("transform", `translate(0,${height - margin.bottom})`)
       .call(d3.axisBottom(x2))
       .attr("font-size", '20px')
       .call((g) => g.append("text")
          .attr("x", width - margin.right)
          .attr("y", margin.bottom - 4)
          .attr("fill", "black")
          .attr("text-anchor", "end")
          .text(xKey2));

// set the max possible y/height value based on highest data score
    let maxY2 = d3.max(data, (d) => { return d[yKey2];
     });

    // scale the chart based off of previously defined maxmimum y value
    let y2 = d3.scaleLinear()
                .domain([0,maxY2])
                .range([height-margin.bottom,margin.top]);


 // add y-axis
    svg3.append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y2))
        .attr("font-size", '20px')
        .call((g) => g.append("text")
          .attr("x", 0)
          .attr("y", margin.top)
          .attr("fill", "black")
          .attr("text-anchor", "end")
          .text(yKey2));

 // define csv bar chart
    myCircles2 = svg3.selectAll("circle")
       .data(data)
       .enter()
       .append("circle")
         .attr("cx", (d) => x2(d[xKey2]))
         .attr("cy", (d) => y2(d[yKey2]))
         .attr("r", 5)
         .style("fill", (d) => color(d.income_classification_2017))
         .attr("class", "SimpleScatter")
       .on("mouseover", mouseover3) // Calls mouseover3 event listener and link to event handler
       .on("mousemove", mousemove3) // Calls mousemove3 event listener and link to event handler
       .on("mouseleave", mouseleave3);


brush2 = d3.brush().extent([[0,0], [width, height]]);

svg3.call(brush2
    .on("start", clear)
    .on("brush", updateChart2));

}


// SCATTERPLOT 3
{
    xKey3 = "cost_healthy";
    yKey3 = "percent_unafford_healthy";


    // set the max possible y/height value based on highest data score
    let maxX3 = d3.max(data, (d) => { return d[xKey3];
    });


    // scale the chart's x-value based off of size of data
    let x3 = d3.scaleLinear()
                .domain([0, maxX3])
                .range([margin.left, width - margin.right]);


// add x-axis
    svg4.append("g")
       .attr("transform", `translate(0,${height - margin.bottom})`)
       .call(d3.axisBottom(x3))
       .attr("font-size", '20px')
       .call((g) => g.append("text")
          .attr("x", width - margin.right)
          .attr("y", margin.bottom - 4)
          .attr("fill", "black")
          .attr("text-anchor", "end")
          .text(xKey3));

 // set the max possible y/height value based on highest data score
    let maxY3 = d3.max(data, (d) => { return d[yKey3];
     });

    // scale the chart based off of previously defined maxmimum y value
    let y3 = d3.scaleLinear()
                .domain([0,maxY3])
                .range([height-margin.bottom,margin.top]);

     // y-axis
    svg4.append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y3))
        .attr("font-size", '20px')
        .call((g) => g.append("text")
          .attr("x", 0)
          .attr("y", margin.top)
          .attr("fill", "black")
          .attr("text-anchor", "end")
          .text(yKey3));


     // define csv bar chart
    svg4.selectAll("circle")
       .data(data)
       .enter()
       .append("circle")
         .attr("cx", (d) => x3(d[xKey3]))
         .attr("cy", (d) => y3(d[yKey3]))
         .attr("r", 5)
         .style("fill", (d) => color(d.income_classification_2017))
         .attr("class", "SimpleScatter")
       .on("mouseover", mouseover4) // Calls mouseover4 event listener and link to event handler
       .on("mousemove", mousemove4) // Calls mousemove4 event listener and link to event handler
       .on("mouseleave", mouseleave4);

    brush3 = d3.brush().extent([[0,0], [width, height]]);

    svg4.call(brush3
        .on("start", clear)
        .on("brush", updateChart3));
}


//Brushing code

//call to remove existing brushes
function clear() {
    svg2.call(brush1.move, null);
    svg3.call(brush2.move, null);
    svg4.call(brush3.move, null);
}

//call when scatterplot 1 is brushed
function updateChart1(brushEvent) {

    //TODO: Find coordinates of brushed region
    let coordinates = d3.brushSelection(this);

    //TODO: Give bold outline to all points within the brush region in Scatterplot1
    myCircles1.classed("selected", function (d) {
          return isBrushed(coordinates, x1(d.cost_energy), y1(d.percent_unafford_energy))
       })

    //TODO: Give bold outline to all points in Scatterplot2 corresponding to points within the brush region in Scatterplot1
    myCircles2.classed("selected", function (d) {
          return isBrushed(coordinates, x1(d.cost_nutrition), y1(d.percent_unafford_nutrition))
       })

     //TODO: Give bold outline to all points in Scatterplot3 corresponding to points within the brush region in Scatterplot1
    myCircles3.classed("selected", function (d) {
          return isBrushed(coordinates, x1(d.cost_healthy), y1(d.percent_unafford_healthy))
       })
}

//call when scatterplot 2 is brushed
function updateChart2(brushEvent) {

    //TODO: Find coordinates of brushed region
    let coordinates = d3.brushSelection(this);

    //TODO: Give bold outline to all points within the brush region in Scatterplot1
    myCircles1.classed("selected", function (d) {
          return isBrushed(coordinates, x2(d.cost_energy), y2(d.percent_unafford_energy))
       })

    //TODO: Give bold outline to all points in Scatterplot2 corresponding to points within the brush region in Scatterplot1
    myCircles2.classed("selected", function (d) {
          return isBrushed(coordinates, x2(d.cost_nutrition), y2(d.percent_unafford_nutrition))
       })

     //TODO: Give bold outline to all points in Scatterplot3 corresponding to points within the brush region in Scatterplot1
    myCircles3.classed("selected", function (d) {
          return isBrushed(coordinates, x2(d.cost_healthy), y2(d.percent_unafford_healthy))
       })
}

//call when scatterplot 2 is brushed
function updateChart3(brushEvent) {

    //TODO: Find coordinates of brushed region
    let coordinates = d3.brushSelection(this);

    //TODO: Give bold outline to all points within the brush region in Scatterplot1
    myCircles1.classed("selected", function (d) {
          return isBrushed(coordinates, x3(d.cost_energy), y3(d.percent_unafford_energy))
       })

    //TODO: Give bold outline to all points in Scatterplot2 corresponding to points within the brush region in Scatterplot1
    myCircles2.classed("selected", function (d) {
          return isBrushed(coordinates, x3(d.cost_nutrition), y3(d.percent_unafford_nutrition))
       })

     //TODO: Give bold outline to all points in Scatterplot3 corresponding to points within the brush region in Scatterplot1
    myCircles3.classed("selected", function (d) {
          return isBrushed(coordinates, x3(d.cost_healthy), y3(d.percent_unafford_healthy))
       })
}


//Finds dots within the brushed region
function isBrushed(brush_coords, cx, cy) {
  if (brush_coords === null) return;

  var x0 = brush_coords[0][0],
    x1 = brush_coords[1][0],
    y0 = brush_coords[0][1],
    y1 = brush_coords[1][1];
  return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1; // This return TRUE or FALSE depending on if the points is in the selected area
} });
