import React from 'react';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import {
  makeStyles,
  createStyles,
  Theme,
  withStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: 70,
      padding: 5,
      // marginBottom:10
    },
    button: {
      margin: theme.spacing(1),
    },
    inputField: { margin: theme.spacing(1), minWidth: 100, maxWidth: 150 },
  })
);
export const StyledMenu = withStyles({
  paper: {
    border: '1px solid grey',
    margin: 3,
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));
