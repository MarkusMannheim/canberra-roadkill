const d3 = require("d3"),
      fs = require("fs");

fs.readFile("wildlife.csv", "utf8", function(error, data) {
  data = d3.csvParse(data)
    .map(function(d) {
      return {
        lng: +d.lng,
        lat: +d.lat,
        date: d.date
      };
    });

  data = data
    .map(function(d) {
      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [d.lng, d.lat]
        },
        properties: {
          date: d.date
        }
      };
    });

  data = {
    type: "FeatureCollection",
    features: data
  };

  fs.writeFile("wildlife.geojson", JSON.stringify(data), function(error) {
    console.log("shape.geojson written");
  });
});
