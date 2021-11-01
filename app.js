const axios = require("axios");

const apiEndPoint = {
  weather: "http://api.weatherstack.com/current",
  location: "https://api.mapbox.com/geocoding/v5/mapbox.places",
};

const accessKey = {
  weather: "a682a6e849b7f5f45a0ba8865da2abe4",
  location:
    "pk.eyJ1IjoibWFpdGhyaTEyMyIsImEiOiJja2EweTFhdmkwNmM0M2tuMmJ0d2t2ZnE4In0.G4QKHF97vxf-10q84VbAPA",
};

const printWeatherForecast = ({
  temperature,
  precip,
  weather_descriptions: description,
}) =>
  `${description}. It is currently ${temperature}°C out. There is a ${precip}% chance of rain.`;

const weatherAPI = async ([long, lat]) =>
  axios.get(apiEndPoint.weather, {
    params: {
      access_key: accessKey.weather,
      query: `${lat},${long}`,
    },
  });

const locationAPI = async (place) =>
  axios.get(`${apiEndPoint.location}/${place}.json`, {
    params: {
      access_token: accessKey.location,
      limit: 1,
    },
  });

const weatherApp = (place) =>
  locationAPI(place)
    .then((response) => weatherAPI(response.data.features[0].center))
    .then((response) => printWeatherForecast(response.data.current))
    .catch((error) => console.log(error));

module.exports = weatherApp;
