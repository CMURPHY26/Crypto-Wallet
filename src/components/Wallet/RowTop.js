import Icon from '@mui/material/Icon';
import AccordionSummary from '@mui/material/AccordionSummary';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import { currencyFormatter } from '../../helpers/utils';

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
              variant='standard'
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
