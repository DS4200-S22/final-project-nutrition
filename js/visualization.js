// Set dimensions and margins for plots
const width = 900;
const height = 450;
const margin = {left:50, right:50, bottom:50, top:50};
const yTooltipOffset = 15;

// Hardcoded barchart data
const data1 = [
  {country_name: 'Belgium', cost_energy: 0.3, cost_nutrition: 2.4, cost_healthy: 2.9, percent_unafford_energy: 0.1, percent_unafford_nutrition: 0.2, percent_unafford_healthy: 0.3},
  {country_name: 'Costa Rica', cost_energy: 0.6, cost_nutrition: 2.7, cost_healthy: 3.9, percent_unafford_energy: 0.5, percent_unafford_nutrition: 4.9, percent_unafford_healthy: 10.6},
  {country_name: 'Ghana', cost_energy: 0.8, cost_nutrition: 2.5, cost_healthy: 4.3, percent_unafford_energy: 5.3, percent_unafford_nutrition: 34.3, percent_unafford_healthy: 60.9},
  {country_name: 'Iceland', cost_energy: 0.4, cost_nutrition: 2.5, cost_healthy: 2.4, percent_unafford_energy: 0.0, percent_unafford_nutrition: 0.0, percent_unafford_healthy: 0.0},
  {country_name: 'Japan', cost_energy: 3.0, cost_nutrition: 3.6, cost_healthy: 5.2, percent_unafford_energy: 0.9, percent_unafford_nutrition: 1.2, percent_unafford_healthy: 1.6},
  {country_name: 'Mexico', cost_energy: 0.7, cost_nutrition: 2.6, cost_healthy: 3.3, percent_unafford_energy: 0.4, percent_unafford_nutrition: 10.3, percent_unafford_healthy: 17.9},
  // {country_name: 'Singapore', cost_energy: 0.8, cost_nutrition: 2.0, cost_healthy: 3.4, percent_unafford_energy: 'NA', percent_unafford_nutrition: 'NA', percent_unafford_healthy: 'NA'}
];


// BAR CHART
// Create svg shape to store and display the barchart
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Set max possible height
let maxY1 = d3.max(data1, function(d) { return d.cost_nutrition; });

// Scale the chart based off of previously defined maxmimum y value
let yScale1 = d3.scaleLinear()
            .domain([0,maxY1])
            .range([height-margin.bottom,margin.top]);

// Scale the chart's x-value based off of size of data
let xScale1 = d3.scaleBand()
            .domain(d3.range(data1.length))
            .range([margin.left, width - margin.right])
            .padding(0.1);

// Scale previously created svg object to y-value based off of data, format y-axis
svg1.append("g")
   .attr("transform", `translate(${margin.left}, 0)`)
   .call(d3.axisLeft(yScale1))
   .attr("font-size", '20px');

// Scale previously defined svg object width-wise based off of data, format x-axis
svg1.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale1)
            .tickFormat(i => data1[i].country_name))
    .attr("font-size", '20px');


    // Define csv bar chart
    svg1.selectAll(".bar")
       .data(data1)
       .enter()
       .append("rect")
         .attr("class", "bar")
         .attr("x", (d,i) => xScale1(i))
         .attr("y", (d) => yScale1(d.cost_nutrition))
         .attr("height", (d) => (height - margin.bottom) - yScale1(d.cost_nutrition))
         .attr("width", xScale1.bandwidth());


// // Set margins and dimensions
// const margin = { top: 50, right: 50, bottom: 50, left: 200 };
// const width = 900 - margin.left - margin.right;
// const height = 650 - margin.top - margin.bottom;

// SCATTERPLOT

// Append svg object to the body of the page to house Scatterplot1
const svg2 = d3.select("#hard-coded-scatter1")
              .append("svg")
              .attr("width", width - margin.left - margin.right)
              .attr("height", height - margin.top - margin.bottom)
              .attr("viewBox", [0, 0, width, height]);

// set the max possible y/height value based on highest data score
let maxY2 = d3.max(data1, function(d) { return d.percent_unafford_energy; });

// scale the chart based off of previously defined maxmimum y value
let yScale2 = d3.scaleLinear()
            .domain([0,maxY2])
            .range([height-margin.bottom,margin.top]);

// set the max possible y/height value based on highest data score
let maxX2 = d3.max(data1, function(d) { return d.cost_energy; });


