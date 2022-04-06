// Set dimensions and margins for plots
const width = 900;
const height = 450;
const margin = {left:50, right:50, bottom:50, top:50};
const yTooltipOffset = 15;

// const width1 = 900;
// const height1 = 500;

// Hardcoded barchart data
// const data1 = [
//   {country_name: 'Belgium', cost_energy: 0.3, cost_nutrition: 2.4, cost_healthy: 2.9, percent_unafford_energy: 0.1, percent_unafford_nutrition: 0.2, percent_unafford_healthy: 0.3},
//   {country_name: 'Costa Rica', cost_energy: 0.6, cost_nutrition: 2.7, cost_healthy: 3.9, percent_unafford_energy: 0.5, percent_unafford_nutrition: 4.9, percent_unafford_healthy: 10.6},
//   {country_name: 'Ghana', cost_energy: 0.8, cost_nutrition: 2.5, cost_healthy: 4.3, percent_unafford_energy: 5.3, percent_unafford_nutrition: 34.3, percent_unafford_healthy: 60.9},
//   {country_name: 'Iceland', cost_energy: 0.4, cost_nutrition: 2.5, cost_healthy: 2.4, percent_unafford_energy: 0.0, percent_unafford_nutrition: 0.0, percent_unafford_healthy: 0.0},
//   {country_name: 'Japan', cost_energy: 3.0, cost_nutrition: 3.6, cost_healthy: 5.2, percent_unafford_energy: 0.9, percent_unafford_nutrition: 1.2, percent_unafford_healthy: 1.6},
//   {country_name: 'Mexico', cost_energy: 0.7, cost_nutrition: 2.6, cost_healthy: 3.3, percent_unafford_energy: 0.4, percent_unafford_nutrition: 10.3, percent_unafford_healthy: 17.9},
//   // {country_name: 'Singapore', cost_energy: 0.8, cost_nutrition: 2.0, cost_healthy: 3.4, percent_unafford_energy: 'NA', percent_unafford_nutrition: 'NA', percent_unafford_healthy: 'NA'}
// ];

// const svg1 = d3
//   .select("#csv-bar")
//   .append("svg")
//   .attr("width", width-margin.left-margin.right)
//   .attr("height", height - margin.top - margin.bottom)
//   .attr("viewBox", [0, 0, width, height]);
//
// d3.csv("/data/clean_nutrition_df.csv").then((data) => {
//
//     // Set max possible height
//     let maxY1 = d3.max(data, function(d) { return d.cost_nutrition; });
//
//     // Scale the chart based off of previously defined maxmimum y value
//     let yScale1 = d3.scaleLinear()
//                 .domain([0,maxY1])
//                 .range([height-margin.bottom,margin.top]);
//
//     // Scale the chart's x-value based off of size of data
//     let xScale1 = d3.scaleBand()
//                 .domain(d3.range(data1.length))
//                 .range([margin.left, width - margin.right])
//                 .padding(0.1);
//
//     // Scale previously created svg object to y-value based off of data, format y-axis
//     svg1.append("g")
//        .attr("transform", `translate(${margin.left}, 0)`)
//        .call(d3.axisLeft(yScale1))
//        .attr("font-size", '20px');
//
//     // Scale previously defined svg object width-wise based off of data, format x-axis
//     svg1.append("g")
//         .attr("transform", `translate(0,${height - margin.bottom})`)
//         .call(d3.axisBottom(xScale1)
//                 .tickFormat(i => data[i].country_name))
//         .attr("font-size", '20px');
//
//
//     // Define csv bar chart
//     svg1.selectAll(".bar")
//        .data(data)
//        .enter()
//        .append("rect")
//          .attr("class", "bar")
//          .attr("x", (d,i) => xScale1(i))
//          .attr("y", (d) => yScale1(d.cost_nutrition))
//          .attr("height", (d) => (height - margin.bottom) - yScale1(d.cost_nutrition))
//          .attr("width", xScale1.bandwidth());
//
// });


// // Set margins and dimensions
// const margin = { top: 50, right: 50, bottom: 50, left: 200 };
// const width = 900 - margin.left - margin.right;
// const height = 650 - margin.top - margin.bottom;

//SCATTERPLOT 1
// Append svg object to the body of the page to house Scatterplot1
const svg2 = d3.select("#csv-scatter1")
                  .append("svg")
                  .attr("width", width - margin.left - margin.right)
                  .attr("height", height - margin.top - margin.bottom)
                  .attr("viewBox", [0, 0, width, height]);

d3.csv("/data/clean_nutrition_df.csv").then((data) => {
    // set the max possible y/height value based on highest data score
    let maxY2 = d3.max(data, function(d) { return d.percent_unafford_energy; });

    // scale the chart based off of previously defined maxmimum y value
    let yScale2 = d3.scaleLinear()
                .domain([0,maxY2])
                .range([height-margin.bottom,margin.top]);

    // set the max possible y/height value based on highest data score
    let maxX2 = d3.max(data, function(d) { return d.cost_energy; });


    // scale the chart's x-value based off of size of data
    let xScale2 = d3.scaleLinear()
                .domain([0, maxX2])
                .range([margin.left, width - margin.right]);

    // define csv bar chart
    svg2.selectAll("circle")
       .data(data)
       .enter()
       .append("circle")
         .attr("cx", (d) => xScale2(d.cost_energy))
         .attr("cy", (d) => yScale2(d.percent_unafford_energy))
         .attr("r", 5)
         .attr("fill", "red")
         .attr("class", "SimpleScatter")
       .on("mouseover", mouseover2) // Calls mouseover2 event listener and link to event handler
       .on("mousemove", mousemove2) // Calls mousemove2 event listener and link to event handler
       .on("mouseleave", mouseleave2); // Calls mouseleave2 event listener and link to event handler

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
});

