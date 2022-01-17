import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Row from './components/Row';
import { fetchCryptoData } from './helpers/apis';
import { cryptoIcons } from './helpers/icons';
import { handleItemInLocalStorage, setItemInLocalStorage } from './helpers/utils';

const App = () => {
  const [cryptoCurrencies, setCryptoCurrencies] = useState([]);
  const [cryptoData, setCryptoData] = useState({});
  const [dataFromCsv, setDataFromCsv] = useState([]);
  const [visibleCoins, setVisibleCoins] = useState({});
  const [quantities, setQuantities] = useState({});
  const refresh = { enabled: false, seconds: 10 };

  useEffect(() => {
    getPrices();

    if (refresh.enabled) {
      autoRefreshPrices();
    }

    handleItemInLocalStorage(setQuantities, 'quantities');
  }, []);

  useEffect(() => {
    setItemInLocalStorage('quantities', quantities);
  }, [quantities]);

  useEffect(() => {
    syncDataFromCsv();
  }, [dataFromCsv]);

  useEffect(() => {
    if (cryptoData.length) {
      formatCryptoData();
    }
  }, [cryptoData, visibleCoins]);

  const getPrices = () => {
    fetchCryptoData().then(response => {
      setCryptoData(response.data);
    });
  };

  const autoRefreshPrices = () => {
    const interval = setInterval(() => {
      getPrices();
    }, refresh.seconds * 1000);

    return () => clearInterval(interval);
  };

  const syncDataFromCsv = () => {
    const csvItems = {};

    dataFromCsv.map(item => {
      const name = Object.keys(item);
      const quantity = item[name];

      csvItems[name] = {
        newQuantity: quantity,
        price: cryptoCurrencies.find(crypto => crypto.name == name)?.price,
      };
    });

    setQuantities(csvItems);
  };

  const resetQuantities = () => {
    setQuantities({});
  };

  const formatCryptoData = () => {
    const cryptos = [];
    cryptoData.map(crypto => {
      const prices = crypto.quote.USD;
      const stablecoins = ['USDT', 'USDC', 'BUSD', 'DAI', 'UST'];
      const bitcoinDuplicates = ['WBTC', 'BTCB'];
      const excludedCoins = [...stablecoins, ...bitcoinDuplicates];

      if (!excludedCoins.includes(crypto.symbol)) {
        if (crypto.cmc_rank < 60) {
          cryptos.push({
            symbol: crypto.symbol,
            name: crypto.name,
            rank: crypto.cmc_rank,
            price: prices.price,
            icon: cryptoIcons?.[crypto.slug] ?? cryptoIcons.genericCryptoIcon,
            originalQuantity: 0,
            visible: visibleCoins[crypto.name] ?? true,
            extraDetails: {
              circulatingSupply: crypto.circulating_supply,
              maxSupply: crypto.max_supply ?? 'N/A',
              marketCap: prices.market_cap,
              percentChange1hour: prices.percent_change_1h,
              percentChange1day: prices.percent_change_24h,
              percentChange1week: prices.percent_change_7d,
            },
          });
        }
      }
    });

    cryptos.sort((a, b) => {
      return b.extraDetails.marketCap - a.extraDetails.marketCap;
    });

    setCryptoCurrencies(cryptos);
  };

  return (
    <>
      <Header
        getPrices={getPrices}
        quantities={quantities}
        resetQuantities={resetQuantities}
        setDataFromCsv={setDataFromCsv}
      />
      <Row
        cryptoCurrencies={cryptoCurrencies}
        quantities={quantities}
        setQuantities={setQuantities}
        setVisibleCoins={setVisibleCoins}
        visibleCoins={visibleCoins}
      />
    </>
  );
};

export default App;
