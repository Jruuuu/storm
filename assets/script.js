$(document).ready(function () {

    //var with APIkey
    const apiKey = "b1776aa1272908b67d6c8efe7518db41";

    //history
     history = JSON.parse(localStorage.getItem("history")) || [];


    $("#search-button").on("click", function () {
        //get the user input
        const userInput = $("#userInput").val();
        //show curremt weather
        getCurrentWeather(userInput);
        //show 5 day forcast
        getForcast(userInput);
        //show UV index

        //render new button city
        renderNewBtn(userInput);

        //add to search history string setitem
    });

    const getCurrentWeather = (cityName) => {
        //create queryURL var
        const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
        
        
        //get the data
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (res) {
            //create var for lat and lon for ajax call
            const lat= (res.coord.lat);
            const lon= (res.coord.lon);
            console.log(lat)
            //get the data for UV value
            const uvURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;
             $.ajax({
                 url: uvURL,
                 method: "GET"
                 //create the markup
                }).then(function(uvRes){

                    const currentWeatherMarkUp = 
                    `
                    <div class="card">
                    <div class="card-body">
                    <h3 class="card-title-container">
                    <span class="card-text name">${res.name}</span>
                    <span class="card-text date">(${new Date().toLocaleDateString()})</span>
                    <span><img src="https://openweathermap.org/img/w/${res.weather[0].icon}.png"/></span>
                    </h3>
                    <p class="card-text temp">Temp: ${res.main.temp}F</p>
                    <p class="card-text wind">Wind Speed: ${res.wind.speed}MPH</p>
                    <p class="card-text humid">Humidity: ${res.main.humidity}%</p>
                    <p class="card-text uv">UV INDEX: ${uvRes.value}</p>
                    </div>
                    </div>
                    `;
                    //show the data
                    $(".todaysForecast").html(currentWeatherMarkUp);
                });
            });   
    };

    const getForcast = (cityName) => {
        //create queryURL var
        const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
        //get the data
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (res) {

            console.log(res);

            //intit the markup
            let forecastMarkUp = "";

            for (let i = 0; i < res.list.length; i++) {
                if (res.list[i].dt_txt.indexOf("15:00:00") > -1) {
                    forecastMarkUp += 
                    `
                        <div class="card  bg-primary float-left text-white mr-2 ml-2">
                            <div class="card-body">
                                <div class="date">(${new Date().toLocaleDateString()})</div>
                                <img src="https://openweathermap.org/img/w/${res.list[i].weather[0].icon}.png"/>
                                <p class="card-text temp">Temp: ${res.list[i].main.temp}F</p>
                                <p class="card-text wind">Wind Speed: ${res.list[i].wind.speed}MPH</p>
                                <p class="card-text humid">Humidity: ${res.list[i].main.humidity}%</p>
                            </div>
                        </div>
                    `;
                }
            } 
            //show the data
            $(".fourdayForecast").html(forecastMarkUp);
        });
    };

    const renderNewBtn = (cityName) => {
        //create markup for btn use city name
        let newBtn ="";
        //append btn to container
        for (let i = 0; i < history.length; i++) {
            newBtn +=
            `
            <button id="historyBtn" type="button>(${history[i]}</button>
            `;
            $(".saved-results").html(newBtn);
           
           
        }
 
        //add event listener (tricky)
        $("#search-button").on("click",getInfo());

        function getInfo(){
            if (localStorage.getItem("history") === null){
                var history =[];
                localStorage.setItem("history",JSON.stringify(history));
            }
            if (userInput !==""){
                history = JSON.parse(localStorage.getItem("history"));
                var newInfo = userInput.value
                history.push(newInfo);
                window.localStorage.setItem("history", JSON.stringify(history));
            }
        }
        

    }


    //on load of the page 
});


