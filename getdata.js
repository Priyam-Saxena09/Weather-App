const request = require("request");
const latlon = (address,call) => {
    const url1 = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoicHJpeWFtc2F4ZW5hIiwiYSI6ImNrYzM1dTJ6OTIzaHIyem5hOXBycmw1angifQ.81pXCVrCkUTX343SAbv2BQ";
request({url:url1},(error,response) => {
    const data = JSON.parse(response.body);
    if(error)
    {
         call("Server is unable to connect geoservice",data);
    }
    else if(JSON.stringify(data.features) == "[]")
    {
        const data = JSON.parse(response.body);
        call("Not Found.Please search another location",data);
    }
    else
    {    
        const data = JSON.parse(response.body);
         call(undefined,data);
    }
})
}

const fore = (lat,lon,call) => {
const url = "http://api.weatherstack.com/current?access_key=6e76cf088f5cd94e26ce4547f7e57dff&query=" + lat + "," + lon;
request({url:url},(error,response) => {
    if(error)
    {
         call(error,data);
    }
    else if(response.body.error)
    {
        const data = JSON.parse(response.body);
         call(data.error.info,data);
    }
    else
    {
        const data = JSON.parse(response.body);
         call(undefined,data);
    }
})
}

module.exports = {
    latlon:latlon,
    fore:fore
}
