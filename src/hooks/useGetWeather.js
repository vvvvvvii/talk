import { useEffect, useState } from "react";
import axios from "axios";
let targetURL =
  "https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-C0032-001?Authorization=CWB-00139A44-161C-4C36-8071-0C0D26A80D86&format=JSON";

export const useGetWeather = (cityName) => {
  const [weather, setWeather] = useState({
    wx: "",
    tempature: [],
    ci: "",
    pop: "",
  });
  useEffect(() => {
    axios
      .get(targetURL)
      .then((res) => {
        const citiesData = res.data.cwbopendata.dataset.location;
        const cityData = citiesData.filter(
          (city) => city.locationName === cityName
        )[0].weatherElement;
        setWeather({
          wx: cityData[0].time[0].parameter.parameterName,
          temperature: [
            cityData[2].time[0].parameter.parameterName,
            cityData[1].time[0].parameter.parameterName,
          ],
          ci: cityData[3].time[0].parameter.parameterName,
          pop: cityData[4].time[0].parameter.parameterName,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cityName]);
  return weather;
};
