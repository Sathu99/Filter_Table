import React from 'react';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  })
);

const ColumnsAct = () => {
  const classes = useStyles();

  return (
    <div>
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<ViewColumnIcon />}
      >
        Columns
      </Button>
    </div>
  );
};
export default ColumnsAct;
