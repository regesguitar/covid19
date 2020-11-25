
import React, { useEffect, useState } from 'react'
import { MenuItem, FormControl, Select, } from "@material-ui/core"
import InfoBox from './InfoBox'
import './App.css';


function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('woldwide');

  // https://disease.sh/v3/covid-19/countries

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country, // United States, United Kingdom
              value: country.countryInfo.iso2 // UK, USA. BRZ
            }))

          setCountries(countries)
        })
    }
    getCountriesData()
  }, [])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value
    setCountry(countryCode);
  }

  return (
    <div className="app">
      <div className="app_header">
        <h1>Aplicação Covid-19 Estrutura de Dados</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="worlwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>


      <div className="app_stats">
        <InfoBox title="Coronavirus Cases" cases={123} total={2000} />

        <InfoBox title="Recovered" cases={1234} total={3000} />

        <InfoBox title="Deaths" cases={12345} total={4000} />


      </div>
      {/* InfoBoxs totle= "Coronavirus recoveries" */}
      {/* InfoBoxs */}







      {/* Header - DONE*/}
      {/* Title + Select input dropdown field - DONE */}

      {/* InfoBoxs */}
      {/* InfoBoxs */}
      {/* InfoBoxs */}

      {/* Table */}
      {/* Graph */}

      {/* MAP */}
    </div>
  );
}

export default App;
