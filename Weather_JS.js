//test for geolocation
/*
if ("geolocation" in navigator)  {
  console.log("yes");
} else {
  console.log("no");
};
*/

$(document).ready(function() {

  //latitude,longitude, fahrenheit, celsius, weather data JSON, weather icon
  var lat, lon, f, c, weatherData, icon;

  //function to get latitude and longitude for use with ajax
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        getData(); //use lat,lon to make API call if geolocation is supported
      });
    } else {
      var y = document.getElementByClass("city");
      y.innerHTML = "Geolocation is not supported";
    }
  }

  getLocation();

  //ajax/API call
  function getData() {
    $.ajax({
      type: "GET",
      url: "https://crossorigin.me/https://api.darksky.net/forecast/ed9ad4aa458eb9fbf9a18beb3071a399/" + lat + "," + lon,
      success: function(a) {
        //pass JSON data as "a" onto variable
        weatherData = a;
        console.log(weatherData); //check what JSON looks like
        changeData(); //if success, run this function
      }
    });
  }

  //convert F to C
  function tempConvert(a) {
    return Math.round(((a - 32) * 5) / 9);
  }

  //change HTML content using JSON data
  function changeData() {
    var strCity = weatherData.timezone; //put "Country/City" string into variable
    $(".city").html(strCity.substring(strCity.search("/") + 1, strCity.length)); //extract city name from string
    f = weatherData.currently.temperature;
    c = tempConvert(f); //convert fahrenheit to celsius
    icon = weatherData.currently.icon;
    console.log(icon);
    $(".temp").html(c);
    $(".unit").text("C").css({
      "color": "blue"
    });
    //add icons
    var skycons = new Skycons({
      "color": "white"
    });
    skycons.add(document.getElementById("icon"), icon);
    skycons.play();
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
    };
  n();
});
    $('.temp, .unit').fadeIn("fast");
  });

});
