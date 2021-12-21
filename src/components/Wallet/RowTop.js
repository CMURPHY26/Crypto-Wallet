import { Icon } from '@material-ui/core';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import { currencyFormatter } from '../../helpers/formatters';

const RowTop = ({
  crypto,
  classes,
  quantityOwned,
  showQuantityInput,
  onChangeQuantity,
}) => {
  return (
    <AccordionSummary
      classes={{
        content: classes.summary,
        expandIcon: classes.expandIcon,
        collapseIcon: classes.collapseIcon,
      }}
      expandIcon={<ExpandMoreIcon />}
      id={`${crypto.name}-header`}
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
            primary={crypto.name}
            secondary={currencyFormatter.format(crypto.price)}
          />
          <ListItemText
            className={classes.originalQuantity}
            primary={new Intl.NumberFormat('en-US', {
              maximumSignificantDigits: 7,
            }).format(quantityOwned)}
            secondary={currencyFormatter.format(quantityOwned * crypto.price)}
          />
          {showQuantityInput[crypto.name] && (
            <TextField
              id='quantity-owned-input'
              type='number'
              label={crypto.symbol}
              InputProps={{ inputProps: { min: 0 } }}
              InputLabelProps={{ shrink: true }}
              classes={{ root: classes.amountTextField }}
              onChange={e => onChangeQuantity(crypto.name, e.target.value)}
              onClick={e => e.stopPropagation()}
            />
          )}
        </>
      </ListItem>
    </AccordionSummary>
  );
};

export default RowTop;