import React, { useEffect, useState } from 'react';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function CoinInfo({ image, name, symbol }) {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const getCoinPrice = async () => {
      try {
        const url = `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        setPrice(data.USD);
      } catch (error) {
        console.error('Error fetching coin price:', error);
      }
    };

    getCoinPrice();
  }, [symbol]);

  return (
    <li className="main-list" key={symbol}>
      {price && (
        <>
          <img className="icons" src={`https://www.cryptocompare.com${image}`} alt={`Small icon for ${name} crypto coin`} />
          {name} <span className="tab">{price} USD</span>
        </>
      )}
    </li>
  );
}

export default CoinInfo;