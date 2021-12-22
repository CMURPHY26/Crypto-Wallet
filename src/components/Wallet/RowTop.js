import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RemoveIcon from '@mui/icons-material/Remove';
import AccordionSummary from '@mui/material/AccordionSummary';
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import Icon from '@mui/material/Icon';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React, { useState } from 'react';
import { currencyFormatter } from '../../helpers/utils';

const RowTop = ({
  crypto,
  classes,
  quantityOwned,
  showQuantityInput,
  setShowQuantityInput,
  onChangeQuantity,
}) => {
  const [quantityAction, setQuantityAction] = useState('add');

  const updateQuantity = newQuantity => {
    quantityOwned = Number(quantityOwned);
    newQuantity = Number(newQuantity);

    if (quantityAction === 'add') {
      return quantityOwned + newQuantity;
    } else if (quantityAction === 'subtract') {
      return quantityOwned - newQuantity;
    } else {
      return newQuantity;
    }
  };

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
            <>
              <FormControl
                classes={{ root: classes.quantityTextField }}
                variant='standard'
              >
                <InputLabel htmlFor='quantity-owned-input'>{crypto.symbol}</InputLabel>
                <Input
                  id='quantity-owned-input'
                  variant='standard'
                  type='number'
                  label={crypto.symbol}
                  onBlur={e =>
                    onChangeQuantity(crypto.name, updateQuantity(e.target.value))
                  }
                  onClick={e => e.stopPropagation()}
                  startAdornment={
                    <InputAdornment position='start'>
                      {quantityAction === 'add' ? <AddIcon /> : <RemoveIcon />}
                    </InputAdornment>
                  }
                />
              </FormControl>
              <div className={classes.quantityIcons}>
                <AddIcon
                  onClick={e => {
                    e.stopPropagation();
                    setQuantityAction('add');
                  }}
                />
                <RemoveIcon
                  onClick={e => {
                    e.stopPropagation();
                    setQuantityAction('subtract');
                  }}
                />
                <CheckIcon
                  onClick={e => {
                    e.stopPropagation();
                    setShowQuantityInput(false);
                  }}
                />
              </div>
            </>
          )}
        </>
      </ListItem>
    </AccordionSummary>
  );
};

export default RowTop;