//SCATTERPLOT 2
const svg3 = d3.select("#csv-scatter2")
                  .append("svg")
                  .attr("width", width - margin.left - margin.right)
                  .attr("height", height - margin.top - margin.bottom)
                  .attr("viewBox", [0, 0, width, height]);

d3.csv("/data/clean_nutrition_df.csv").then((data) => {

    // set the max possible y/height value based on highest data score
    let maxY3 = d3.max(data, function(d) { return d.percent_unafford_nutrition; });

    // scale the chart based off of previously defined maxmimum y value
    let yScale3 = d3.scaleLinear()
                .domain([0,maxY3])
                .range([height-margin.bottom,margin.top]);

    // set the max possible y/height value based on highest data score
    let maxX3 = d3.max(data, function(d) { return d.cost_nutrition; });


    // scale the chart's x-value based off of size of data
    let xScale3 = d3.scaleLinear()
                .domain([0, maxX3])
                .range([margin.left, width - margin.right]);

    // define csv bar chart
    svg3.selectAll("circle")
       .data(data)
       .enter()
       .append("circle")
         .attr("cx", (d) => xScale3(d.cost_nutrition))
         .attr("cy", (d) => yScale3(d.percent_unafford_nutrition))
         .attr("r", 5)
         .attr("fill", "orange")
         .attr("class", "SimpleScatter")
       .on("mouseover", mouseover3) // Calls mouseover3 event listener and link to event handler
       .on("mousemove", mousemove3) // Calls mousemove3 event listener and link to event handler
       .on("mouseleave", mouseleave3);


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
    });

//SCATTERPLOT 3
const svg4 = d3.select("#csv-scatter3")
                .append("svg")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0, 0, width, height]);

d3.csv("/data/clean_nutrition_df.csv").then((data) => {

    // set the max possible y/height value based on highest data score
    let maxY4 = d3.max(data, function(d) { return d.percent_unafford_healthy; });

    // scale the chart based off of previously defined maxmimum y value
    let yScale4 = d3.scaleLinear()
                .domain([0,maxY4])
                .range([height-margin.bottom,margin.top]);

    // set the max possible y/height value based on highest data score
    let maxX4 = d3.max(data, function(d) { return d.cost_healthy; });


    // scale the chart's x-value based off of size of data
    let xScale4 = d3.scaleLinear()
                .domain([0, maxX4])
                .range([margin.left, width - margin.right]);

    // define csv bar chart
    svg4.selectAll("circle")
       .data(data)
       .enter()
       .append("circle")
         .attr("cx", (d) => xScale4(d.cost_healthy))
         .attr("cy", (d) => yScale4(d.percent_unafford_healthy))
         .attr("r", 5)
         .attr("fill", "green")
         .attr("class", "SimpleScatter")
       .on("mouseover", mouseover4) // Calls mouseover4 event listener and link to event handler
       .on("mousemove", mousemove4) // Calls mousemove4 event listener and link to event handler
       .on("mouseleave", mouseleave4);

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
});

const svg1 = d3.select("#csv-bar")
              .append("svg")
              .attr("width", width+margin.left+margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .style("margin-top", "10px")
              .attr("transform", "translate("+margin.left + "," + margin.top + ")");


d3.csv("/data/clean_nutrition_df.csv").then((data) => {
      // Add x-axis
      let x = d3.scaleLinear()
                .domain([0, d3.max(data, function(d) {return d.cost_nutrition})])
                .range([0, width]);

      let g = svg1.append("g")
                  .attr("transform", "translate(0," + height + ")")
                  .call(d3.axisBottom(x))
                  .selectAll("text")
                  .attr("transform", "translate(-10,0)rotate(-45)")
                  .style("text-anchor", "end");

       // Add y-axis
      let y = d3.scaleBand()
                .range([0, height])
                .domain(data.map(function(d) {return d.country_name;}))
                .padding(.1);

      svg1.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", 0)
            .attr("height", y.bandwidth())
            .attr("y", function(d) {return y(d.country_name);})
            .attr("width", function(d) {return x(d.cost_nutrition);})
            .on("mouseover", mouseover1)
            .on("mousemove", mousemove1)
            .on("mouseleave", mouseleave1);

      g.append("g")
        .attr("class", "x axis")
        .call(d3.axisBottom(x).ticks(5).tickFormat(function(d) { return parseInt(d / 1000); }).tickSizeInner([-height]));

      g.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y));

      svg1.append("g")
          .call(d3.axisLeft(y));
});

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
// d3.csv('/data/clean_nutrition_df.csv').then((data) => {
//   for (var i = 0; i < 10; i++) {
//       console.log(data[i]);
//   }
// });



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

// tooltip

const tooltip1 = d3.select("#csv-bar")
                    .append("div")
                    .attr("id", "tooltip1")
                    .select("opacity", 0)
                    .attr("class", "tooltip");



const mouseover1 = function(event, d) {
    tooltip1.html(d.country_name + "<br>" + d.cost_nutrition + "<br>")
            .style("opacity", 1);
}



const mousemove1 = function(event, d) {
    tooltip1.style("left", (event.x) + "px")
    .style("top", (event.y + yTooltipOffset) + "px");
}



const mouseleave1 = function(event, d) {
    tooltip1.style("opacity", 0);
}
