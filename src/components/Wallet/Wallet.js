import React, { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import Accordion from "./Accordion/Accordion";
import { cryptoIcons } from "../../helpers/icons";
import { fetchCryptoData } from "../../helpers/apis";

const Wallet = () => {
  const [cryptos, setCryptos] = useState({});
  const refreshSeconds = 60;
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
    const shitcoins = ['SHIB', 'CRO', 'KLAY', 'HBAR'];
    const bitcoinDuplicates = ['WBTC', 'BTCB'];
    const excludedCoins = [...stablecoins, ...shitcoins, ...bitcoinDuplicates];

    if (!excludedCoins.includes(symbol)) {
      cmc_rank < 40 &&
        (cryptoCurrencies = [
          ...cryptoCurrencies,
          {
            symbol,
            displayName: name,
            currentValue: price.price,
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

  return (
    <>
      <IconButton onClick={getPrices}>
        <RefreshIcon />
      </IconButton>
      <Accordion cryptoCurrencies={cryptoCurrencies} />
    </>
  );
};

export default Wallet;
