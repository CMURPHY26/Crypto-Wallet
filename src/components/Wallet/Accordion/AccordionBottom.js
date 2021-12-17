import { IconButton } from "@material-ui/core";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import StoreIcon from "@material-ui/icons/Store";
import React from "react";
import { abbreviateCurrency, formatPercentChangeOverTime } from "../../../helpers/formatters";

const AccordionBottom = ({ crypto, classes, onEditIconClick }) => {
  const {
    marketCap,
    circulatingSupply,
    maxSupply = "N/A",
    percentChange1hour,
    percentChange24hours,
    percentChange1week,
  } = crypto.extraDetails;

  return (
    <AccordionDetails>
      <List className={classes.detailsList}>
        <ListItem>
          <ListItemText
            primary="Market Cap"
            secondary={"$" + abbreviateCurrency(marketCap)}
            classes={{ root: classes.dropdowncryptoCurrencies }}
          />
          <ListItemText
            primary="Circulating Supply"
            secondary={abbreviateCurrency(circulatingSupply)}
            classes={{ root: classes.dropdowncryptoCurrencies }}
          />
          <ListItemText
            primary="Max Supply"
            secondary={abbreviateCurrency(maxSupply)}
            classes={{ root: classes.dropdowncryptoCurrencies }}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="1 Hour"
            secondary={formatPercentChangeOverTime(percentChange1hour)}
            classes={{ root: classes.dropdowncryptoCurrencies }}
          />
          <ListItemText
            primary="24 Hours"
            secondary={formatPercentChangeOverTime(percentChange24hours)}
            classes={{ root: classes.dropdowncryptoCurrencies }}
          />
          <ListItemText
            primary="1 Week"
            secondary={formatPercentChangeOverTime(percentChange1week)}
            classes={{ root: classes.dropdowncryptoCurrencies }}
          />
        </ListItem>
        <Divider />
        <div className={classes.buttonsContainer}>
          <IconButton target="_blank" href={`https://www.coinbase.com/price/${crypto.displayName}`}>
            <StoreIcon />
          </IconButton>
          <IconButton>
            <EditRoundedIcon onClick={() => onEditIconClick(crypto.displayName)} />
          </IconButton>
        </div>
      </List>
    </AccordionDetails>
  );
};

export default AccordionBottom;
