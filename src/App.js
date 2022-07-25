import {useEffect, useState} from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState([]);

  function onChange(event) {
    setMoney(event.target.value);
  }
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json)=> {
        setCoins(json);
        setLoading(false);
      });
  },[])
  return (
    <div>
      <div>
        <h1>The Coins {loading ? "" : `(${coins.length})`}</h1>
        <input type='number' placeholder="Enter USD" value={money} onChange={onChange}/>
      </div>
      {loading ? (
        <strong>Loading ...</strong>
      ) : (
      <select>
        {coins.map((coin)=> (
          <option>
              {money == "" ? `${coin.name} (coin.symbol) : ${coin.quotes.USD.price} USD` 
              : `${coin.name} (coin.symbol) :  ${money/coin.quotes.USD.price} ${coin.symbol}` }
          </option>
        ))}
      </select>
      )}
    </div>
  );
}

export default App;
