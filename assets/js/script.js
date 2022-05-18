var concertDate;
var weatherDate;

function getWeatherDate() {
  weatherDate = Math.floor(new Date(concertDate).getTime() / 1000);
}


