import { Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import List from '@mui/material/List';
import React, { useEffect, useState } from 'react';
import { useStyles } from '../../helpers/styleOverrides';
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
  const classes = useStyles();
  const [showQuantityInput, setShowQuantityInput] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [totalWalletValue, setTotalWalletValue] = useState(0);
  const [showCoinToggler, setShowCoinToggler] = useState(false);
  const [sortedCryptoCurrencies, setSortedCryptoCurrencies] = useState(cryptoCurrencies);
  const getPrice = name => cryptoCurrencies.find(crypto => crypto.name == name)?.price;

  useEffect(() => {
    const totalSum = Object.values?.(quantities).reduce(
      (acc, crypto) => acc + crypto.newQuantity * crypto.price,
      0
    );
    setTotalWalletValue(totalSum);
    setSortedCryptoCurrencies(moveOwnedCryptosToTop());
  }, [cryptoCurrencies, quantities]);

  useEffect(() => {
    handleItemInLocalStorage(setQuantities, 'quantities');
  }, []);

  useEffect(() => {
    setItemInLocalStorage('quantities', quantities);
  }, [quantities]);

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

  return (
    <>
      <Button variant='contained' onClick={() => setShowCoinToggler(!showCoinToggler)}>
        Toggle Coins
      </Button>
      <List sx={{ width: '100%', maxWidth: 700, margin: '20px auto' }}>
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
                  classes={classes}
                  quantityOwned={quantityOwned}
                  showQuantityInput={showQuantityInput}
                  setShowQuantityInput={setShowQuantityInput}
                  onChangeQuantity={onChangeQuantity}
                  crypto={crypto}
                  visibleCoins={visibleCoins}
                  toggleCoinVisibility={toggleCoinVisibility}
                  showCoinToggler={showCoinToggler}
                />
                <ExpandedContent
                  classes={classes}
                  quantityOwned={quantityOwned}
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
