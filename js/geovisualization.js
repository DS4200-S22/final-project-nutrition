d3.csv("data/cleaned_nutrition_df.csv").then((data) => {


  let svg = d3.select("#map-id"),
            width1 = +svg.attr("width"),
            height1 = +svg.attr("height"),
            margin1 = {top: 50, right: 100, bottom: 50, left: 50};

  // Map and projection
  let path = d3.geoPath();

  let projection= d3.geoMercator()
                    .scale(130)
                    .center([75, 0])
                    .translate([width1 / 2, height1 /2]);

  // Data and color scale
  let data1 = new Map()
  let colorScale = d3.scaleThreshold()
                     .domain([0, 1, 2, 3, 4, 5, 6])
                     .range(d3.schemeReds[7]);

  // const zoom = d3.zoom().scaleExtent([1, 8]).on("zoom", zoomed);
  //
  // svg.call(zoom);
  //
  // function zoomed(event) {
  // const {transform} = event;
  // svg.attr("transform", transform);
  // svg.attr("stroke-width", 1 / transform.k);}





  // Load external data
  let promises = []
  promises.push(d3.json("geo-countries/data/countries.geojson"))
  promises.push(d3.csv("data/cleaned_nutrition_df.csv", function(d) { data1.set(d.country_code, +d.cost_nutrition); }))

  myDataPromises = Promise.all(promises).then(function(mydata) {
  let topo = mydata[0]

  // tooltip
  let tooltip1 = d3.select("#vis-map")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip1")
      .style("background-color", "papayawhip")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("margin-right", "732px")


  // legend
  const legend_x = width1 - margin1.left - 250
  const legend_y = height1 - 400

  svg.append("g")
      .attr("class", "legendQuant")
      .attr("transform", "translate(" + legend_x + "," + legend_y+")")

  let legendLinear = d3.legendColor()
      .title("Cost of Diet (USD/day)")
      .shapeWidth(25)
      .orient('vertical')
      .scale(colorScale);

  svg.select(".legendQuant")
      .call(legendLinear)


  let mouseOver = function(d, event) {
      d3.selectAll(".country_name")
          .transition()
          .duration(200)
      d3.select(this)
          .transition()
          .duration(200)
          .style("stroke", "black")

      // tooltip
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
          // .style("opacity", .8)
      d3.select(this)
          .transition()
          .duration(200)
          .style("stroke", "transparent")

      // tooltip
      tooltip1
          .transition()
          .duration(200)
          .style("opacity", 1)
  }

  // Draw the map
  svg.append("g")
      .selectAll("path")
      .data(topo.features)
      .enter()
      .append("path")


      // draw each country
      .attr("d", d3.geoPath()
          .projection(projection)
      )

      // set the color of each country
      .attr("fill", function (d) {
          d.cost_nutrition = data1.get(d.properties.ISO_A3) || 0;
          return colorScale(d.cost_nutrition);
      })

      .style("stroke", "transparent")
      .attr("class", function(d) { return d.properties.ADMIN } )
      .style("opacity", .8)
      .on("mouseover", mouseOver)
      .on("mouseleave", mouseLeave)
      .on("mousemove", mouseMove)

  })
})
