//test for geolocation
/*
if ("geolocation" in navigator)  {
  console.log("yes");
} else {
  console.log("no");
};
*/

//https://openweathermap.org/api
//new API key
//6b548bc27eb953d1c156738e470bcb8b
//http://api.openweathermap.org/data/2.5/weather?late=&lon=&APPID=6b548bc27eb953d1c156738e470bcb8b
//http://api.openweathermap.org/data/2.5/weather?q=London&APPID=6b548bc27eb953d1c156738e470bcb8b

window.onload = runThis;

function runThis() {

  //latitude,longitude, fahrenheit, celsius, weather data JSON, weather icon
  let lat, lon, f, c, weatherData, icon;

  //function to get latitude and longitude for use with ajax
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        getData(); //use lat,lon to make API call if geolocation is supported
      });
    } else {
      let y = document.getElementsByClassName("city");
      y[0].innerHTML = "Geolocation is not supported";
      
    }
  }
  getLocation();
  
  //ajax/API call
  function getData() {
    let xhttp = new XMLHttpRequest();
    let endpoint = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=57c7e2a35b6157e4df790570f975a6f7&units=imperial`;
    xhttp.open("GET", endpoint, true);
    xhttp.onload = function() {
        weatherData = JSON.parse(xhttp.responseText);
        console.log(weatherData); //check what JSON looks like
        changeData(weatherData); //if success, run this function
    };
    xhttp.send();
  }

  //convert F to C
  function tempConvert(x) {
    return Math.round(((x - 32) * 5) / 9);
  }

  //change HTML content using JSON data
  function changeData(w) {
    //var strCity = w.name; //put "Country/City" string into variable
    $(".city").html(w.name); //extract city name from string
    f = w.main.temp;
    c = tempConvert(f); //convert fahrenheit to celsius
    icon = w.weather[0].description;
    console.log(f);
    $(".temp").html(c);
    $(".unit").text("C").css({
      "color": "blue"
    });
    //add icons
    /*var skycons = new Skycons({
      "color": "white"
    });
    skycons.add(document.getElementById("icon"), icon);
    skycons.play();*/
  }

  //click event to change C to F and temps or vice versa
  $(".unit").on("click", function() {
    $('.temp, .unit').fadeOut("fast")
    .delay(100)
    .queue(function(n) {
      if (this.textContent === "C") {
        $(this).html("F");
        $(".temp").html(Math.round(f));
      } else {
        $(this).html("C");
        $(".temp").html(c);
      }
    n();
  });
    $('.temp, .unit').fadeIn("fast");
  });

}
