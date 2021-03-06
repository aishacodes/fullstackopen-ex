import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

const SingleCountry = ({ info, showByDefault }) => {
  const { name, languages, flag, population, capital } = info;
  const [show, setShow] = useState(false);
  const [weather, setWeather] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${key}&query=${capital}`
      )
      .then((response) => {
        console.log(response.data);
        setWeather(response.data);
      })
      .catch((err) => console.log({ err }));
  }, [capital]);

  return (
    <div key={name}>
      <h2>{name}</h2>
      {showByDefault || show ? (
        <>
          <p>Capital: {capital}</p>
          <p>Population: {population}</p>
          <h4>Languages</h4>
          <ul>
            {languages.map((lang, langIndex) => (
              <li key={`${name}-lang-${langIndex}`}>{lang.name}</li>
            ))}
          </ul>
          <img src={flag} style={{ width: "7rem" }} alt="country" />{" "}
          {weather && (
            <div>
              <h4>Weather in {capital}</h4>

              <p>Temperature: {weather.current.temperature} celcius</p>
              <img src={weather.current.weather_icons} alt="" />
              <p>
                Wind: {weather.current.wind_speed}mph direction:{" "}
                {weather.current.wind_dir}
              </p>
            </div>
          )}
        </>
      ) : (
        <button onClick={() => setShow(true)}>show</button>
      )}
    </div>
  );
};

const key = process.env.REACT_APP_KEY;

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      console.log(res.data);
      setCountries(res.data);
    });
  }, []);

  const searchedCoutries = countries.filter((country) => {
    return (
      country.name.toLowerCase().trim().indexOf(search.toLowerCase().trim()) >
      -1
    );
  });

  const countryToShow = search.trim() ? searchedCoutries : [];

  return (
    <div className="App">
      <br />
      Find countries{" "}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        {countryToShow.length === 1 ? (
          <SingleCountry info={countryToShow[0]} showByDefault={true} />
        ) : countryToShow.length > 10 ? (
          "Too many searches, specify another filter"
        ) : (
          countryToShow.map((country, countryIndex) => (
            <SingleCountry key={`country-${countryIndex}`} info={country} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
