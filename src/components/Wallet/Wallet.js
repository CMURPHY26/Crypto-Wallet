import React, { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import Accordion from "./Accordion/Accordion";
import { cryptoIcons } from "../../helpers/icons";
import { fetchCryptoData } from "../../helpers/apis";

const Wallet = () => {
  const [cryptos, setCryptos] = useState({});
  const refreshSeconds = 600; // put high number to prevent hitting limit
  let cryptoCurrencies = [];

  const getPrices = () => {
    fetchCryptoData().then(response => {
      setCryptos(response.data);
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getPrices();
    }, refreshSeconds * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getPrices();
  }, []);

  if (!cryptos.length) {
    return null;
  }

  cryptos.map(crypto => {
    const { cmc_rank, name, quote, slug, circulating_supply, max_supply, symbol } = crypto;
    const price = quote.USD;
    const stablecoins = ['USDT', 'USDC', 'BUSD', 'DAI', 'UST'];
    const shitcoins = ['SHIB', 'DOGE', 'VET'];
    const boringCoins = ['AVAX', 'LUNA', 'CRO', 'HBAR', 'AXS', 'NEAR', 'FTT']
    const bitcoinDuplicates = ['WBTC'];
    const excludedCoins = [...stablecoins, ...shitcoins, ...boringCoins, ...bitcoinDuplicates];

    if (!excludedCoins.includes(symbol)) {
      cmc_rank < 35 &&
        (cryptoCurrencies = [
          ...cryptoCurrencies,
          {
            symbol,
            displayName: name,
            price: price.price,
            icon: cryptoIcons[slug] ? cryptoIcons[slug] : cryptoIcons.genericCryptoIcon,
            amountOwned: 0,
            rank: cmc_rank,
            extraDetails: {
              circulatingSupply: circulating_supply,
              maxSupply: max_supply,
              marketCap: price.market_cap,
              percentChange1hour: price.percent_change_1h,
              percentChange24hours: price.percent_change_7d,
              percentChange1week: price.percent_change_24h,
              percentChange1month: price.percent_change_30d,
            },
          },
        ]);
    }
  });

  if (!cryptoCurrencies.length) {
    return null;
  }

  const sortedCryptosByMarketCap = cryptoCurrencies.sort((a, b) => {
    return b.extraDetails.marketCap - a.extraDetails.marketCap;
  });

  return (
    <>
      <IconButton onClick={getPrices}>
        <RefreshIcon />
      </IconButton>
      <Accordion cryptoCurrencies={sortedCryptosByMarketCap} />
    </>
  );
};

export default Wallet;
