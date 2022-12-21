import React, {useState, useEffect} from 'react'
import './style.css';
import Weathercard from './weathercare';
const Temp = () => {
    const [searchValue, setSearchValue] = useState("Lucknow")
    const [tempInfo, setTempInfo] = useState({})
    const getWeatherInfo = async () =>{
        try{
            // let url = `https://api.openweathermap.org/data/2.5/weather?q=${setSearchValue}appid=6a031b022c02f64c7163d3598fe5ebd0`;
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=6a031b022c02f64c7163d3598fe5ebd0`

            const res = await fetch(url);
            const data = await res.json();
            console.log(data);

            const {temp, humidity, pressure} = data.main;
            const {main: weathermood} = data.weather[0]
            const {name} = data;
            const {speed} = data.wind;
            const {country,sunset} = data.sys;

            const myNewsWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset
            };
            setTempInfo(myNewsWeatherInfo);
            

        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        getWeatherInfo();
    }, []);
    
    return (
        <>
            <div className='wrap'>
                <div className='search'>
                    <input type='search'
                        placeholder='Search...'
                        autoFocus
                        id='search'
                        className='searchTerm'
                        value={searchValue}
                        onChange={(e)=>setSearchValue(e.target.value)} />
                    <buttton className='searchButton' type='button' onClick={getWeatherInfo}>Search</buttton>
                </div>
            </div>
            <Weathercard tempInfo={tempInfo}/>
        </>
    )
}
export default Temp;