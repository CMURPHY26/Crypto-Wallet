import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import Icon from '@mui/material/Icon';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { currencyFormatter } from '../../helpers/utils';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import IconButton from '@mui/material/IconButton';

const CollapsedContent = ({
  crypto,
  classes,
  quantityOwned,
  showQuantityInput,
  setShowQuantityInput,
  onChangeQuantity,
  toggleCoinVisibility,
  showAllCoins,
}) => {
  const updateQuantity = inputValue => {
    quantityOwned = Number(quantityOwned);

    if (inputValue.includes('+')) {
      return Number(quantityOwned) + Number(inputValue.replace('+', ''));
    } else if (inputValue.includes('-')) {
      return Number(quantityOwned) - Number(inputValue.replace('-', ''));
    } else {
      return inputValue;
    }
  };

  const onChange = e => {
    e.target.value.length &&
      onChangeQuantity(crypto.name, updateQuantity(e.target.value));
    setShowQuantityInput(false);
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
        {showAllCoins && (
          <IconButton
            sx={{ margin: '0 4px 0 6px' }}
            onClick={() => toggleCoinVisibility(crypto.name)}
          >
            <CheckCircleOutlineIcon />
          </IconButton>
        )}
        {crypto.icon && (
          <Avatar className={classes.avatar}>
            <Icon className={classes.icon}>{crypto.icon}</Icon>
          </Avatar>
        )}
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
                  onBlur={e => onChange(e)}
                  onKeyDown={e => e.key === 'Enter' && onChange(e)}
                  onClick={e => e.stopPropagation()}
                />
              </FormControl>
            </>
          )}
        </>
      </ListItem>
    </AccordionSummary>
  );
};

export default CollapsedContent;
