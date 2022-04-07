// Set dimensions and margins for plots
const width = 1200;
const height = 600;
const margin = {left:250, right:50, bottom:50, top:50};
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
}

    

   

    

   
});



   



//Bar Chart

const heightbar = 2500;
const marginbar = {left:150, right:50, bottom:50, top:50};

const svg1 = d3.select("#csv-bar")
              .append("svg")
              .attr("width", width+marginbar.left+marginbar.right)
              .attr("height", heightbar + marginbar.top + marginbar.bottom)
              .append("g")
              .style("margin-top", "10px")
              .attr("transform", "translate("+marginbar.left + "," + marginbar.top + ")");


// d3.csv("/data/clean_nutrition_df.csv").then((data) => {
      // Add x-axis
      let x = d3.scaleLinear()
                // .domain([0, d3.max(data, function(d) {return d.cost_nutrition})])
                .range([0, width]);
      let xAxis = svg1.append("g")
                      .attr("class", "myXaxis")

// maybe dont need this g stuff??

      // let g = svg1.append("g")
      //             .attr("transform", "translate(0," + heightbar + ")") //yaxis stuff?
      //             .call(d3.axisBottom(x))
      //             .selectAll("text")
      //             .attr("transform", "translate(-10,0)rotate(-45)")
      //             .style("text-anchor", "end");

       // Add y-axis
      let y = d3.scaleBand()
                .range([0, heightbar])
                // .domain(data.map(function(d) {return d.country_name;}))
                .padding(.1);
      let yAxis = svg1.append("g")
                      .attr("transform", "translate(0," + heightbar + ")")


      function update(selectedVar) {

        d3.csv("/data/clean_nutrition_df.csv").then((data) => {
            y.domain(data.map(function(d) {return d.country_name; }))
            // yAxis.transition().duration(1000).call(d3.axisLeft(y))

            x.domain([0, d3.max(data, function(d) {return +d[selectedVar] }) ]);
            xAxis.transition().duration(1000).call(d3.axisTop(x));

const tooltip1 = d3.select("#csv-bar")
                    .append("div")
                    .attr("id", "tooltip1")
                    .select("opacity", 0)
                    .attr("class", "tooltip");



// const mouseover1 = function(event, d) {
//     tooltip1.html(d.country_name + "<br>" + function(d) {return (d[selectedVar]); } + "<br>")
//             .style("opacity", 1);
// }



// const mousemove1 = function(event, d) {
//     tooltip1.style("left", (event.x) + "px")
//     .style("top", (event.y + yTooltipOffset) + "px");
// }



// const mouseleave1 = function(event, d) {
//     tooltip1.style("opacity", 0);
// }
            let u = svg1.selectAll("rect")
                        .data(data)


            u.enter()
             .append("rect")
             .merge(u)
             .transition()
             .duration(1000)
             .attr("y", function(d) {return y(d.country_name); })
             .attr("x", 0) //function(d) {return x(d[selectedVar]); })
             .attr("width", function(d) {return x(d[selectedVar]); }) //do i need to have width -
             .attr("height", y.bandwidth())
             .attr("fill", "#69b3a2")
            


            //  svg1.append("g")
            // .attr("class", "x axis")
            // .call(d3.axisBottom(x).ticks(5).tickFormat(function(d) { return parseInt(d / 1000); }).tickSizeInner([-heightbar]));

            svg1.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y));

           
           //tried to add labels but not working :(

            // u.append("text")
            //  .attr("class", "label")
            //  .attr("y", function(d) {
            //     return y(d.country_name) y.bandwidth() / 2 + 4;
            //  })
            //  .attr("x", function(d) {
            //     return x(d[selectedVar]) + 3;
            //  })
            //  .text(function(d) {
            //     return d[selectedVar];
            //  })

        })
      }

      update('cost_energy')

      // svg1.selectAll(".bar")
      //       .data(data)
      //       .enter()
      //       .append("rect")
      //       .attr("class", "bar")
      //       .attr("x", 0)
      //       .attr("height", y.bandwidth())
      //       .attr("y", function(d) {return y(d.country_name);})
      //       .attr("width", function(d) {return x(d.cost_nutrition);})
      //       .on("mouseover", mouseover1)
      //       .on("mousemove", mousemove1)
      //       .on("mouseleave", mouseleave1);

      // g.append("g")
      //   .attr("class", "x axis")
      //   .call(d3.axisBottom(x).ticks(5).tickFormat(function(d) { return parseInt(d / 1000); }).tickSizeInner([-heightbar]));

      // g.append("g")
      //   .attr("class", "y axis")
      //   .call(d3.axisLeft(y));

      // svg1.append("g")
      //     .call(d3.axisLeft(y));
// });























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


