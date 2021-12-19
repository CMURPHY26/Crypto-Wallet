import { IconButton, Typography } from "@material-ui/core";
import { default as MuiAccordion } from "@material-ui/core/Accordion";
import List from "@material-ui/core/List";
import { darken, makeStyles } from "@material-ui/core/styles";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import React, { useEffect, useState } from "react";
import { currencyFormatter } from "../../../helpers/formatters";
import AccordionBottom from "./AccordionBottom";
import AccordionTop from "./AccordionTop";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 700,
    margin: "0 auto",
    backgroundColor: theme.palette.background.paper,
  },
  avatar: {
    backgroundColor: "transparent",
    marginRight: 16,
  },
  listItemTop: {},
  amountOwned: {
    textAlign: "right",
  },
  icon: {
    width: 40,
    height: 40,
  },
  avatarLetters: {
    marginRight: 16,
  },
  amountTextField: {
    width: 75,
    marginLeft: 30,
  },
  dropdowncryptoCurrencies: {
    flex: 1,
  },
  editIcon: {
    opacity: 0,
    width: 17,
    height: 17,
    position: "absolute",
    top: 5,
    right: 5,
    fill: theme.palette.grey,
    "&:hover": {
      opacity: 1,
      transition: "opacity 0.5s",
    },
  },
  summary: {
    margin: 0,
  },
  detailsList: {
    width: "100%",
  },
  accordion: {
    justifyContent: "space-between",
    borderRadius: 0,
    "&:hover": {
      backgroundColor: darken(theme.palette.background.paper, 0.07),
      cursor: "pointer",
      transition: "background-color ease .25s",
    },
  },
  totalWalletValue: {
    maxWidth: 700,
    margin: "0 auto",
    textAlign: "right",
  },
  buttonsContainer: {
    marginTop: 20,
  },
  button: {
    marginRight: 20,
    width: 100,
  },
}));

const Accordion = ({ cryptoCurrencies }) => {
  const classes = useStyles();
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
        price: cryptoCurrencies.find(crypto => crypto.displayName === name)?.price,
      },
    });
  };

  const moveOwnedCryptosToTop = () => {
    let cryptosWithQuantity = cryptoCurrencies.filter(crypto => quantities[crypto.displayName] );
    cryptosWithQuantity.sort((a, b) => {
      return b.price * quantities[b.displayName].newQuantity - a.price * quantities[a.displayName].newQuantity;
    });
    const cryptosWithoutQuantity = cryptoCurrencies.filter(crypto => !quantities[crypto.displayName] );
    return [...cryptosWithQuantity, ...cryptosWithoutQuantity];
  };

  const resetAmounts = () => {
    setQuantities({});
  };

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const onEditIconClick = displayName => {
    if (showQuantityInput[displayName]) {
      setShowQuantityInput({
        [displayName]: false,
      });
    } else {
      setShowQuantityInput({
        [displayName]: true,
      });
    }
  };

  useEffect(() => {
    setSortedCryptoCurrencies(moveOwnedCryptosToTop());
  }, [cryptoCurrencies, quantities]);

  useEffect(() => {
    const totalSum = Object.values?.(quantities).reduce(
      (acc, crypto) => acc + crypto.newQuantity * crypto.price,
      0
    );
    setTotalWalletValue(totalSum);
  }, [quantities, cryptoCurrencies]);

  useEffect(() => {
    try {
      if ("quantities" in localStorage) {
        setQuantities(JSON.parse(localStorage.getItem("quantities")));
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("quantities", JSON.stringify(quantities));
    } catch (e) {
      console.log(e);
    }
  }, [quantities]);

  return (
    <>
      <IconButton onClick={resetAmounts} >
        <DeleteSweepIcon />
      </IconButton>
      {totalWalletValue > 0 && (
        <Typography className={classes.totalWalletValue} variant="h5">
          {currencyFormatter.format(totalWalletValue)}
        </Typography>
      )}
      <List className={classes.root}>
        {sortedCryptoCurrencies?.map(crypto => {
          const { displayName, amountOwned } = crypto;
          const trueAmountOwned = quantities[displayName]
            ? quantities[displayName].newQuantity
            : amountOwned;

          return (
            <div key={displayName}>
              <MuiAccordion
                classes={{ root: classes.accordion }}
                expanded={expanded === displayName}
                onChange={handleChange(displayName)}
                square
              >
                <AccordionTop
                  trueAmountOwned={trueAmountOwned}
                  showQuantityInput={showQuantityInput}
                  onChangeQuantity={onChangeQuantity}
                  classes={classes}
                  crypto={crypto}
                />
                <AccordionBottom
                  trueAmountOwned={trueAmountOwned}
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
