import { Button } from '@mui/material';
import React from 'react';

const CoinSelector = ({ showCoinToggler, setShowCoinToggler }) => {
  return (
    <div>
      <Button variant='contained' onClick={() => setShowCoinToggler(!showCoinToggler)}>
        Toggle Displayed Coins
      </Button>
    </div>
  );
};

export default CoinSelector;
