import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import React from 'react';

const QuantityForm = ({
  classes,
  crypto,
  onChangeQuantity,
  quantityOwned,
  setShowQuantityInput,
}) => {
  const updateQuantity = inputValue => {
    quantityOwned = Number(quantityOwned);

    if (inputValue.includes('+')) {
      return Number(quantityOwned) + Number(inputValue.replace('+', ''));
    } else if (inputValue.includes('-')) {
      return Number(quantityOwned) - Number(inputValue.replace('-', ''));
    } else {
      return inputValue;
    }
  };

  const onChange = e => {
    e.target.value.length &&
      onChangeQuantity(crypto.name, updateQuantity(e.target.value));
    setShowQuantityInput(false);
  };
  return (
    <>
      <FormControl classes={{ root: classes.quantityTextField }} variant='standard'>
        <InputLabel htmlFor='quantity-owned-input'>{crypto.symbol}</InputLabel>
        <Input
          id='quantity-owned-input'
          variant='standard'
          type='number'
          label={crypto.symbol}
          onBlur={e => onChange(e)}
          onKeyDown={e => e.key === 'Enter' && onChange(e)}
          onClick={e => e.stopPropagation()}
        />
      </FormControl>
    </>
  );
};

export default QuantityForm;
