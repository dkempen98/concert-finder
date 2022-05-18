
// ***************** Covid Tracker API *********************** 
let covidUrl = `https://data.cdc.gov/resource/9mfq-cb36.json`;

covidtestBtn = document.querySelector(".covidApi-test");

function getCovidApi() {
  fetch(covidUrl).then(function (response) {
    let json = response.json();
    return json;
  })
  .then(function (data) {
    console.log(data);
  })
};

covidtestBtn.addEventListener("click", getCovidApi);

/////////////////////////////////////////////////////////////////

// ***************** Ticket Master API *********************** 
var genreInputEl = document.querySelector("");
var cityInputEl = document.querySelector("");

var apiKey = E1gg09qaCvdAbByNv5x40wHdUzV09DOu;

var venue;
var url;
var date;
var time;
var artistImg;
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
        getEvents(genre, city);
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
            var city = data._embedded.venues.city.name;
            var state = data._embedded.venues.state.name;
            var stateCode = data._embedded.venues.state.stateCode;
            var address = data._embedded.venues.address.line1;
            var longitude = data._embedded.venues.location.longitude;
            var latitude = data._embedded.venues.location.latitude;
    });
};

//  ****************************** Weather API ******************************

var name;
var local_names;
var lat;
var lon;
var state;
var country;

var formSubmitHandler = function(weather) {
    weather.preventDefault();
    var name = nameInputEl.value.trim();
        if (name) {
            getWeather(weather)
            weatherInputEl.value = '';
    }
};

// OpenWeather Weather API
    // https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
        //&exclude is optional

 https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid=ed7ad3517cceea24f5ddf34da86b3e00

// OpenWeather Direct Geocoding API
    // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
        // &limit is optional
    
http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=ed7ad3517cceea24f5ddf34da86b3e00

var getWeather = function(weather) {
    var weatherApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + ed7ad3517cceea24f5ddf34da86b3e00
    fetch(weatherApi)
        .then(function (data) {
            console.log(data);
            var name = data.name;
            var local_names = data.local_names.en;
            var lat = data.lat;
            var lon = data.lon;
            var state = data.state;
            var country = data.country;
    });
}
var name;
var local_names;
var lat;
var lon;
var state;
var country;

var formSubmitHandler = function(weather) {
    weather.preventDefault();
    var name = nameInputEl.value.trim();
        if (name) {
         getWeather(weather)
            weatherInputEl.value = '';
    }
};

// OpenWeather Weather API
    // https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
        //&exclude is optional

        https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid=ed7ad3517cceea24f5ddf34da86b3e00

// OpenWeather Direct Geocoding API
    // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
        // &limit is optional
    
http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=ed7ad3517cceea24f5ddf34da86b3e00

var getWeather = function(weather) {
  var weatherApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + ed7ad3517cceea24f5ddf34da86b3e00
    fetch(weatherApi)
     .then(function(data) {
        console.log(data);
        var name = data.name;
        var local_names = data.local_names.en;
        var lat = data.lat;
        var lon = data.lon;
        var state = data.state;
        var country = data.country;
  });
};
// Structure For Search Engine Functions. 
const test1 = false
const test2 = true
function searchEnginePromise() {
    return new Promise((resolve, reject) => {
        if (test1) {
          reject({
          message: 'test one reject'
           })
        }else if (test2) {
          reject({
          message: 'test two reject'   
            })
        }else {
            resolve('test success')
        }
})}
searchEnginePromise().then((message) => {
    console.log('Var should be -> ' +message)
}).catch((error) => {
    console.log(error.message + '')
})
// Structure for condensing all API's to an array.
const covidApi = new Promise((resolve, reject) => {
    resolve('Covid Api Success')})
const weatherApi = new Promise((resolve, reject) => {
    resolve('Weather Api Success')})
const ticketApi = new Promise((resolve, reject) => {
    resolve('Ticket Api Success')})
Promise.all([
    covidApi,
    weatherApi,
    ticketApi
]).then((message) => {
    console.log(message)
})