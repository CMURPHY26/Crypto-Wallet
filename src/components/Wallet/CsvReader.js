import React, { createRef, useEffect, useState } from 'react';
import { CSVReader } from 'react-papaparse';
import IconButton from '@mui/material/IconButton';
import UploadIcon from '@mui/icons-material/Upload';

const buttonRef = createRef();

const CsvReader = ({ setDataFromCsv }) => {
  const [isShowingCsvUploader, setIsShowingCsvUploader] = useState(true);

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
    setIsShowingCsvUploader(false);
  };

  return (
    <>
      {isShowingCsvUploader && (
        <CSVReader
          ref={buttonRef}
          onFileLoad={handleOnFileLoad}
          removeButtonColor={true}
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
      )}
    </>
  );
};

export default CsvReader;
