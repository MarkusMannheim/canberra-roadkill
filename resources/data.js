const d3 = require("d3"),
      fs = require("fs");

fs.readFile("stats.csv", "utf8", function(error, data) {
  data = d3.csvParse(data)
    .map(function(d) {
      return {
        road: d.road,
        lng: +d.lng,
        lat: +d.lat,
        species: d.species.toLowerCase()
      };
    });


  i = 0;
  while (i < data.length) {
    point = [data[i].lng, data[i].lat];
    console.log("Assessing " + (i + 1) + " of " + data.length);
    distances = [];
    data.forEach(function(d) {
      distances.push(d3.geoDistance(point, [d.lng, d.lat]));
    });
    distances.sort();
    for (j = 0; j < distances.length; j++) {
      if (distances[j] > 0.000015678896) {
        data[i].count = j;
        // console.log(j);
        break;
      }
    }
    i++;
  }

  fs.writeFile("statsDistances.csv", d3.csvFormat(data), function(error) {
    console.log("statsDistances.csv written");
  });
});
