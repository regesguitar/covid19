
import React, { useEffect, useState } from 'react'
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core"
import InfoBox from './InfoBox'
import Table from './Table'
import Map from './Map'
import './App.css';
import { sortData } from './utils';  
import LineGraph from './LineGraph'
import "leaflet/dist/leaflet.css"

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  // https://disease.sh/v3/covid-19/countries

  //permanecer as informações após o refresh.
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data)
    })
  }, [])

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

            const sortedData = sortData(data);
           setTableData(sortedData)
          setCountries(countries)
        })
    }
    getCountriesData()
  }, [])

  const onCountryChange = async (e) => {
    const countryCode = e.target.value
   
    const url = 
    countryCode === "worldwide" 
    ? "https://disease.sh/v3/covid-19/all"
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);

        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);

        
       
      })
  }

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

        <Map
          center={mapCenter}
          zoom={mapZoom}
        />

      </div>

      <Card className="app_right">
        <CardContent>
          <h3> Casos por Cidades </h3>
           <Table countries= {tableData} />
          <h3> Novos casos em todo o mundo </h3>
              <LineGraph />
        </CardContent>



      </Card>

    </div>
  );
}

export default App;
