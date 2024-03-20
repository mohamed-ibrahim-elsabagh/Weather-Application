// today //
let todayDayNumber=document.getElementById("today-day-number")
let todayDayDateMounth=document.getElementById("today-day-date-mounth")
let todayCity=document.getElementById("city")
let tempIcon=document.getElementById("temp-icon")
let todayTempConditionName=document.getElementById("temp-condition-name")
let todayTemp=document.getElementById("temp-c")
let WeatherStatus=document.getElementById("weather-status")
let humidity=document.getElementById("humidity")
let windSpeed=document.getElementById("wind-speed")
let windDirection=document.getElementById("wind-direction")

// next day //

let nextDayDay=document.getElementsByClassName("nextDay-day")
let nextDayMaxTemp=document.getElementsByClassName("nextDay-max-temp")
let nextDayMinTemp=document.getElementsByClassName("nextDay-min-temp")
let nextdayCondition=document.getElementsByClassName("nextday-condition")
let NextDayTempIcon=document.getElementsByClassName("Next-day-temp-icon")

// search input // 
let searchInput=document.getElementById("input-search") 

// date implementation //
let date= new Date("2024-01-19")
console.log(date.getDate())
// console.log(date.toLocaleDateString("en-us",{weekday:"long"}))
// console.log(date.toLocaleDateString("en-us",{month:"long"}))

// fetch API // 

async function getweatherData(city)
{
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=a74986259df5417da5d195025241601&q=${city}&days=3`)
    let apiContent = await weatherResponse.json()

    console.log(apiContent)
    return apiContent
}





// display today data //
function displayTodayData(data)
{
    let todayDate = new Date()
    todayDayNumber.innerHTML=todayDate.toLocaleDateString("en-us",{weekday:"long"})
    todayDayDateMounth.innerHTML=todayDate.getDate() + todayDate.toLocaleDateString("en-us",{month:"long"})

    todayCity.innerHTML=data.location.name
    todayTemp.innerHTML=data.current.temp_c+" C"
    tempIcon.setAttribute("src",data.current.condition.icon)
    // tempIcon.innerHTML = `<img src=${data.current.condition.icon} />`
    todayTempConditionName.innerHTML=data.current.condition.text
    humidity.innerHTML=data.current.humidity+"%"
    windSpeed.innerHTML=data.current.wind_kph+"kph"
    windDirection.innerHTML=data.current.wind_dir
    
}

// display next day data // 
function displayNextDayData(data)
{
    let forecastData=data.forecast.forecastday
    // console.log(forecastData)

    // console.log(nextDayDay)
    for (let i=0 ; i < 2 ; i++ )
    {
        let nextDate= new Date(forecastData[i+1].date)
        nextDayDay[i].innerHTML = nextDate.toLocaleDateString("en-us",{weekday:"long"})

        nextDayMaxTemp[i].innerHTML=forecastData[i+1].day.maxtemp_c+" C"
        nextDayMinTemp[i].innerHTML=forecastData[i+1].day.mintemp_c+" C"
        nextdayCondition[i].innerHTML=forecastData[i+1].day.condition.text
        NextDayTempIcon[i].setAttribute("src",forecastData[i+1].day.condition.icon)
        // NextDayTempIcon[i].innerHTML = `<img src=${forecastData[i+1].day.condition.icon} />`


    }


}


// start app // 
async function startApp(city="cairo")
{
    let weatherData= await getweatherData(city)

// to fix error al bytl3 lw katb 7aga 8lt fl input //

    if(!weatherData.error)
    {
        displayTodayData(weatherData)
        displayNextDayData(weatherData)
    }

}
startApp()



// Real time Search //
searchInput.addEventListener("input", function(){
    // console.log(searchInput.value)

    startApp(searchInput.value)


}
)




