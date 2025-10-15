import React, { useEffect, useRef, useState } from 'react'
import './Wether.css'
import clear_img from '../assets/clear.png'
import cloud_img from '../assets/cloud.png'
import drizzle_img from '../assets/drizzle.png'
import rain_img from '../assets/rain.png'
import snow_img from '../assets/snow.png'
import wind_img from '../assets/wind.png'
import humidity_img from '../assets/humidity.png'

export default function Wether() {
    const [weatherData, setWeatherData] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const inputRef = useRef()

    const allIcons = {
        "01d": clear_img,
        "02d": cloud_img,
        "03d": cloud_img,
        "04d": drizzle_img,
        "09d": rain_img,
        "10d": rain_img,
        // "11d": clear_img,
        "13d": snow_img,
        // "50d": clear_img,

        "01n": clear_img,
        "02n": cloud_img,
        "03n": cloud_img,
        "04n": drizzle_img,
        "09n": rain_img,
        "10n": rain_img,
        // "11n": clear_img,
        "13n": snow_img,
        // "50n": clear_img,
    }

    const search = async (city) => {
        if (city === "") {
            setErrMsg("Please enter city name")
            return;
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();
            if (!response.ok) {
                setErrMsg("The city name is invalid.");
                return;
            }
            setErrMsg("")
            const icon = allIcons[data.weather[0].icon] || clear_img;
            console.log(data);

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
            })
        } catch (error) {
            console.log("data not fetching", error);
            setWeatherData(false)
        }
    }
    useEffect(() => {
        search("aricha")
    },[])

  return (
      <div className='weather md:w-fu'>
          <h2 className='errMsg'>{errMsg}</h2>
        <div className="search-bar">
            <input type="text" placeholder='Search' ref={inputRef}  onChange={() => search(inputRef.current.value)} />
            <button onClick={() => search(inputRef.current.value)}>Search</button>
          </div>
          {weatherData ? <>
          <img src={weatherData.icon} className='weather-img' />
          <p className='temperature'>{weatherData.temperature}°</p>
          <p className='location'>{weatherData.location}</p>
          <div className="weather-data">
              <div className="col">
                  <img src={humidity_img}/>
                  <div className="">
                      <p>{weatherData.humidity} %</p>
                      <span>Humidity</span>
                  </div>
              </div>
              <div className="col">
                  <img src={wind_img} alt="" />
                  <div className="">
                      <p>{weatherData.windSpeed} km/h</p>
                      <span>Wind Speed</span>
                  </div>
              </div>
          </div>
        </> : (<div className='errMsg'>Data is not found</div>)}
    </div>
  )
}
