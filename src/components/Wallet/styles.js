import { makeStyles } from '@mui/styles';

export const useAccordionStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 700,
    margin: '0 auto',
  },
  avatar: {
    backgroundColor: 'transparent',
    marginRight: 16,
  },
  originalQuantity: {
    textAlign: 'right',
  },
  icon: {
    width: 40,
    height: 40,
  },
  avatarLetters: {
    marginRight: 16,
  },
  quantityTextField: {
    width: 110,
    marginLeft: 30,
  },
  dropdowncryptoCurrencies: {
    flex: 1,
  },
  editIcon: {
    opacity: 0,
    width: 17,
    height: 17,
    position: 'absolute',
    top: 5,
    right: 5,
    fill: 'grey',
    '&:hover': {
      opacity: 1,
      transition: 'opacity 0.5s',
    },
  },
  summary: {
    margin: 0,
  },
  detailsList: {
    width: '100%',
  },
  row: {
    justifyContent: 'space-between',
    borderRadius: 0,
    '&:hover': {
      cursor: 'pointer',
      transition: 'background-color ease .25s',
    },
  },
  totalWalletValue: {
    maxWidth: 700,
    margin: '0 auto',
    textAlign: 'right',
  },
  buttonsContainer: {
    marginTop: 20,
  },
  button: {
    marginRight: 20,
    width: 100,
  },
  csvIcon: {
    color: 'inherit',
    display: 'inherit',
    marginTop: 2,
  },
  quantityIcons: {
    display: 'flex',
    flexDirection: 'column',
    transform: 'scale(.8)',
    color: 'grey',
    '& svg': {
      width: 20,
      height: 18,
      margin: 0,
      '&:hover': {
        opacity: 0.5,
      },
    },
  },
}));
