import React, { useState, useEffect } from 'react';
import './App.css';
import CoinInfo from './Components/CoinInfo';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const fetchAllCoinData = async () => {
      const response = await fetch(`https://min-api.cryptocompare.com/data/all/coinlist?api_key=${API_KEY}`);
      const data = await response.json();
      setList(data.Data);
      setFilteredResults(Object.entries(data.Data)); // Initially, filteredResults will show all coins
    };
    fetchAllCoinData().catch(console.error);
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = Object.entries(list).filter(([key, value]) =>
        value.FullName.toLowerCase().includes(searchValue.toLowerCase()) || key.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(Object.entries(list));
    }
  };

  return (
    <div className="whole-page">
      <h1>My Crypto List</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => searchItems(e.target.value)}
      />
      <ul>
        {searchInput.length > 0 ? (
          filteredResults.map(([key, value]) => (
            <CoinInfo
              key={value.Symbol}
              image={value.ImageUrl}
              name={value.FullName}
              symbol={value.Symbol}
            />
          ))
        ) : (
          Object.entries(list).map(([key, value]) => (
            value.PlatformType === "blockchain" ? (
              <CoinInfo
                key={value.Symbol}
                image={value.ImageUrl}
                name={value.FullName}
                symbol={value.Symbol}
              />
            ) : null
          ))
        )}
      </ul>
    </div>
  );
}

export default App;

