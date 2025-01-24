const button = document.getElementById("search")
const input = document.getElementById("cityinput")
const country = document.getElementById("country")
const localtime = document.getElementById("localtime")
const temp = document.getElementById("temp")
const getdata = async() =>{
    let url = `http://api.weatherapi.com/v1/current.json?key=ec5b58a0f5b045d1b7e123216250601&q=${input.value}&aqi=yes`
    let data = await fetch(url)
    let response = await data.json()
    country.innerText = `${response.location.country} , ${response.location.region} - ${response.location.name}`
    localtime.innerText = `${response.location.localtime}`
    temp.innerText = `Temperature is ${response.current.temp_c}°C`
    console.log(response)
}
button.addEventListener("click",()=>{
    getdata()
})