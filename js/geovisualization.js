var format = function(d) {
    d = d * 1000
    return '$' + d3.format(',.02f')(d/1000);
}

var map = d3.choropleth()
    .geofile('/lib/d3-geomap/topojson/world/countries.json')
    .colors(d3.schemeYlGnBu[9])
    .column('cost_nutrition')
    .duration(500)
    .format(format)
    .legend(true)
    .unitId('country_code');

d3.csv('/data/cleaned_nutrition_df.csv').then(data => {
    var selection = d3.select('#map').datum(data);
    map.draw(selection);
});
