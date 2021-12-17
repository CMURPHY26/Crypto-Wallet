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
  const [changedAmounts, setChangedAmounts] = useState({});
  const [showQuantityInput, setShowQuantityInput] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [totalWalletValue, setTotalWalletValue] = useState(0);

  const onChangeAmount = (name, newAmount, totalValue) => {
    setChangedAmounts({
      ...changedAmounts,
      [name]: {
        newAmount,
        totalValue,
      },
    });
  };

  useEffect(() => {
    if (changedAmounts !== {}) {
      const totalSum = Object.values(changedAmounts).reduce((s, a) => s + a.totalValue, 0);

      setTotalWalletValue(totalSum);
    }
  }, [changedAmounts]);

  const resetAmounts = () => {
    setChangedAmounts({});
  };

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    try {
      if ("changedAmounts" in localStorage) {
        setChangedAmounts(JSON.parse(localStorage.getItem("changedAmounts")));
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("changedAmounts", JSON.stringify(changedAmounts));
    } catch (e) {
      console.log(e);
    }
  }, [changedAmounts]);

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

  return (
    <>
      <IconButton onClick={resetAmounts}>
        <DeleteSweepIcon />
      </IconButton>
      {totalWalletValue > 0 && (
        <Typography className={classes.totalWalletValue} variant="h5">
          {currencyFormatter.format(totalWalletValue)}
        </Typography>
      )}
      <List className={classes.root}>
        {cryptoCurrencies?.map(crypto => {
          const { displayName, amountOwned } = crypto;
          const trueAmountOwned = changedAmounts[displayName]
            ? changedAmounts[displayName].newAmount
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
                  onChangeAmount={onChangeAmount}
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
