import React, { useState } from "react";

function Weather() {

    const [city, setCity] = useState("")
    const [data, setData] = useState(null)
    const [flag, setFlag] = useState(true)

    const fetchData = async() => {
        const resp = await fetch("https://api.weatherapi.com/v1/current.json?key=" + process.env.REACT_APP_API_KEY + "&q=" + city + "&aqi=no");
        
        if(resp.status !== 200){
            console.log("Cannot fetch data")
            setFlag(false)
        }
        else {
            const info = await resp.json()
            setData(info)
        }
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        console.log(city)
        fetchData();
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Enter city name'
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                />
                <button type='submit'>Get Weather</button>
            </form>

            {(flag && data) && (
                <div>
                    <h2>{data.location.name}</h2>
                    <p>{data.current.condition.text}</p>
                    <img alt="weather" src={data.current.condition.icon}></img>
                    <p>Temperature (C): {data.current.temp_c} C</p>
                    <p>Temperature (F): {data.current.temp_f} F</p>
                </div>
            )}
            {!flag && (
                <div>
                    <h2>Location not found. Please try again</h2>
                </div>
            )}
        </div>
    )

}

export default Weather;