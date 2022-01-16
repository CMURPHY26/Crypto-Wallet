import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Row from './components/Row';
import { fetchCryptoData } from './helpers/apis';
import { cryptoIcons } from './helpers/icons';

const App = () => {
  const [cryptoData, setCryptoData] = useState({});
  const [visibleCoins, setVisibleCoins] = useState({});
  const [quantities, setQuantities] = useState({});
  const [dataFromCsv, setDataFromCsv] = useState([]);
  const shouldRefresh = false;
  const refreshSeconds = 10;
  let cryptoCurrencies = [];

  const csvData = Object.keys(quantities)?.map(quantity => {
    return [...[quantity], quantities[quantity].newQuantity];
  });

  const getPrices = () => {
    fetchCryptoData().then(response => {
      setCryptoData(response.data);
    });
  };

  useEffect(() => {
    getPrices();

    if (shouldRefresh) {
      const interval = setInterval(() => {
        getPrices();
      }, refreshSeconds * 1000);

      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    let items = {};
    dataFromCsv.map(item => {
      const name = Object.keys(item);
      const quantity = item[name];

      items[name] = {
        newQuantity: quantity,
        price: cryptoCurrencies.find(crypto => crypto.name == name)?.price,
      };
    });
    setQuantities(items);
  }, [dataFromCsv]);

  const resetQuantities = () => {
    setQuantities({});
  };

  if (!cryptoData.length) {
    return null;
  }

  cryptoData.map(crypto => {
    const {
      cmc_rank: rank,
      name,
      quote,
      slug,
      circulating_supply: circulatingSupply,
      max_supply: maxSupply,
      symbol,
    } = crypto;
    const priceObj = quote.USD;
    const {
      price,
      percent_change_1h: percentChange1hour,
      percent_change_24h: percentChange1day,
      percent_change_7d: percentChange1week,
      market_cap: marketCap,
    } = priceObj;
    const stablecoins = ['USDT', 'USDC', 'BUSD', 'DAI', 'UST'];
    const shitcoins = ['SHIB', 'DOGE', 'VET'];
    const boringCoins = ['AVAX', 'LUNA', 'CRO', 'HBAR', 'AXS', 'NEAR', 'FTT'];
    const bitcoinDuplicates = ['WBTC', 'BTCB'];
    const excludedCoins = [
      ...stablecoins,
      ...shitcoins,
      ...boringCoins,
      ...bitcoinDuplicates,
    ];

    if (!excludedCoins.includes(symbol)) {
      rank < 36 &&
        (cryptoCurrencies = [
          ...cryptoCurrencies,
          {
            symbol,
            name,
            rank,
            price,
            icon: cryptoIcons?.[slug] ?? cryptoIcons.genericCryptoIcon,
            originalQuantity: 0,
            visible: visibleCoins[name] ?? true,
            extraDetails: {
              circulatingSupply,
              maxSupply: maxSupply ?? 'N/A',
              marketCap,
              percentChange1hour,
              percentChange1day,
              percentChange1week,
            },
          },
        ]);
    }
  });

  const sortedCryptosByMarketCap = cryptoCurrencies.sort((a, b) => {
    return b.extraDetails.marketCap - a.extraDetails.marketCap;
  });

  return (
    <>
      <Header
        setDataFromCsv={setDataFromCsv}
        getPrices={getPrices}
        resetQuantities={resetQuantities}
        csvData={csvData}
      />
      <Row
        quantities={quantities}
        setQuantities={setQuantities}
        setVisibleCoins={setVisibleCoins}
        visibleCoins={visibleCoins}
        cryptoCurrencies={sortedCryptosByMarketCap}
      />
    </>
  );
};

export default App;
