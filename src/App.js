import React ,{useState} from 'react';
import './App.css'
const api = {
  key: "3e7d51461c99408ff6f959ee54750877",
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [allData,setAllData] = useState([])

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          if(result.cod === 200){
            let data = {
              name:result.name,
              temp:result.main.temp,
              status:result.weather[0].main
            }
            let myAllData = allData;
            myAllData.unshift(data)
            setAllData(myAllData)
          }
          setQuery('');
          console.log(result);
          
        })
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  
  const dataList = allData.map((item,index)=>{
    return <div className="list" key={index}>
      <span  className="list-item">{item.name}</span>
      <span  className="list-item">{item.temp}</span>
      <span  className="list-item">{item.status}</span>
    </div>
  })
  return (
    <div className="container">
        <h1>Weather App</h1>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="text-center">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="text-center">
            <div className="temp">
              {Math.round(weather.main.temp)}°C
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : <p className="text-center">{weather.message}</p>}

        {Object.keys(weather).length > 0 ? '':<p className="text-center">Readings From The API...</p>}

        <div className="list-parent">
          {dataList}
        </div>
    </div>
  );
}

export default App;