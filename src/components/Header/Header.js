import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import DownloadIcon from '@mui/icons-material/Download';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import { CSVLink } from 'react-csv';
import CsvReader from '../CsvReader';

const Header = ({ quantities, getPrices, resetQuantities, setDataFromCsv }) => {
  const csvData = Object.keys(quantities)?.map(quantity => {
    return [...[quantity], quantities[quantity].newQuantity];
  });
  return (
    <>
      <IconButton aria-label='Update Prices' onClick={getPrices}>
        <RefreshIcon />
      </IconButton>
      <CsvReader setDataFromCsv={setDataFromCsv} />
      <IconButton
        sx={{ margin: '0 4px 0 6px' }}
        aria-label='Reset all quantities'
        onClick={resetQuantities}
      >
        <DeleteSweepIcon />
      </IconButton>
      <IconButton aria-label='Download CSV'>
        <CSVLink
          filename={`crypto-wallet-${new Intl.DateTimeFormat('en-US').format(
            Date.now()
          )}.csv`}
          data={csvData}
          style={{ color: 'inherit', display: 'inherit', marginTop: 2 }}
        >
          <DownloadIcon />
        </CSVLink>
      </IconButton>
    </>
  );
};

export default Header;
