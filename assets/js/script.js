var concertDate = "5/17/2022";
var weatherDate;

function getWeatherDate() {
  weatherDate = Math.floor(new Date(concertDate).getTime() / 1000);
  console.log(weatherDate);
}

getWeatherDate();
