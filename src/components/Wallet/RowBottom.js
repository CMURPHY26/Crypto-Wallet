import EditIcon from '@mui/icons-material/Edit';
import StoreIcon from '@mui/icons-material/Store';
import AccordionDetails from '@mui/material/AccordionDetails';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { abbreviateNumber, formatPercentChangeOverTime } from '../../helpers/utils';

const RowBottom = ({ crypto, classes, onEditIconClick }) => {
  const {
    marketCap,
    circulatingSupply,
    maxSupply,
    percentChange1hour,
    percentChange1day,
    percentChange1week,
  } = crypto.extraDetails;

  return (
    <AccordionDetails>
      <List className={classes.detailsList}>
        <ListItem>
          <ListItemText
            primary='Market Cap'
            secondary={'$' + abbreviateNumber(marketCap)}
            classes={{ root: classes.dropdowncryptoCurrencies }}
          />
          <ListItemText
            primary='Circulating Supply'
            secondary={abbreviateNumber(circulatingSupply)}
            classes={{ root: classes.dropdowncryptoCurrencies }}
          />
          <ListItemText
            primary='Max Supply'
            secondary={abbreviateNumber(maxSupply)}
            classes={{ root: classes.dropdowncryptoCurrencies }}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary='1 Hour'
            secondary={formatPercentChangeOverTime(percentChange1hour)}
            classes={{ root: classes.dropdowncryptoCurrencies }}
          />
          <ListItemText
            primary='24 Hours'
            secondary={formatPercentChangeOverTime(percentChange1day)}
            classes={{ root: classes.dropdowncryptoCurrencies }}
          />
          <ListItemText
            primary='1 Week'
            secondary={formatPercentChangeOverTime(percentChange1week)}
            classes={{ root: classes.dropdowncryptoCurrencies }}
          />
        </ListItem>
        <Divider />
        <div className={classes.buttonsContainer}>
          <IconButton
            target='_blank'
            aria-label='Buy on Coinbase'
            href={`https://www.coinbase.com/price/${crypto.name}`}
          >
            <StoreIcon />
          </IconButton>
          <IconButton
            aria-label='Edit quantity'
            onClick={() => onEditIconClick(crypto.name)}
          >
            <EditIcon />
          </IconButton>
        </div>
      </List>
    </AccordionDetails>
  );
};

export default RowBottom;
