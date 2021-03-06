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

const ExpandedContent = ({ classes, crypto, onEditIconClick }) => {
  const {
    circulatingSupply,
    marketCap,
    maxSupply,
    percentChange1hour,
    percentChange1day,
    percentChange1week,
  } = crypto.extraDetails;

  return (
    <AccordionDetails>
      <List sx={{ width: '100%' }}>
        <ListItem>
          <ListItemText
            primary='Market Cap'
            secondary={'$' + abbreviateNumber(marketCap)}
            sx={{ flex: 1 }}
          />
          <ListItemText
            primary='Circulating Supply'
            secondary={abbreviateNumber(circulatingSupply)}
            sx={{ flex: 1 }}
          />
          <ListItemText
            primary='Max Supply'
            secondary={abbreviateNumber(maxSupply)}
            sx={{ flex: 1 }}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary='1 Hour'
            secondary={formatPercentChangeOverTime(percentChange1hour)}
            sx={{ flex: 1 }}
          />
          <ListItemText
            primary='24 Hours'
            secondary={formatPercentChangeOverTime(percentChange1day)}
            sx={{ flex: 1 }}
          />
          <ListItemText
            primary='1 Week'
            secondary={formatPercentChangeOverTime(percentChange1week)}
            sx={{ flex: 1 }}
          />
        </ListItem>
        <Divider />
        <div className={classes.buttonsContainer}>
          <IconButton
            target='_blank'
            aria-label='Buy on Coinbase'
            href={`https://www.coinbase.com/price/${crypto.name.toLowerCase()}`}
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

export default ExpandedContent;
