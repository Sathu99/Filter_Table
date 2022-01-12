import React from 'react';
import Button from '@material-ui/core/Button';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import List from '@material-ui/core/List';
import Dialog from '@material-ui/core/Dialog';
import { Checkbox, ListItem, ListItemText } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Column } from '../Table/data';
import { allColumns } from './data';
import { StyledDialogTitle, useStyles } from './styles';

export type ColumnsShowProps = {
  options: Column[];
  handleSelect: (selCol: string[]) => void;
};

const ColumnsShowProps = (props: ColumnsShowProps) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState<string[]>(allColumns);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    props.handleSelect(newChecked);
    setChecked(newChecked);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event?: object, reason?: string) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<ViewColumnIcon />}
        onClick={handleClickOpen}
      >
        Columns
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <StyledDialogTitle id="simple-dialog-title" onClose={handleClose}>
          Select Columns
        </StyledDialogTitle>
        <List className={classes.root}>
          {props.options.map((value) => {
            const labelId = `checkbox-list-label-${value.id}`;

            return (
              <ListItem
                key={value.id}
                role={undefined}
                dense
                button
                onClick={handleToggle(value.id)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value.id) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value.label} />
              </ListItem>
            );
          })}
        </List>
      </Dialog>
    </div>
  );
};
export default ColumnsShowProps;
