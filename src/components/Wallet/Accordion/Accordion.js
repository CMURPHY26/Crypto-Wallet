import { IconButton, Typography } from '@material-ui/core';
import { default as MuiAccordion } from '@material-ui/core/Accordion';
import List from '@material-ui/core/List';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import React, { useEffect, useState } from 'react';
import { currencyFormatter } from '../../../helpers/formatters';
import { useAccordionStyles } from './styles';
import AccordionBottom from './AccordionBottom';
import AccordionTop from './AccordionTop';
import {
  handleItemInLocalStorage,
  setItemInLocalStorage,
} from '../../../helpers/localStorage';

const Accordion = ({ cryptoCurrencies }) => {
  const classes = useAccordionStyles();
  const [quantities, setQuantities] = useState({});
  const [showQuantityInput, setShowQuantityInput] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [totalWalletValue, setTotalWalletValue] = useState(0);
  const [sortedCryptoCurrencies, setSortedCryptoCurrencies] = useState(cryptoCurrencies);

  const onChangeQuantity = (name, newQuantity) => {
    setQuantities({
      ...quantities,
      [name]: {
        newQuantity: Number(newQuantity),
        price: cryptoCurrencies.find(crypto => crypto.name === name)?.price,
      },
    });
  };

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

  const resetAmounts = () => {
    setQuantities({});
  };

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const onEditIconClick = name => {
    setShowQuantityInput({
      [name]: !showQuantityInput[name],
    });
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

  return (
    <>
      <IconButton onClick={resetAmounts}>
        <DeleteSweepIcon />
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
              <MuiAccordion
                classes={{ root: classes.accordion }}
                expanded={expanded === name}
                onChange={handleChange(name)}
                square
              >
                <AccordionTop
                  quantityOwned={quantityOwned}
                  showQuantityInput={showQuantityInput}
                  onChangeQuantity={onChangeQuantity}
                  classes={classes}
                  crypto={crypto}
                />
                <AccordionBottom
                  quantityOwned={quantityOwned}
                  classes={classes}
                  crypto={crypto}
                  onEditIconClick={onEditIconClick}
                />
              </MuiAccordion>
            </div>
          );
        })}
      </List>
    </>
  );
};

export default Accordion;
