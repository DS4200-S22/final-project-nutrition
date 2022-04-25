
const widthmap = 1300;
const heightmap = 550;


// here we import the data from our csv file 
d3.csv("data/cleaned_nutrition_df.csv").then((data) => {

  // svg created and defined width and heigh of the svg
  let svgmap = d3.select("#map-id")
                 .attr("width", widthmap)
                 .attr("height", heightmap)
                  margin1 = {top: 60, right: 100, bottom: 30, left: 50};

  // create the map
  let path = d3.geoPath();


  let projection= d3.geoMercator()
                    .scale(130)
                    .center([75, 0])
                    .translate([width1 / 2, height1 /2]);

  // add the data to the map and add a color gradient for the data
  let data1 = new Map()
  let colorScale = d3.scaleThreshold()
                     .domain([0, 1, 2, 3, 4, 5, 6])
                     .range(d3.schemeReds[7]);

  // Add the geojson data for coordinates of the map
  let coordinate = []
  coordinate.push(d3.json("geo-countries/data/countries.geojson"))
  coordinate.push(d3.csv("data/cleaned_nutrition_df.csv", function(d) { data1.set(d.country_code, +d.cost_nutrition); }))

  dataPlotting = Promise.all(coordinate).then(function(geodata) {
  let topography = geodata[0]

  // Create tooltip for the map visualization
  let tooltip1 = d3.select("#vis-map")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip1")
      .style("background-color", "papayawhip")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("margin-right", "732px")



   // Add hover feature that shows data when hovering over countru
  let mouseOver = function(d, event) {
      d3.selectAll(".country_name")
          .transition()
          .duration(200)
      d3.select(this)
          .transition()
          .duration(200)
          .style("stroke", "black")
      tooltip1
          .style("opacity", 1)
          .style("visibility", "visible")
  }

  let mouseMove = function(d, event) {
      tooltip1
          .html("Country Name: " + event.properties.ADMIN + "<br>Diet Cost: " + event.cost_nutrition + " USD/day")
          .style("text-align", "center")
  }

  let mouseLeave = function(d) {
      d3.selectAll(".country_name")
          .transition()
          .duration(200)
      d3.select(this)
          .transition()
          .duration(200)
          .style("stroke", "transparent")
      tooltip1
          .transition()
          .duration(200)
          .style("opacity", 1)
  }


  // Add the map created to the svg
  svg.append("g")
      .selectAll("path")
      .data(topography.features)
      .enter()
      .append("path")
      .attr("d", d3.geoPath()
          .projection(projection)
      )

  // Adds color to the map based off nutrition data
  .attr("fill", function (d) {
      d.cost_nutrition = data1.get(d.properties.ISO_A3) || 0;
      return colorScale(d.cost_nutrition);
  })

  // Adds style for the mouse features of hovering
  .style("stroke", "transparent")
  .attr("class", function(d) { return d.properties.ADMIN } )
  .style("opacity", .8)
  .on("mouseover", mouseOver)
  .on("mouseleave", mouseLeave)
  .on("mousemove", mouseMove);

  

  })


});

// Function opens a new tab with different visualizations
function new_tab(event, name) {

    let i, tabviz, clicktab;

    // Hides all other elements
    tabviz = document.getElementsByClassName("tabviz");
    for (i = 0; i < tabviz.length; i++) {
        tabviz[i].style.display = "none";
    }
    // Makes elements with class="clicktab" inactive
    clicktab = document.getElementsByClassName("clicktab");
    for (i = 0; i < clicktab.length; i++) {
        clicktab[i].className = clicktab[i].className.replace(" active", "");
    }
    // Makes current tab active
    document.getElementById(name).style.display = "block";
    event.currentTarget.className += " active";
}

// Sets the default tab to the map
document.getElementById("defaultOpen").click();
