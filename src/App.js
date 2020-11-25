
import React, {useEffect, useState} from 'react'
import { MenuItem, FormControl, Select, } from "@material-ui/core"
import './App.css';


function App() {
const [countries, setCountries] = useState ([]);
// https://disease.sh/v3/covid-19/countries

useEffect(()=> {
  const getCountriesData = async () => {
    await fetch ("https://disease.sh/v3/covid-19/countries")
      .then((response) =>response.json())
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

  return (
    <div className="app">
      <div className="app_header">
        <h1>Aplicação Covid-19 Estrutura de Dados</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" value="abc">

            {/* all the coountries - list of the options */}

            {countries.map((country)=>(
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ) )
            }

            {/* <MenuItem value="worlwide">Worldwide</MenuItem>
            <MenuItem value="worlwide">Option two</MenuItem>
            <MenuItem value="worlwide">Option three</MenuItem>
            <MenuItem value="worlwide">Yo</MenuItem> */}
          </Select>

        </FormControl>

      </div>





      {/* Header */}
      {/* Title + Select input dropdown field */}

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
