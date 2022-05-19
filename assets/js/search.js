// ***************** Functions for Crossing Between API's ***********************
var weatherDate;

var state;
var totalStateCases;
var recentStateCases;
var averageWeeklyCases;
var covidRiskScore;

function getWeatherDate(concertDate) {
  weatherDate = Math.floor(new Date(concertDate).getTime() / 1000);
}

function weatherAvailable(concertDate) {
  // 86400000 is equivelant to one day based on the way js calculates numbers
  //   concertDate = new Date(2022, 4, 19);
  var dateOfEvent = new Date(concertDate);
  var daysUntilConcert;
  var today = new Date();
  daysUntilConcert = (dateOfEvent.getTime() - today.getTime()) / 86400000;
  daysUntilConcert = Math.ceil(daysUntilConcert);
  return daysUntilConcert;
}

function calculateCovidScore() {
  // The formula is avgWeeklyCases/5 = x => currentWeekTotal / x => score

  var weekCount = weeksSincePandemicStart();
  averageWeeklyCases = totalStateCases / weekCount;
  // 5 is the baseline so I assume average weekly cases would be a score of 5.
  // Knowing this, I will divide the average weekly cases by 5 to get a score
  // of 1 then adjust that based on the recent case counts.
  var scoreOfOne = averageWeeklyCases / 5;
  covidRiskScore = recentStateCases / scoreOfOne;

  if (covidRiskScore > 10) {
    covidRiskScore = 10;
  }

  return covidRiskScore;
}

function weeksSincePandemicStart() {
  // Start of pandemic, gave some leeway to avoid using the few weeks of very
  // low weekly numbers from the first couple weeks
  var startDate = new Date(2020, 03, 01);
  var curDate = new Date();
  var timeBetween = (curDate.getTime() - startDate.getTime()) / 1000;
  timeBetween = timeBetween / (60 * 60 * 24 * 7);
  console.log(timeBetween);
  return timeBetween;
}

// ***************** Covid Tracker API ***********************
let stateIn = "";
let covidUrl;
let covidData, subDate, year, month, day;
let prevYear = 0;
let prevMonth = 0;
let prevDay = 0;
let mostUpadatedData;
covidtestBtn = document.querySelector(".covidApi-test");
covidtestIn = document.querySelector("#test-input-covid");
let mostRecentDate = [];

function getStateIn() {
  stateIn = `${covidtestIn.value}`;
  covidUrl = `https://data.cdc.gov/resource/9mfq-cb36.json?state=${stateIn}`;
  console.log(stateIn);
  getCovidApi();
}

async function getCovidApi() {
  await fetch(covidUrl)
    .then(function (response) {
      let json = response.json();
      return json;
    })
    .then(function (data) {
      covidData = data;
    });
  splitDate();
}

function splitDate() {
  for (let i = 0; i < covidData.length; i++) {
    subDate = covidData[i].submission_date;
    let dateArray = subDate.split("-");
    let dayArray = dateArray[2].split("T");
    year = dateArray[0];
    month = dateArray[1];
    day = dayArray[0];

    findMostRecentDate();
  }
  console.log(mostRecentDate);
  mostUpadatedData = `${mostRecentDate[0].year}-${mostRecentDate[0].month}-${mostRecentDate[0].day}T00:00:00.000`;
  console.log(mostUpadatedData);
}

function findMostRecentDate() {
  if (year > prevYear) {
    prevYear = year;
    if (month > prevMonth) {
      prevMonth = month;
      if (day > prevDay) {
        prevDay = day;
      }
    }
    let mostRecent = {
      year: prevYear,
      month: prevMonth,
      day: prevDay,
    };

    let obj = {};
    obj["year"] = mostRecent.year;
    obj["month"] = mostRecent.month;
    obj["day"] = mostRecent.day;

    mostRecentDate[0] = obj;
  }
}

covidtestBtn.addEventListener("click", getStateIn);

/////////////////////////////////////////////////////////////////

// ***************** Ticket Master API ***********************

// var genreInputEl = document.querySelector("")
// var cityInputEl = document.querySelector("")
// above items are for applying inputs from search

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

