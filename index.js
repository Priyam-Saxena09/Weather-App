const request = require("request");
const { latlon,fore } = require("./getdata.js")
const path = require("path");
const express = require("express");
const app = express();
const mainpath = path.join(__dirname,"climate");
app.use(express.static(mainpath));
const port = process.env.PORT || 3000;
const desc = "";
const temperature = "";
const prec = "";
const loc = "";
app.get("/getclimate",(req,res) => {
    if(!req.query.address)
    {
        return;
    }
    const add = req.query.address;
    latlon(add,(err,dat) =>{
         if(err)
         {
          return res.send({err});
         }
    
    fore(dat.features[0].center[1],dat.features[0].center[0],(err,dat1) => {
             if(err)
             {
                return res.send({err});
             }
            
                 res.send({
                     desc:dat1.current.weather_descriptions,
                     temperature:dat1.current.temperature,
                     prec:dat1.current.precip,
                     loc:dat.features[0].place_name

                 })
             
         })
    })
})

app.listen(port,() => {
    console.log("Server is on port " + port);
})