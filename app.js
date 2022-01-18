const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true }));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");


})

app.post("/", function(req,res){

  const query = req.body.cityName;
  const apiKey = "b1e3ce9715c51f59c57ed67a8ea607a9";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit ;


  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {

      const weatherData = JSON.parse(data);
      const weatherDescription = weatherData.weather[0].description;
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      console.log(temp);

      res.write("<h1>The temperature in " + query + " is " + temp + " degree celcius</h1>");
      res.write("<img src=" + iconURL + ">");
      res.write("<p>The sky is looking with " + weatherDescription + "</p>");
      res.send();
    })
  })
})



app.listen(3000, function() {
  console.log("working!");
});