// concertNum is used to determine which lon and lat to use in the weather
// api call
var concertNum;
var daysFromConcert;

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
    "rock" + // make me a variable Kyle
    "&city=" +
    "columbus" + // make me a variable Kyle
    "&apikey=" +
    apiKey;
  fetch(eventApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (var i = 0; i < 3; i++) {
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

function displayEvents() {
  concertNum = 0;
  getCity();
  for (var i = 0; i < 3; i++) {
    var artistEl = document.getElementById("artist-" + (i + 1));
    var dateEl = document.getElementById("date-" + (i + 1));
    var timeEl = document.getElementById("time-" + (i + 1));
    var stadiumEl = document.getElementById("stadium-" + (i + 1));
    var linkEl = document.getElementById("link-" + (i + 1));
    var weatherEl = document.getElementById("weather-" + (i + 1));

    artistEl.textContent = bandName[i];
    dateEl.textContent = date[i];
    timeEl.textContent = time[i];
    stadiumEl.textContent = venue[i];
    linkEl.setAttribute("href", url[i]);

    // Get weather info if within 8 days and assign it to the HTML
    daysFromConcert = weatherAvailable(date[i]);
    if (daysFromConcert < 8) {
      console.log(daysFromConcert);
      console.log(weatherDesc);
      console.log(temp);
      console.log(temp[7]);
      weatherEl.textContent =
        "Dress for " +
        temp[daysFromConcert] +
        " and " +
        weatherDesc[daysFromConcert];
      console.log(weatherEl);
    }

    concertNum += 1;
  }
}
//   concertNum = 0;

//   var artistEl = document.getElementById("artist-1");
//   var dateEl = document.getElementById("date-1");
//   var timeEl = document.getElementById("time-1");
//   var stadiumEl = document.getElementById("stadium-1");
//   var linkEl = document.getElementById("link-1");

//   artistEl.textContent = bandName[0];
//   dateEl.textContent = date[0];
//   timeEl.textContent = time[0];
//   stadiumEl.textContent = venue[0];
//   linkEl.setAttribute("href", url[0]);

//   // Get weather info if within 8 days and assign it to the HTML

//   weatherAvailable(date[0]);
//   console.log(typeof daysFromConcert);
//   if (daysFromConcert < 8) {
//     getWeather();
//   }
//   concertNum = 1;

//   var artistEl = document.getElementById("artist-2");
//   var dateEl = document.getElementById("date-2");
//   var timeEl = document.getElementById("time-2");
//   var stadiumEl = document.getElementById("stadium-2");
//   var linkEl = document.getElementById("link-2");

//   artistEl.textContent = bandName[1];
//   dateEl.textContent = date[1];
//   timeEl.textContent = time[1];
//   stadiumEl.textContent = venue[1];
//   linkEl.setAttribute("href", url[1]);

//   // Get weather info if within 8 days and assign it to the HTML

//   weatherAvailable(date[1]);
//   console.log(daysFromConcert);
//   if (daysFromConcert < 8) {
//     getWeather();
//   }
// };

//  ****************************** Weather API ******************************

var name;
var local_names;
var lat;
var lon;
var state;
var country;
var weatherDesc = [];
var temp = [];

var geoData;
var cityComp;

// don't think this event handler is necessary

// var formSubmitHandler = function (weather) {
//   weather.preventDefault();

//   var name = nameInputEl.value.trim();

//   if (name) {
//     getWeather(weather);
//     weatherInputEl.value = "";
//   }
// };

function getWeather(cityData) {
  console.log("getWeather running");
  console.log(cityData);
  var lat = cityData[0].lat;
  var lon = cityData[0].lon;

  var weatherApi =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    // "39.9812" +
    "&lon=" +
    lon +
    // "82.9988" +
    "&units=imperial&appid=ed7ad3517cceea24f5ddf34da86b3e00";

  fetch(weatherApi)
    .then(function (response) {
      if (!response.ok) {
        throw alert("Error retrieving data, please try again");
      }

      return response.json();
    })
    .then(function (data) {
      console.log(data);
      getWeatherReport(data);
      return;
    });
}

function getWeatherReport(weatherData) {
  console.log("getWeatherReport running");
  console.log(daysFromConcert);
  console.log(weatherData);
  var availableForecast = weatherData.daily;
  for (var i = 0; availableForecast.length > i; i++) {
    console.log(availableForecast[0].temp.eve);
    temp.push(availableForecast[i].temp.eve);
    weatherDesc.push(availableForecast[i].weather[0].description);
  }
  console.log(temp);
  console.log(weatherDesc);
  //   weatherDesc = weatherData.daily[daysFromConcert].weather[0].description;
  //   weatherDesc = weatherDesc.toLowerCase();
  //   temp = weatherData.daily[daysFromConcert].temp.eve;
  //   console.log(concertNum);
  //   var weatherEl = document.getElementById("weather-" + (concertNum + 1));
  //   weatherEl.textContent =
  //     "Dress for " + temp + "and " + weatherDesc.toLowerCase();
}
// Geocoding API call if needed

var getCity = function () {
  var geoApi =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    // cityComp +
    "New York" +
    "&appid=ed7ad3517cceea24f5ddf34da86b3e00";

  fetch(geoApi)
    .then(function (response) {
      if (!response.ok) {
        throw alert("Error retrieving data, please try again");
      }
      return response.json();
    })
    .then(function (data) {
      getWeather(data);
    });
};

// Structure For Search Engine Functions.
let test1 = false;
let test2 = false;
function searchEnginePromise() {
  return new Promise((resolve, reject) => {
    if (test1) {
      reject({
        message: "test one reject",
      });
    } else if (test2) {
      reject({
        message: "test two reject",
      });
    } else {
      resolve("test success");
    }
  });
}
searchEnginePromise()
  .then((message) => {
    console.log("Var should be -> " + message);
  })
  .catch((error) => {
    console.log(error.message + "");
  });
// Structure for condensing all API's to an array.
let covidApi = new Promise((resolve, reject) => {
  resolve("Covid Api Success");
});
let weatherApi = new Promise((resolve, reject) => {
  resolve("Weather Api Success");
});
let ticketApi = new Promise((resolve, reject) => {
  resolve("Ticket Api Success");
});
Promise.all([covidApi, weatherApi, ticketApi]).then((message) => {
  console.log(message);
});

// var = cityComp
// var = weatherComp
// var = ticketComp

getEvents();
