async function makeFetchRequest(url, headers) {
  const response = await fetch(url, {
    headers: {
      ...headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Fetch failed', response);
  }

  return await response.json();
}

export const fetchCryptoData = () => {
  return makeFetchRequest(
    'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?',
    {
      'X-CMC_PRO_API_KEY': process.env.REACT_APP_COIN_MARKET_CAP_API_KEY,
    }
  );
};
