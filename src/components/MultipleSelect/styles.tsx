import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
  })
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  // anchorEl: () => {
  //   return {
  //     anchorOrigin: {
  //       vertical: 'bottom',
  //       horizontal: 'center',
  //     },
  //     transformOrigin: {
  //       vertical: 'top',
  //       horizontal: 'center',
  //     },
  //   };
  // },
};

export { useStyles, MenuProps };
