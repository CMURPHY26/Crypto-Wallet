import Icon from '@mui/material/Icon';
import AccordionSummary from '@mui/material/AccordionSummary';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import React, { useState } from 'react';
import { currencyFormatter } from '../../helpers/utils';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';

const RowTop = ({
  crypto,
  classes,
  quantityOwned,
  showQuantityInput,
  onChangeQuantity,
}) => {
  const [quantityAction, setQuantityAction] = useState(null);

  const updateQuantity = newQuantity => {
    if (quantityAction === 'add') {
      return Number(quantityOwned) + Number(newQuantity);
    } else if (quantityAction === 'subtract') {
      return Number(quantityOwned) - Number(newQuantity);
    } else {
      return Number(newQuantity);
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
                <InputLabel htmlFor='input-with-icon-adornment'>
                  {crypto.symbol}
                </InputLabel>
                <Input
                  id='quantity-owned-input'
                  variant='standard'
                  type='number'
                  label={crypto.symbol}
                  InputProps={{
                    min: 0,
                  }}
                  InputLabelProps={{ shrink: true }}
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
              </div>
            </>
          )}
        </>
      </ListItem>
    </AccordionSummary>
  );
};

export default RowTop;
