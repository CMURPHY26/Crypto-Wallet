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

export const abbreviateNumber = number => {
  if (number >= 1_000_000_000) {
    return `${(number / 1_000_000_000).toFixed(1).replace(/\.0$/, '')}B`;
  }
  if (number >= 1_000_000) {
    return `${(number / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  }
  if (number >= 1_000) {
    return `${(number / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return number;
};

export const formatPercentChangeOverTime = timeFrame =>
  parseFloat(timeFrame).toFixed(2) + '%';
