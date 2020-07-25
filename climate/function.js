const button = document.querySelector("#search");
var unit = "";
var temp = 0;
button.addEventListener("click",() => {
    const loc = document.querySelector("input").value;
    document.querySelector(".contimage").style.animation = "none";
    document.querySelector(".cont1").style.animation = "none"
    fetch("http://localhost:3000/getclimate?address=" + loc).then((response) => {
        response.json().then((data) => {
            
            if(data.err)
            {
                document.querySelector(".cont1").style.animation = "co1 5s 1";
                document.querySelector(".cont1").innerHTML = `<p>${data.err}</p>`;
                document.querySelector(".contimage").innerHTML = ``;
            }
            else
            {
                temp = data.temperature;
                document.querySelector(".cont1").style.animation = "co1 5s 1";
                document.querySelector(".cont1").innerHTML = `<p>${data.desc}</p>
                <b>${data.temperature}°C</b>
                <p>${data.prec}% chances of rain</p>
                <p>${data.loc}</p>
                <p>Convert the temperature in</p>
                <button id="C" class="show">In °C</button>
                <button id="F" class="show">In °F</button>
                <button id="K" class="show">In K</button>`;
                document.querySelector(".contimage").style.animation = "co2 5s 1";
                document.querySelector(".contimage").innerHTML = `<img src = "types/${data.desc}.jpg">`;
                
                unit = "C";
            }
            
        })
    })
})

document.querySelector(".cont1").addEventListener("click",(e) => {
 if(e.target.textContent == "In °F")
 {
   
    if(unit == "C")
    {
    temp = ((9/5)*temp)+32;
    document.querySelector(".cont1 b").textContent = Math.round(temp) + "°F"; 
    unit = "F";
    }
    else if(unit == "K")
    {
       temp = ((temp-273.15)*(9/5))+32;
       document.querySelector(".cont1 b").textContent = Math.round(temp) + "°F"; 
       unit = "F";
    }

}
else if(e.target.textContent == "In °C")
{
    if(unit == "K")
    {
    temp = temp - 273.15;
    document.querySelector(".cont1 b").textContent = Math.round(temp) + "°C";
    unit = "C";
    }
    else if(unit == "F")
    {
        temp = (temp - 32)*(5/9);
        document.querySelector(".cont1 b").textContent = Math.round(temp) + "°C";
        unit = "C";
    }
}


else if(e.target.textContent == "In K")
{
 if(unit == "C")
 {
temp = temp + 273;
document.querySelector(".cont1 b").textContent = Math.round(temp) + "K";
unit = "K";
 }
 else if(unit == "F")
 {
    temp = ((temp - 32)*(5/9)) + 273.15;
    document.querySelector(".cont1 b").textContent = Math.round(temp) + "K";
    unit = "K";
 }
}
})

