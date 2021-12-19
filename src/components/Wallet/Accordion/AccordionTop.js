import { Icon } from '@material-ui/core';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import { currencyFormatter } from '../../../helpers/formatters';

const AccordionTop = ({ crypto, classes, trueAmountOwned, showQuantityInput, onChangeAmount }) => {
  return (
    <AccordionSummary
      classes={{
        content: classes.summary,
        expandIcon: classes.expandIcon,
        collapseIcon: classes.collapseIcon,
      }}
      expandIcon={<ExpandMoreIcon />}
      id={`${crypto.displayName}-header`}
    >
      <ListItem className={classes.listItemTop}>
        {crypto.icon && (
          <Avatar className={classes.avatar}>
            <Icon className={classes.icon}>{crypto.icon}</Icon>
          </Avatar>
        )}
        {crypto.abbr && <Avatar className={classes.avatarLetters}>{crypto.abbr}</Avatar>}
        <>
          <ListItemText
            primary={crypto.displayName}
            secondary={currencyFormatter.format(crypto.currentValue)}
          />
          <ListItemText
            className={classes.amountOwned}
            primary={new Intl.NumberFormat('en-US', {
              maximumSignificantDigits: 7,
            }).format(trueAmountOwned)}
            secondary={currencyFormatter.format(trueAmountOwned * crypto.currentValue)}
          />
          {showQuantityInput[crypto.displayName] && (
            <TextField
              id='amount-owned-input'
              type='number'
              label={crypto.symbol}
              InputProps={{ inputProps: { min: 0 } }}
              InputLabelProps={{ shrink: true }}
              classes={{ root: classes.amountTextField }}
              onChange={e => onChangeAmount(crypto.displayName, e.target.value)}
            />
          )}
        </>
      </ListItem>
    </AccordionSummary>
  );
};

export default AccordionTop;
