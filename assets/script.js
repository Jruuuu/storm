$(document).ready(function () {

    //var with APIkey
    const apiKey = "b1776aa1272908b67d6c8efe7518db41";

    //history
    const searchHistory = JSON.parse(localStorage.getItem("hisory")) || [];

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
        const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
        //get the data
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (res) {
            //create the markup
            const currentWeatherMarkUp = 
            `
                <div class="card">
                    <div class="card-body">
                        <h3 class="card-title-container">
                            <span class="card-text name">${res.name}</span>
                            <span class="card-text date">(${new Date().toLocaleDateString()})</span>
                            <span><img src="http://openweathermap.org/img/w/${res.weather[0].icon}.png"/></span>
                        </h3>
                        <p class="card-text temp">Temp: ${res.main.temp}F</p>
                        <p class="card-text wind">Wind Speed: ${res.wind.speed}MPH</p>
                        <p class="card-text humid">Humidity: ${res.main.humidity}%</p>
                    </div>
                </div>
            `;
            //show the data
            $(".todaysForecast").html(currentWeatherMarkUp);
        });
    };

    const getForcast = (cityName) => {
        //create queryURL var
        const queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
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
                        <div class="card">
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

        //append btn to container

        //add event listener (tricky)

    }


    //on load of the page 
});


