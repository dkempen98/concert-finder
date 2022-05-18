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
        };