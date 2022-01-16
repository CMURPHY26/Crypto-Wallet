import React from 'react';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import DownloadIcon from '@mui/icons-material/Download';
import IconButton from '@mui/material/IconButton';
import CsvReader from '../CsvReader';
import { CSVLink } from 'react-csv';
import RefreshIcon from '@mui/icons-material/Refresh';

const Header = ({ csvData, getPrices, resetQuantities, setDataFromCsv }) => {
  return (
    <>
      <IconButton aria-label='Update Prices' onClick={getPrices}>
        <RefreshIcon />
      </IconButton>
      <CsvReader classes={'classes'} setDataFromCsv={setDataFromCsv} />
      <IconButton
        sx={{ margin: '0 4px 0 6px' }}
        aria-label='Reset all quantities'
        onClick={resetQuantities}
      >
        <DeleteSweepIcon />
      </IconButton>
      <IconButton className={'classes.csvButton'} aria-label='Download CSV'>
        <CSVLink
          filename={`crypto-wallet-${new Intl.DateTimeFormat('en-US').format(
            Date.now()
          )}.csv`}
          className={'classes.csvIcon'}
          data={csvData}
        >
          <DownloadIcon />
        </CSVLink>
      </IconButton>
    </>
  );
};

export default Header;
