import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

const SingleCountry = ({ info }) => {
  const { name, languages, flag, population, capital } = info;
  return (
    <div>
      <h2>{name}</h2>
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>
      <h4>Languages</h4>
      <ul>
        {languages.map((lang, langIndex) => (
          <li key={`${name}-lang-${langIndex}`}>{lang.name}</li>
        ))}
      </ul>
      <img src={flag} style={{ width: "7rem" }} alt="country" />{" "}
    </div>
  );
};

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
      Find countries{" "}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        {countryToShow.length === 1 ? (
          <SingleCountry info={countryToShow[0]} />
        ) : countryToShow.length > 10 ? (
          "Too many searches, specify another filter"
        ) : (
          countryToShow.map((country) => <p>{country.name}</p>)
        )}
      </div>
    </div>
  );
}

export default App;
