const button = document.querySelector("#button-addon2");
var unit = "";
var temp = 0;
button.addEventListener("click", () => {
    const loc = document.querySelector("input").value;
    document.querySelector(".main").innerHTML = `<div class="p-2 bd-highlight"><b class="display-4" style="color:mediumblue;font-family: 'Merienda One', cursive;">Loading...</b></div>`
    document.querySelector(".image").innerHTML = ``
    document.querySelector(".image").style.animation = "none";
    document.querySelector(".main").style.animation = "none"
    fetch("http://localhost:3000/getclimate?address=" + loc).then((response) => {
        response.json().then((data) => {

            if (data.err) {
                document.querySelector(".main").style.animation = "co1 5s 1";
                document.querySelector(".main").innerHTML = `<div class="p-2 bd-highlight"><b class="display-4" style="color:mediumblue;font-family: 'Merienda One', cursive;">${data.err}</b>`;
                document.querySelector(".image").innerHTML = ``;
            }
            else {
                temp = data.temperature;
                document.querySelector(".main").style.animation = "co1 5s 1";
                document.querySelector(".main").innerHTML = ``
                document.querySelector(".main").innerHTML = `<div class="p-2 bd-highlight"><b class="display-4" style="color:mediumblue;font-family: 'Merienda One', cursive;">Climate:${data.desc}</b></div>
                <div class="p-2 bd-highlight"><b class="display-4" id="temp" style="color:mediumblue;font-family: 'Merienda One', cursive;">Temperature:${data.temperature}°C</b></div>
                <div class="p-2 bd-highlight"><b class="display-4" style="color:mediumblue;font-family: 'Merienda One', cursive;">Precipetation:${data.prec}% chances of rain</b></div>
                <div class="p-2 bd-highlight"><b class="display-4" style="color:mediumblue;font-family: 'Merienda One', cursive;">${data.loc}</b></div>
                <div class="p-2 bd-highlight"><b class="display-4" style="color:mediumblue;font-family: 'Merienda One', cursive;">Convert the temperature in</b></div>
                <div class="p-2 bd-highlight"><b class="display-4"><button type="button" class="btn btn-outline-warning px-5">°C</button>
                <button type="button" class="btn btn-outline-warning px-5">°F</button>
                <button type="button" class="btn btn-outline-warning px-5">K</button></b></div>`
                document.querySelector(".image").style.animation = "co2 5s 1";
                document.querySelector(".image").innerHTML = `<img src="types/${data.desc}.jpg" style="width:20rem;height:20rem;">`;
                
                unit = "C";
            }

        })
    })
})

document.querySelector(".main").addEventListener("click", (e) => {
    if (e.target.textContent == "°F") {

        if (unit == "C") {
            temp = ((9 / 5) * temp) + 32;
            document.querySelector("#temp").textContent = "Temperature:" + Math.round(temp) + "°F";
            unit = "F";
        }
        else if (unit == "K") {
            temp = ((temp - 273.15) * (9 / 5)) + 32;
            document.querySelector("#temp").textContent = "Temperature:" + Math.round(temp) + "°F";
            unit = "F";
        }

    }
    else if (e.target.textContent == "°C") {
        if (unit == "K") {
            temp = temp - 273.15;
            document.querySelector("#temp").textContent = "Temperature:" + Math.round(temp) + "°C";
            unit = "C";
        }
        else if (unit == "F") {
            temp = (temp - 32) * (5 / 9);
            document.querySelector("#temp").textContent = "Temperature:" + Math.round(temp) + "°C";
            unit = "C";
        }
    }


    else if (e.target.textContent == "K") {
        if (unit == "C") {
            temp = temp + 273;
            document.querySelector("#temp").textContent = "Temperature:" + Math.round(temp) + "K";
            unit = "K";
        }
        else if (unit == "F") {
            temp = ((temp - 32) * (5 / 9)) + 273.15;
            document.querySelector("#temp").textContent = "Temperature:" + Math.round(temp) + "K";
            unit = "K";
        }
    }
})

