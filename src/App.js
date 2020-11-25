
import React, {useState} from 'react'
import { MenuItem, FormControl, Select, } from "@material-ui/core"
import './App.css';


function App() {
 const [countries, setCountries] = useState ([
   'USA', 'UK', 'Brazil'
 ]);

  return (
    <div className="app">
      <div className="app_header">
        <h1>Aplicação Covid-19 Estrutura de Dados</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" value="abc">

            {/* all the coountries - list of the options */}

            {countries.map((country)=>(
                <MenuItem value={country}>{country}</MenuItem>
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
