import UploadIcon from '@mui/icons-material/Upload';
import IconButton from '@mui/material/IconButton';
import React, { createRef, useState } from 'react';
import { CSVReader } from 'react-papaparse';

const buttonRef = createRef();

const CsvReader = ({ setDataFromCsv }) => {
  const handleOpenDialog = e => {
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  const handleOnFileLoad = file => {
    const data = file.map(row => {
      return {
        [row.data[0]]: row.data[1],
      };
    });
    setDataFromCsv(data);
  };

  return (
    <CSVReader
      ref={buttonRef}
      onFileLoad={handleOnFileLoad}
      style={{
        dropArea: {
          width: 20,
          height: 20,
          border: 'none',
          position: 'absolute',
          right: 40,
          top: 2,
        },
        dropFile: {
          display: 'none',
        },
        fileSizeInfo: {
          display: 'none',
        },
        fileNameInfo: {
          display: 'none',
        },
      }}
    >
      <div>
        <IconButton aria-label='Upload CSV' onClick={handleOpenDialog}>
          <UploadIcon />
        </IconButton>
      </div>
    </CSVReader>
  );
};

export default CsvReader;
