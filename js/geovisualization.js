(function() { 
  // Map
  const width_map = 2000;
  const height_map = 2000;

  // Set the initial svg
  const map_id = "#vis-map";
  let svg_map = d3.select(map_id)
    .append("svg")
    .attr("width", width_map)
    .attr("height", height_map);

  let g_map = svg_map.append("g");


  d3.json("geo-countries/data/countries.geojson").then(function(map_data) {
    d3.csv('data/cleaned_nutrition_df.csv').then(function(data) {
      // Map and projection
      var projection = d3.geoMollweide()
            .scale(width / 1.5 / Math.PI)
            // .rotate([0, 0])
            // .center([0, 0])
            // .translate([width / 2, height / 2]);
            .fitSize([800, 600], map_data); // Fit data to map size
      var geoPath = d3.geoPath().projection(projection);
      // var featureSize = d3.extent(countries.features,
      //                     function(d) {return map_data.area(d)})
      var countryColor = d3.scaleQuantize()
                          .domain([d3.min(data, function(data) {return data.cost_nutrition}), d3.max(data, function(data) {return data.cost_nutrition})])
                          .range(colorbrewer.Reds[7])

      d3.selectAll(".cost_nutrition");
      // d3.selectAll(".").on("change", filter_bars);
      // filter_bars()


      // Draw the map
      g_map.selectAll("path")
          .data(map_data.features)
          .enter()
          .append("path")
          // .attr("fill", "#b8b8b8")
          .attr("d", d3.geoPath()
              .projection(projection))
          // .style("stroke", "black")
          .style("fill", function(d) {
              return countryColor(geoPath.area(d))
          });
          // .style("opacity", .3)
    })
  })
})();

// var format = function(d) {
//     d = d * 1000
//     return '$' + d3.format(',.02f')(d/1000);
// }

// var map = d3.choropleth()
//     .geofile('lib/d3-geomap/topojson/world/countries.json')
//     .colors(d3.schemeYlGnBu[9])
//     .column('cost_nutrition')
//     .duration(500)
//     .format(format)
//     .legend(true)
//     .unitId('country_code');

// d3.csv('data/cleaned_nutrition_df.csv').then(data => {
//     var selection = d3.select('#map').datum(data);
//     map.draw(selection);
// });


// // The svg
// // var svg = d3.select("map"),
// //   widthgeo = 1200,
// //   heightgeo = 800;
// //
// // // Map and projection
// // var path = d3.geoPath();
// // var projection = d3.geoMercator()
// //   .scale(70)
// //   .center([0,20])
// //   .translate([widthgeo / 2, heightgeo / 2]);
// //
// // // Data and color scale
// // var data = d3.map();
// // var colorScale = d3.scaleThreshold()
// //   .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
// //   .range(d3.schemeBlues[7]);
// //
// // // Load external data and boot
// // d3.queue()
// //   .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
// //   .defer(d3.csv, "/data/clean_nutrition_df.csv", function(d) { data.set(d.country_code, d.cost_nutrition); })
// //   .await(ready);
// //
// // function ready(error, topo) {
// //
// //   // Draw the map
// //   svg.append("g")
// //     .selectAll("path")
// //     .data(topo.features)
// //     .enter()
// //     .append("path")
// //       // draw each country
// //       .attr("d", d3.geoPath()
// //         .projection(projection)
// //       )
// //       // set the color of each country
// //       .attr("fill", function (d) {
// //         d.total = data.get(d.cost_nutrition) || 0;
// //         return colorScale(d.total);
// //       });
// //     }
