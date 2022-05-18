// var genreInputEl = document.querySelector("")
// var cityInputEl = document.querySelector("")

var apiKey = "E1gg09qaCvdAbByNv5x40wHdUzV09DOu";

var name;
var venue;
var url;
var date;
var time;
var artistImg;
var cityName;
var city;
var state;
var stateCode;
var address;
var longitude;
var latitude;

var genre;

var formSubmitHandler = function(event) {
    event.preventDefault();
    
    var genre = genreInputEl.value.trim();
    var city = locationInputEl.value.trim();

    if (genre, city) {
        getEvents(genre, city)
        genreInputEl.value = '';
        cityInputEl.value = '';
    }
};
var getEvents = function(genre, city) {
    var eventApi = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=" + genre + "&city=" + city + "&apikey=" + apiKey;
    fetch(eventApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (var i = 0; i < 12; i++) {
            console.log(data);
            var name = data._embedded.events[i].name;
            var url = data._embedded.events[i].url;
            var date = data._embedded.events[i].dates.start.localDate;
            var time = data._embedded.events[i].dates.start.localTime;
            var artistImg = data._embedded.events[i].images[0].url;
            var venue = data._embedded.events[i]._embedded.venues[0].name;
            var city = data._embedded.events[i]._embedded.venues[0].city.name;
            var state = data._embedded.events[i]._embedded.venues[0].state.name;
            var stateCode= data._embedded.events[i]._embedded.venues[0].state.stateCode;
            var address = data._embedded.events[i]._embedded.venues[0].address.line1;
            var longitude = data._embedded.events[i]._embedded.venues[0].location.longitude;
            var latitude = data._embedded.events[i]._embedded.venues[0].location.latitude;
            }});
};

var displayEvents = function () {
    for (var i = 0; i < 12; i++) {
    var eventEl = document.getElementById('cont-' + (i + 1));
    eventEl.appendChild()
    
    };
};