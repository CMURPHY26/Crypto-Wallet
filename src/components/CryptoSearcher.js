import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';

const CryptoSearcher = ({ cryptoCurrencies }) => {
  return (
    <Autocomplete
      options={cryptoCurrencies}
      getOptionLabel={option => option.name}
      style={{ width: 300 }}
      renderInput={params => <TextField {...params} variant='outlined' />}
    />
  );
};

export default CryptoSearcher;
