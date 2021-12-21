export const handleItemInLocalStorage = (func, key) => {
  try {
    if (key in localStorage) {
      func(JSON.parse(localStorage.getItem(key)));
    }
  } catch (e) {
    console.log(e);
  }
};

export const setItemInLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

export const abbreviateCurrency = dollarAmount => {
  if (dollarAmount >= 1000000000) {
    return `${(dollarAmount / 1000000000).toFixed(1).replace(/\.0$/, '')}B`;
  }
  if (dollarAmount >= 1000000) {
    return `${(dollarAmount / 1000000).toFixed(1).replace(/\.0$/, '')}M`;
  }
  if (dollarAmount >= 1000) {
    return `${(dollarAmount / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return dollarAmount;
};

export const formatPercentChangeOverTime = timeFrame =>
  parseFloat(timeFrame).toFixed(2) + '%';
