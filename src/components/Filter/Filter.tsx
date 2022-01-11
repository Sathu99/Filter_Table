import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MultipleSelect from '../MultipleSelect/MultipleSelect';
import { TextField } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import { FilterType } from '../Table/table';
import { act, col } from './data';
import { StyledMenu, useStyles } from './styles';

export type Threetype = {
  filterFields: FilterType;
  handleFilter: (value: FilterType) => void;
};

const Filter = (props: Threetype) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const classes = useStyles();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    props.handleFilter({
      columns: [],
      actions: [],
      value: '',
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.handleFilter({
      ...props.filterFields,
      value: event.target.value as string,
    });
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        variant="contained"
        color="default"
        className={classes.button}
        onClick={handleClick}
        startIcon={<FilterListIcon />}
      >
        Filter
      </Button>
      <StyledMenu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item lg>
              <MultipleSelect lable="Columns" {...props} options={col} />
            </Grid>
            <Grid item lg>
              <MultipleSelect lable="Actions" {...props} options={act} />
            </Grid>
            <Grid item lg>
              <TextField
                id="standard-basic"
                label="Value"
                className={classes.inputField}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </div>
      </StyledMenu>
    </div>
  );
};

export default Filter;
