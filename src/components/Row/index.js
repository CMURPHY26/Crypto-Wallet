import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import DownloadIcon from '@mui/icons-material/Download';
import Accordion from '@mui/material/Accordion';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import {
  currencyFormatter,
  handleItemInLocalStorage,
  setItemInLocalStorage,
} from '../../helpers/utils';
import CsvReader from '../CsvReader';
import ExpandedContent from './ExpandedContent';
import CollapsedContent from './CollapsedContent';
import { useRowStyles } from '../../helpers/styles';

const Row = ({ cryptoCurrencies }) => {
  const classes = useRowStyles();
  const [quantities, setQuantities] = useState({});
  const [showQuantityInput, setShowQuantityInput] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [totalWalletValue, setTotalWalletValue] = useState(0);
  const [dataFromCsv, setDataFromCsv] = useState([]);
  const [sortedCryptoCurrencies, setSortedCryptoCurrencies] = useState(cryptoCurrencies);
  const getPrice = name => cryptoCurrencies.find(crypto => crypto.name == name)?.price;

  const onChangeQuantity = (name, newQuantity) => {
    setQuantities({
      ...quantities,
      [name]: {
        newQuantity: Number(newQuantity),
        price: getPrice(name),
      },
    });
  };

  useEffect(() => {
    let items = {};
    dataFromCsv.map(item => {
      const name = Object.keys(item);
      const quantity = item[name];

      items[name] = {
        newQuantity: quantity,
        price: getPrice(name),
      };
    });
    setQuantities(items);
  }, [dataFromCsv]);

  const moveOwnedCryptosToTop = () => {
    const cryptosWithQuantity = cryptoCurrencies.filter(
      crypto => quantities[crypto.name]
    );
    cryptosWithQuantity.sort(
      (a, b) =>
        b.price * quantities[b.name].newQuantity -
        a.price * quantities[a.name].newQuantity
    );
    const cryptosWithoutQuantity = cryptoCurrencies.filter(
      crypto => !quantities[crypto.name]
    );
    return [...cryptosWithQuantity, ...cryptosWithoutQuantity];
  };

  const resetQuantities = () => {
    setQuantities({});
  };

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    setShowQuantityInput(false);
  };

  const onEditIconClick = async name => {
    await setShowQuantityInput({
      [name]: !showQuantityInput[name],
    });
    await document.getElementById('quantity-owned-input').focus();
  };

  useEffect(() => {
    setSortedCryptoCurrencies(moveOwnedCryptosToTop());
  }, [cryptoCurrencies, quantities]);

  useEffect(() => {
    handleItemInLocalStorage(setQuantities, 'quantities');
  }, []);

  useEffect(() => {
    setItemInLocalStorage('quantities', quantities);
  }, [quantities]);

  useEffect(() => {
    const totalSum = Object.values?.(quantities).reduce(
      (acc, crypto) => acc + crypto.newQuantity * crypto.price,
      0
    );
    setTotalWalletValue(totalSum);
  }, [quantities, cryptoCurrencies]);

  const csvData = Object.keys(quantities)?.map(quantity => {
    return [...[quantity], quantities[quantity].newQuantity];
  });

  return (
    <>
      <CsvReader classes={classes} setDataFromCsv={setDataFromCsv} />
      <IconButton
        sx={{ margin: '0 4px 0 6px' }}
        aria-label='Reset all quantities'
        onClick={resetQuantities}
      >
        <DeleteSweepIcon />
      </IconButton>
      <IconButton className={classes.csvButton} aria-label='Download CSV'>
        <CSVLink
          filename={`crypto-wallet-${new Intl.DateTimeFormat('en-US').format(
            Date.now()
          )}.csv`}
          className={classes.csvIcon}
          data={csvData}
        >
          <DownloadIcon />
        </CSVLink>
      </IconButton>
      {totalWalletValue > 0 && (
        <Typography className={classes.totalWalletValue} variant='h5'>
          {currencyFormatter.format(totalWalletValue)}
        </Typography>
      )}
      <List className={classes.root}>
        {sortedCryptoCurrencies?.map(crypto => {
          const { name, originalQuantity } = crypto;
          const quantityOwned = quantities[name]?.newQuantity ?? originalQuantity;

          return (
            <div key={name}>
              <Accordion
                classes={{ root: classes.row }}
                expanded={expanded === name}
                onChange={handleChange(name)}
                square
              >
                <CollapsedContent
                  quantityOwned={quantityOwned}
                  showQuantityInput={showQuantityInput}
                  setShowQuantityInput={setShowQuantityInput}
                  onChangeQuantity={onChangeQuantity}
                  classes={classes}
                  crypto={crypto}
                />
                <ExpandedContent
                  quantityOwned={quantityOwned}
                  classes={classes}
                  crypto={crypto}
                  onEditIconClick={onEditIconClick}
                />
              </Accordion>
            </div>
          );
        })}
      </List>
    </>
  );
};

export default Row;
