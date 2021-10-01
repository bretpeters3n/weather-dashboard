// PSUEDO CODING -start //

// .Make form that triggers function based on input
// .Run search for 'minneapolis' first that for 'input' after
// .Run search for this city on press
// Save search term after you make them
// Pull api twice to get the needed info.

// PSUEDO CODING - end //

// selectors
var displayCity = $("#city");
var displayTemp = $(".temp");
var displayWind = $(".wind");
var displayHum = $(".humidity");
var displayUVI = $(".uvi");

var displayDay1Temp = $(".day1").find(".temp");
var displayDay1Wind = $(".day1").find(".wind");
var displayDay1Hum = $(".day1").find(".humidity");

var displayDay2Temp = $(".day2").find(".temp");
var displayDay2Wind = $(".day2").find(".wind");
var displayDay2Hum = $(".day2").find(".humidity");

var fiveDayForecast = $("#fiveDayForecast");
console.log(fiveDayForecast);

var transferDate;
var transferIcon;
var transferTemp;
var transferWind;
var transferHumidity;

var transferDailyData;

// var day1 = $(".day1");

// var city = "Minneapolis";

// global variables
var lat = 44.9;
var lon = -93.2;
var excludedParts = "";
var apiKey = "9f11506654cc7375129f7213e0f21116";
// var cityName = "Minneapolis";

// var requestUrl =
//   "https://api.openweathermap.org/data/2.5/onecall?lat=" +
//   lat +
//   "&lon=" +
//   lon +
//   "&exclude=" +
//   excludedParts +
//   "&appid=" +
//   apiKey;

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// var requestUrl =
//   "https://api.openweathermap.org/data/2.5/onecall?lat=" +
//   lat +
//   "&lon=" +
//   lon +
//   "&exclude=" +
//   excludedParts +
//   "&appid=" +
//   apiKey;
function searchCity(city) {
  console.log("you are searching for " + city);

  var requestUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey;

  // functions
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // create variables for info I need to display on page. City, temp, wind, humidity, uvi
      var timezone = data.name;
      var temp = data.main.temp;
      var wind = data.wind.speed;
      var humidity = data.main.humidity;

      var lat = data.coord.lat;
      var lon = data.coord.lon;
      // var uvi = data.current.uvi;
      // transfer these value to selector to display them on the page
      displayCity.text(timezone);
      displayTemp.text(temp);
      displayWind.text(wind);
      displayHum.text(humidity);
      //   displayUVI.text("cannot find in API!");

      console.log("timezone = " + timezone);
      console.log("temp = " + temp);
      console.log("wind = " + wind);
      console.log("humidity = " + humidity);
    })
    .catch(function (error) {
      alert("City not found. Try again.");
    });

  searchCity2(lat, lon, city);
}

function searchCity2(lat, lon, city) {
  console.log("you are searching for " + city);

  var part = "";
  var days = 5;

  var requestUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=" +
    part +
    "&cnt=" +
    days +
    "&appid=" +
    apiKey;

  // functions
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // create variables for info I need to display on page. City, temp, wind, humidity, uvi
      var uvi = data.current.uvi;
      // transfer these value to selector to display them on the page
      displayUVI.text(uvi);

      console.log("uvi = " + uvi);

      $(fiveDayForecast)
        .children("ul")
        .each(function (ul) {
          transferDate = " ";
          transferIcon = " ";
          transferTemp = data.daily[ul].temp.day;
          transferWind = data.daily[ul].wind_speed;
          transferHumidity = data.daily[ul].humidity;
          transferDailyData = [
            transferDate,
            transferIcon,
            transferTemp,
            transferWind,
            transferHumidity,
          ];
          //this is ul
          var that = this; //you'll often see code like this
          //   console.log(transferDailyData);
          $("li", this).each(function (li) {
            //this is li
            //that is parent ul
            $(this).text(transferDailyData[li]);
            console.log(li);
          });
        });

      //   for (var i = 0; i < 5; i++) {
      //     // var date;
      //     // var icon;
      //     var temp = data.daily[i].temp.day;
      //     var wind = data.daily[i].wind_speed;
      //     var humidity = data.daily[i].humidity;

      //     $(fiveDayForecast)
      //       .$("ul")
      //       .children("li")
      //       .each(function (i) {
      //         console.log(i);
      //       });
      //   }
    })
    .catch(function (error) {
      alert("City not found. Try again.");
    });
}

function init() {
  // default city
  var city = "Minneapolis";

  searchCity(city);

  $("#searchCity").click(function (e) {
    e.preventDefault();
    var city = $("#search").find('input[id="inputCity"]').val();
    console.log(city);
    searchCity(city);
  });
}

// Template END //

// - EXAMPLES - //

// Declaring a variable - this is an example
// var studentName;

// Uses assignment operator(=) to assign a value
// var studentName = "Abdul";

// To re-assign a variable, use only the variable's name
// studentName = "Tonya";

// To access a value stored in a variable, use the variable's name
// console.log(studentName);

//To combine the message with a variable value use the concatenation operator(+)
//Logs "My name is "
// console.log("My name is ");

// Logs "My name is Tonya"
// console.log("My name is " + studentName);

init();
