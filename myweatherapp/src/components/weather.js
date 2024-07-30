import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import GaugeComponent from 'react-gauge-component'
import './weather.css'



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
            <form onSubmit={handleSubmit} className="search-bar">
                <TextField
                    className="text"
                    onInput={(e) => {
                        setCity(e.target.value);
                    }}
                    value={city}
                    label="Enter a city name"
                    variant="outlined"
                    placeholder="Search..."
                    size="small"
                />
                <IconButton type="submit" aria-label="search">
                    <SearchIcon style={{ fill: "blue" }} />
                </IconButton>
            </form>

            {(flag && data) && (
                <div className="cards">
                    <Card sx={{ maxWidth: 650 }} style={{ border: "1px solid blue" }}>
                        <CardActionArea>
                            <CardContent>
                                <h2 color="blue">{data.location.name}</h2>
                                <p>{data.current.condition.text}</p>
                                <img alt="weather" src={data.current.condition.icon}></img>
                                <div className="gauge">
                                    <GaugeComponent
                                        type="semicircle"
                                        arc={{
                                            width: 0.2,
                                            padding: 0.005,
                                            cornerRadius: 1,
                                            gradient: true,
                                            subArcs: [
                                            {
                                                limit: 5,
                                                color: '#EA4228',
                                                showTick: true,
                                                tooltip: {
                                                text: 'Too low temperature!'
                                                },
                                                // onClick: () => console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"),
                                                // onMouseMove: () => console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"),
                                                // onMouseLeave: () => console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"),
                                            },
                                            {
                                                limit: 12,
                                                color: '#F5CD19',
                                                showTick: true,
                                                tooltip: {
                                                text: 'Low temperature!'
                                                }
                                            },
                                            {
                                                limit: 25,
                                                color: '#5BE12C',
                                                showTick: true,
                                                tooltip: {
                                                text: 'OK temperature!'
                                                }
                                            },
                                            {
                                                limit: 40, color: '#F5CD19', showTick: true,
                                                tooltip: {
                                                text: 'High temperature!'
                                                }
                                            },
                                            {
                                                color: '#EA4228',
                                                tooltip: {
                                                text: 'Too high temperature!'
                                                }
                                            }
                                            ]
                                        }}
                                        pointer={{
                                            color: '#345243',
                                            length: 0.80,
                                            width: 15,
                                            // elastic: true,
                                        }}
                                        labels={{
                                             
                                            valueLabel: { formatTextValue: value => value + 'ºC', matchColorWithArc: true, font: "Sans-serif" },
                                            tickLabels: {
                                            // type: 'outer',
                                            valueConfig: { formatTextValue: value => value + 'ºC', fontSize: 5 },
                                            // ticks: [
                                            //     { value: 13 },
                                            //     { value: 22.5 },
                                            //     { value: 32 }
                                            // ],
                                            }
                                        }}
                                        value={data.current.temp_c}
                                        minValue={0}
                                        maxValue={50}
                                    />
                                    <GaugeComponent
                                        type="semicircle"
                                        arc={{
                                            width: 0.2,
                                            padding: 0.005,
                                            cornerRadius: 1,
                                            gradient: true,
                                            subArcs: [
                                            {
                                                limit: 41,
                                                color: '#EA4228',
                                                showTick: true,
                                                tooltip: {
                                                text: 'Too low temperature!'
                                                },
                                                // onClick: () => console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"),
                                                // onMouseMove: () => console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"),
                                                // onMouseLeave: () => console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"),
                                            },
                                            {
                                                limit: 54,
                                                color: '#F5CD19',
                                                showTick: true,
                                                tooltip: {
                                                text: 'Low temperature!'
                                                }
                                            },
                                            {
                                                limit: 77,
                                                color: '#5BE12C',
                                                showTick: true,
                                                tooltip: {
                                                text: 'OK temperature!'
                                                }
                                            },
                                            {
                                                limit: 104, color: '#F5CD19', showTick: true,
                                                tooltip: {
                                                text: 'High temperature!'
                                                }
                                            },
                                            {
                                                color: '#EA4228',
                                                tooltip: {
                                                text: 'Too high temperature!'
                                                }
                                            }
                                            ]
                                        }}
                                        pointer={{
                                            color: '#345243',
                                            length: 0.80,
                                            width: 15,
                                            // elastic: true,
                                        }}
                                        labels={{
                                            valueLabel: { formatTextValue: value => value + 'ºF', matchColorWithArc: true },
                                            tickLabels: {
                                            // type: 'outer',
                                            valueConfig: { formatTextValue: value => value + 'ºF', fontSize: 5 },
                                            // ticks: [
                                            //     { value: 13 },
                                            //     { value: 22.5 },
                                            //     { value: 32 }
                                            // ],
                                            }
                                        }}
                                        value={data.current.temp_f}
                                        minValue={32}
                                        maxValue={122}
                                    />
                                </div>
                                <p>Temperature (C): {data.current.temp_c} ºC</p>
                                <p>Temperature (F): {data.current.temp_f} ºF</p>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    {/* <h2>{data.location.name}</h2>
                    <p>{data.current.condition.text}</p>
                    <img alt="weather" src={data.current.condition.icon}></img>
                    <p>Temperature (C): {data.current.temp_c} C</p>
                    <p>Temperature (F): {data.current.temp_f} F</p> */}
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