// scale the chart's x-value based off of size of data
let xScale2 = d3.scaleLinear()
            .domain([0, maxX2])
            .range([margin.left, width - margin.right]);

// define csv bar chart
svg2.selectAll("circle")
   .data(data1)
   .enter()
   .append("circle")
     .attr("cx", (d) => xScale2(d.cost_energy))
     .attr("cy", (d) => yScale2(d.percent_unafford_energy))
     .attr("r", 10)
     .attr("fill", "red")
     .attr("class", "SimpleScatter");

// scale previously created svg object to y-value based off of data, format y-axis
svg2.append("g")
   .attr("transform", `translate(0,${height - margin.bottom})`)
   .call(d3.axisBottom(xScale2))
   .attr("font-size", '20px');

// svale previously defined svg object width-wise based off of data, format x-axis
svg2.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale2))
    .attr("font-size", '20px');


const svg3 = d3.select("#hard-coded-scatter2")
              .append("svg")
              .attr("width", width - margin.left - margin.right)
              .attr("height", height - margin.top - margin.bottom)
              .attr("viewBox", [0, 0, width, height]);

// set the max possible y/height value based on highest data score
let maxY3 = d3.max(data1, function(d) { return d.percent_unafford_nutrition; });

// scale the chart based off of previously defined maxmimum y value
let yScale3 = d3.scaleLinear()
            .domain([0,maxY3])
            .range([height-margin.bottom,margin.top]);

// set the max possible y/height value based on highest data score
let maxX3 = d3.max(data1, function(d) { return d.cost_nutrition; });


// scale the chart's x-value based off of size of data
let xScale3 = d3.scaleLinear()
            .domain([0, maxX3])
            .range([margin.left, width - margin.right]);

// define csv bar chart
svg3.selectAll("circle")
   .data(data1)
   .enter()
   .append("circle")
     .attr("cx", (d) => xScale2(d.cost_nutrition))
     .attr("cy", (d) => yScale2(d.percent_unafford_nutrition))
     .attr("r", 10)
     .attr("fill", "orange")
     .attr("class", "SimpleScatter");

// scale previously created svg object to y-value based off of data, format y-axis
svg3.append("g")
   .attr("transform", `translate(0,${height - margin.bottom})`)
   .call(d3.axisBottom(xScale3))
   .attr("font-size", '20px');

// svale previously defined svg object width-wise based off of data, format x-axis
svg3.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale3))
    .attr("font-size", '20px');

const svg4 = d3.select("#hard-coded-scatter3")
              .append("svg")
              .attr("width", width - margin.left - margin.right)
              .attr("height", height - margin.top - margin.bottom)
              .attr("viewBox", [0, 0, width, height]);

// set the max possible y/height value based on highest data score
let maxY4 = d3.max(data1, function(d) { return d.percent_unafford_healthy; });

// scale the chart based off of previously defined maxmimum y value
let yScale4 = d3.scaleLinear()
            .domain([0,maxY4])
            .range([height-margin.bottom,margin.top]);

// set the max possible y/height value based on highest data score
let maxX4 = d3.max(data1, function(d) { return d.cost_healthy; });


// scale the chart's x-value based off of size of data
let xScale4 = d3.scaleLinear()
            .domain([0, maxX4])
            .range([margin.left, width - margin.right]);

// define csv bar chart
svg4.selectAll("circle")
   .data(data1)
   .enter()
   .append("circle")
     .attr("cx", (d) => xScale2(d.cost_healthy))
     .attr("cy", (d) => yScale2(d.percent_unafford_healthy))
     .attr("r", 10)
     .attr("fill", "green")
     .attr("class", "SimpleScatter");

// scale previously created svg object to y-value based off of data, format y-axis
svg4.append("g")
   .attr("transform", `translate(0,${height - margin.bottom})`)
   .call(d3.axisBottom(xScale4))
   .attr("font-size", '20px');

// svale previously defined svg object width-wise based off of data, format x-axis
svg4.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale4))
    .attr("font-size", '20px');


// TBD
// Create svg shage
const svg5 = d3
  .select("#vis-container")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

//


// Import and display data in console
d3.csv('/data/cleaned_nutrition_df.csv').then((data) => {
  for (var i = 0; i < 10; i++) {
      console.log(data[i]);
  }
});
