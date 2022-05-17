// var genreInputEl = document.querySelector("")
// var locationInputEl = document.querySelector("")

// var genreSearch = classifications.genre.name
// var venue = _embedded.venues.name
// var url = url
// var date = dates.start.localDate
// var time = dates.start.localTime
var apiKey = E1gg09qaCvdAbByNv5x40wHdUzV09DOu
// var artistImg = attractions.images[1].url

var genre;
var location;

var formSubmitHandler = function(event) {
    event.preventDefault();
    
    var genre = genreInputEl.value.trim();
    var location = locationInputEl.value.trim();

    if (genre, location) {
        getEvents(genre, location)
        genreInputEl.value = '';
        locationInputEl.value = '';
    }
};
var getEvents = function(genre, location) {
    var eventApi = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=" + genre + "&apikey=" + apiKey;
}