import * as d3 from "d3";

const WeatherMap = (props) => {
  const getTaiwanMap = async () => {
    let mercatorScale,
      width,
      height,
      w = window.screen.width;
    if (w > 992) {
      mercatorScale = 8000;
      width = 500;
      height = 550;
    } else if (w <= 992 && w > 768) {
      mercatorScale = 5200;
      width = 300;
      height = 350;
    } else if (w <= 768 && w > 375) {
      mercatorScale = 4000;
      width = 300;
      height = 300;
    } else {
      width = 150;
      height = 200;
      mercatorScale = 3000;
    }

    const path = await d3.geo.path().projection(
      d3.geo
        .mercator()
        .center([121, 24])
        .scale(mercatorScale)
        .translate([width / 2, height / 2.5])
    );

    let svg = await d3
      .selectAll(".svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`);

    const url = require("../taiwan.geojson");
    // let cityName = "";
    await d3.json(url, (error, geometry) => {
      if (error) throw error;

      svg
        .selectAll("path")
        .data(geometry.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr({
          id: (d) => "city" + d.properties.COUNTYCODE,
        })
        .on("mouseover", (d) => {
          props.hoverWeatherMap(
            d.properties.COUNTYNAME,
            d.properties.COUNTYENG
          );
        })
        .on("touchmove", (d) => {
          props.hoverWeatherMap(
            d.properties.COUNTYNAME,
            d.properties.COUNTYENG
          );
        })
        .on("click", (d) => {
          props.handleQuestion(d.properties.COUNTYNAME);
        });
    });
    return svg;
  };
  getTaiwanMap();
};
export default WeatherMap;
