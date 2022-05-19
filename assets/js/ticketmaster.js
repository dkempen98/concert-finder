// var genreInputEl = document.querySelector("")
// var cityInputEl = document.querySelector("")

var apiKey = "E1gg09qaCvdAbByNv5x40wHdUzV09DOu";

var bandName = [];
var venue = [];
var url = [];
var date = [];
var time = [];
var artistImg = [];
var cityName = [];
var state = [];
var stateCode = [];
var address = [];
var longitude = [];
var latitude = [];

var genre;

var formSubmitHandler = function (event) {
  event.preventDefault();

  genre = genreInputEl.value.trim();
  cityName = locationInputEl.value.trim();

  if ((genre, cityName)) {
    getEvents(genre, cityName);
    genreInputEl.value = "";
    cityInputEl.value = "";
  }
};
var getEvents = function (genre, city) {
  var eventApi =
    "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=" +
    "rock" +
    "&city=" +
    "columbus" +
    "&apikey=" +
    apiKey;
  fetch(eventApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        console.log(data);
      for (var i = 0; i < 12; i++) {
        bandName.push(data._embedded.events[i].name);
        url.push(data._embedded.events[i].url);
        date.push(data._embedded.events[i].dates.start.localDate);
        time.push(data._embedded.events[i].dates.start.localTime);
        artistImg.push(data._embedded.events[i].images[0].url);
        venue.push(data._embedded.events[i]._embedded.venues[0].name);
        cityName.push(data._embedded.events[i]._embedded.venues[0].city.name);
        state.push(data._embedded.events[i]._embedded.venues[0].state.name);
        stateCode.push(
          data._embedded.events[i]._embedded.venues[0].state.stateCode
        );
        address.push(
          data._embedded.events[i]._embedded.venues[0].address.line1
        );
        longitude.push(
          data._embedded.events[i]._embedded.venues[0].location.longitude
        );
        latitude.push(
          data._embedded.events[i]._embedded.venues[0].location.latitude
        );
      }
      displayEvents();
    });
};

var displayEvents = function () {
  for (var i = 0; i < 12; i++) {
    var eventEl = document.getElementById("cont-" + (i + 1));
    eventEl.appendChild();
    console.log(bandName + url + date + time + artistImg + venue);
    console.log(url)
  }
};

getEvents();
