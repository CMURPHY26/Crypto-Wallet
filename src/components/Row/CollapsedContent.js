import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import Avatar from '@mui/material/Avatar';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { currencyFormatter } from '../../helpers/utils';
import QuantityForm from './QuantityForm';

const CollapsedContent = ({
  classes,
  crypto,
  onChangeQuantity,
  quantityOwned,
  setShowQuantityInput,
  showCoinToggler,
  showQuantityInput,
  toggleCoinVisibility,
}) => {
  return (
    <AccordionSummary
      classes={{ content: classes.summary }}
      expandIcon={<ExpandMoreIcon />}
      id={`${crypto.name}-header`}
    >
      <ListItem>
        {showCoinToggler && (
          <IconButton
            onClick={e => {
              e.stopPropagation();
              toggleCoinVisibility(crypto.name);
            }}
          >
            <CheckCircleOutlineIcon />
          </IconButton>
        )}
        {crypto.icon && (
          <Avatar className={classes.avatar}>
            <Icon className={classes.avatarIcon}>{crypto.icon}</Icon>
          </Avatar>
        )}
        <>
          <ListItemText
            sx={{ textAlign: 'left' }}
            primary={crypto.name}
            secondary={currencyFormatter.format(crypto.price)}
          />
          <ListItemText
            sx={{ textAlign: 'right' }}
            primary={new Intl.NumberFormat('en-US', {
              maximumSignificantDigits: 7,
            }).format(quantityOwned)}
            secondary={currencyFormatter.format(quantityOwned * crypto.price)}
          />
          {showQuantityInput[crypto.name] && (
            <QuantityForm
              crypto={crypto}
              setShowQuantityInput={setShowQuantityInput}
              onChangeQuantity={onChangeQuantity}
              quantityOwned={quantityOwned}
            />
          )}
        </>
      </ListItem>
    </AccordionSummary>
  );
};

export default CollapsedContent;
