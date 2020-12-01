
import React, { useEffect, useState } from 'react'
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core"
import InfoBox from './InfoBox'
import Map from './Map'
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});

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

    const url = 
    countryCode ===  "worldwide"
      ? "https://disease.sh/v3/covid-19/all"
      : `https://dosease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode)

        //Todas as datas
        setCountryInfo(data)
      })
  }

  console.log('COUNTRY INFO >>>', countryInfo)

  return (
    <div className="app">
      <div className="app_left">

        <div className="app_header">
          <h1>Aplicação Covid-19 Estrutura de Dados</h1>
          <FormControl className="app_dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>


        <div className="app_stats">
          <InfoBox title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />

          <InfoBox title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />

          <InfoBox title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>

        < Map />

      </div>

      <Card className="app_right">
        <CardContent>
          <h3> Casos por Cidades </h3>
          {/* Table */}
          <h3> Novos casos em todo o mundo </h3>
          {/* Graph */}
        </CardContent>



      </Card>

    </div>
  );
}

export default App;
