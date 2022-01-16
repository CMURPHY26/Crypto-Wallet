import { Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import List from '@mui/material/List';
import React, { useEffect, useState } from 'react';
import { useRowStyles } from '../../helpers/styles';
import { handleItemInLocalStorage, setItemInLocalStorage } from '../../helpers/utils';
import CollapsedContent from './CollapsedContent';
import ExpandedContent from './ExpandedContent';

const Row = ({
  cryptoCurrencies,
  quantities,
  setQuantities,
  setVisibleCoins,
  visibleCoins,
}) => {
  const classes = useRowStyles();
  const [showQuantityInput, setShowQuantityInput] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [totalWalletValue, setTotalWalletValue] = useState(0);
  const [showAllCoins, setShowAllCoins] = useState(true);
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

  const moveOwnedCryptosToTop = () => {
    const displayedCryptos = cryptoCurrencies.filter(crypto => !!crypto.visible);
    const cryptosWithQuantity = displayedCryptos.filter(
      crypto => quantities[crypto.name]
    );
    cryptosWithQuantity.sort(
      (a, b) =>
        b.price * quantities[b.name].newQuantity -
        a.price * quantities[a.name].newQuantity
    );
    const cryptosWithoutQuantity = displayedCryptos.filter(
      crypto => !quantities[crypto.name]
    );
    return [...cryptosWithQuantity, ...cryptosWithoutQuantity];
  };

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    setShowQuantityInput(false);
  };

  const onEditIconClick = async name => {
    await setShowQuantityInput({
      [name]: !showQuantityInput[name],
    });
    document.getElementById('quantity-owned-input').focus();
  };

  const toggleCoinVisibility = name => {
    setVisibleCoins({
      ...visibleCoins,
      [name]: !cryptoCurrencies.find(crypto => crypto.name === name).visible,
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
      {/* {totalWalletValue > 0 && (
        <Typography className={classes.totalWalletValue} variant='h5'>
          {currencyFormatter.format(totalWalletValue)}
        </Typography>
      )} */}
      <Button variant='contained' onClick={() => setShowAllCoins(!showAllCoins)}>
        Toggle Displayed Coins
      </Button>
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
                  visibleCoins={visibleCoins}
                  toggleCoinVisibility={toggleCoinVisibility}
                  showAllCoins={showAllCoins}
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
