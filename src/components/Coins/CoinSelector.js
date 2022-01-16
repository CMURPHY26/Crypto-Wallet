import { Button } from '@mui/material';
import React from 'react';

const CoinSelector = ({ cryptoCurrencies, showAllCoins, setShowAllCoins }) => {
  return (
    <div>
      <Button variant='contained' onClick={() => setShowAllCoins(!showAllCoins)}>
        Toggle Displayed Coins
      </Button>
    </div>
  );
};

export default CoinSelector;
