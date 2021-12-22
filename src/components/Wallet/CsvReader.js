import React, { createRef, useEffect, useState } from 'react';
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
    <>
      <CSVReader ref={buttonRef} onFileLoad={handleOnFileLoad}>
        <div>
          <button type='button' onClick={handleOpenDialog}>
            Upload CSV
          </button>
        </div>
      </CSVReader>
    </>
  );
};

export default CsvReader;
