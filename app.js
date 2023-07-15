const express=require("express");
const https = require("http");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req,res){
   res.sendFile(__dirname +"/index.html");
  });
  app.post("/" ,function(req,res){
const akey="ca99faab09fe407fe9ffcdfb3568c18b"
const city=req.body.cityName;
const unit="metric"
const url="http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+akey+"&units="+unit;
https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
        const weatherData=JSON.parse(data)
        const temp=weatherData.main.temp
        const weathweDescription=weatherData.weather[0].description
        const icon=weatherData.weather[0].icon
        const iurl="http://openweathermap.org/img/wn/"+icon+"@2x.png"
        console.log(weathweDescription);
        res.write("<h1>The temperature in "+city+" is "+temp+" degree celcius<h1>");
        res.write("<p>The weather is currently "+weathweDescription+"</p>");
        res.write("<img src="+iurl+">");
        res.send();
    })
})
  })
app.listen(3000,function(){
console.log("Server is up and running.");
})