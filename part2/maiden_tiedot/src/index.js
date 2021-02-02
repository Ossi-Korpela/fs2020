import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';





const SearchForm = (props) => {
  const {newSearch, handleSearchChange} = props

  return(
    <form>
        find countries <input
                        value={newSearch}
                        onChange={handleSearchChange}>
        </input>
      </form>
  )
}



const Weather = ({country}) => {
  console.log('weather is printed')
  const [weather, setWeather] = useState([])

  const api_key = process.env.REACT_APP_API_KEY  
  const req = 'http://api.weatherapi.com/v1/current.json?key=' + api_key + '&q=' + country.capital
  console.log(req)
  
  useEffect(() => {
    const request = axios.get(req)
    request.then(res => setWeather(res.data))
      .catch(e => {
        console.log('not loaded')
      })

  },[country, req])
  

  if(weather.length < 2){
    return null
  }
  return(
    <div>
      <h2>Weather in {country.capital}</h2>
      <b>temperature: </b>{weather.current.temp_c}<br/>
      <img src={weather.current.condition.icon} alt="weather icon"></img><br/>
      <b>wind: </b> {weather.current.wind_mph} mph direction {weather.current.wind_dir}<br/>
    </div>
  )

}

const SingleCountry = (props) => {  
  const {country} = props
  
    return(
      <div>
        <h1>{country.name}</h1>
        <p>
          capital {country.capital} <br/>
          population {country.population} <br/>
        </p>
        <h3>languages</h3>
        <ul>
          {country.languages.map((lang, ind) => <li key={ind}>{lang.name}</li>)}
        </ul>
        <img src={country.flag} alt='Country flag ' width={150}></img>
        <Weather country={country}/>        
     
      </div>
    )
  
  
}




const ShowButton = (props) => {
  const {country, setNewSearch} = props  

  return(
    <button onClick={() => setNewSearch(country.name)}>show</button>
  )
}

const DisplayLogic = (props) => {
  const {newSearch, setNewSearch, allData, weather} = props
  const filteredList = allData.filter(country => country.name.toLowerCase().includes(newSearch.toLowerCase()))
  if(filteredList.length > 10){
    return(
      <p>
        Too many matches, specify another filter
      </p>
    )
  }
  else if(filteredList.length === 1){    
    const country = filteredList[0]

    if(weather === []){
      return(<div>
        <SingleCountry country={country}/>    
        </div>
      ) 
    }
    else{
      return(<div>
        <SingleCountry country={country}/>  
        </div>
      ) 
    }
       
  }
  else{
    
    return(
      <div>
          {filteredList.map((country, ind) => <p key={ind}>{country.name} <ShowButton 
                                                                            country={country} 
                                                                            setNewSearch={setNewSearch}/> <br/> </p>)}        
      </div>
    )
  }
}



const App = () => {
  const [allData, setAllData] = useState([])
  const [newSearch, setNewSearch] = useState('')

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }


  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setAllData(response.data)
      })
  }, [])

 
  

  return(
    <div>
      <SearchForm newSearch={newSearch} 
        handleSearchChange={handleSearchChange}/>
      <DisplayLogic newSearch={newSearch}
                    setNewSearch={setNewSearch}
                    allData={allData}/>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

