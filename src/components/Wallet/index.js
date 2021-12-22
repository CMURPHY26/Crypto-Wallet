import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useState } from 'react';
import { fetchCryptoData } from '../../helpers/apis';
import { cryptoIcons } from '../../helpers/icons';
import Row from './Row';

const Wallet = () => {
  const [cryptos, setCryptos] = useState({});
  const shouldRefresh = false;
  const refreshSeconds = 10;
  let cryptoCurrencies = [];

  const getPrices = () => {
    fetchCryptoData().then(response => {
      setCryptos(response.data);
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

  if (!cryptos.length) {
    return null;
  }

  cryptos.map(crypto => {
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
      <IconButton aria-label='Update Prices' onClick={getPrices}>
        <RefreshIcon />
      </IconButton>
      <Row cryptoCurrencies={sortedCryptosByMarketCap} />
    </>
  );
};

export default Wallet;
