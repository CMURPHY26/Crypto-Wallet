import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import React from 'react';

const QuantityForm = ({
  crypto,
  onChangeQuantity,
  quantityOwned,
  setShowQuantityInput,
}) => {
  const updateQuantity = inputValue => {
    if (+inputValue.includes('+')) {
      return +quantityOwned + +inputValue.replace('+', '');
    } else if (inputValue.includes('-')) {
      return +quantityOwned - +inputValue.replace('-', '');
    } else {
      return +inputValue;
    }
  };

  const changeQuantity = e => {
    if (e.target.value.length) {
      onChangeQuantity(crypto.name, updateQuantity(e.target.value));
      setShowQuantityInput(false);
    }
  };

  return (
    <>
      <FormControl sx={{ width: 110, marginLeft: 30 }} variant='standard'>
        <InputLabel htmlFor='quantity-owned-input'>{crypto.symbol}</InputLabel>
        <Input
          id='quantity-owned-input'
          variant='standard'
          type='number'
          label={crypto.symbol}
          onBlur={e => changeQuantity(e)}
          onKeyDown={e => e.key === 'Enter' && changeQuantity(e)}
          onClick={e => e.stopPropagation()}
        />
      </FormControl>
    </>
  );
};

export default QuantityForm;
