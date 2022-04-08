//Bar Chart
const widthbar = 1200;
const heightbar = 2500;
const marginbar = {left:150, right:50, bottom:50, top:50};

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



const mouseover1 = function(event, d) {
    tooltip1.html(d.country_name + "<br>" + function(d) {return (d[selectedVar]); } + "<br>")
            .style("opacity", 1);
}



const mousemove1 = function(event, d) {
    tooltip1.style("left", (event.x) + "px")
    .style("top", (event.y + yTooltipOffset) + "px");
}



const mouseleave1 = function(event, d) {
    tooltip1.style("opacity", 0);
}
            let u = svg1.selectAll("rect")
                        .data(data)


            u.enter()
             .append("rect")
             .merge(u)
             .transition()
             .duration(1000)
             .attr("y", function(d) {return y(d.country_name); })
             .attr("x", 0)
             .attr("width", function(d) {return x(d[selectedVar]); })
             .attr("height", y.bandwidth())
             .attr("fill", "#69b3a2")


            svg1.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y));


    

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

    

