// var genreInputEl = document.querySelector("")
// var cityInputEl = document.querySelector("")

var apiKey = E1gg09qaCvdAbByNv5x40wHdUzV09DOu;

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
        .then(function (data) {
            console.log(data);
            var venue = data._embedded.venues.name;
            var url = data.url;
            var date = data.dates.start.localDate;
            var time = data.dates.start.localTime;
            var artistImg = data.attractions.images[0].url;
            var cityName = data._embedded.venues.city.name;
            var state = data._embedded.venues.state.name;
            var stateCode = data._embedded.venues.state.stateCode;
            var address = data._embedded.venues.address.line1;
            var longitude = data._embedded.venues.location.longitude;
            var latitude = data._embedded.venues.location.latitude;
        });
};
