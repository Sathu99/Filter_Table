import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MultipleSelect from '../MultipleSelect/MultipleSelect';
import { TextField } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import { FilterType } from '../Table/table';
import { act } from './data';
import { StyledMenu, useStyles } from './styles';
import { Column } from '../Table/data';

export type Threetype = {
  filterFields: FilterType;
  filterableCol: Column[];
  handleFilter: (value: FilterType) => void;
};

const Filter = (props: Threetype) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const col: string[] = props.filterableCol.map((column) => {
    return column.label;
  });
  const handleAct = (event: React.ChangeEvent<{ value: unknown }>): void => {
    props.handleFilter({
      ...props.filterFields,
      actions: event.target.value as string,
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e: unknown,reason:string) => {
    console.log(e,reason);

    props.handleFilter({
      columns: [],
      actions: '',
      value: '',
    });
    setAnchorEl(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.handleFilter({
      ...props.filterFields,
      value: event.target.value as string,
    });
  };
  console.log(props);

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
              <TextField
                select
                label="Actions"
                onChange={handleAct}
                value={props.filterFields.actions}
                className={classes.inputField}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="" disabled></option>
                {act.map((ac, index) => (
                  <option key={index} value={ac.toLowerCase()}>
                    {ac}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item lg>
              <TextField
                id="standard-basic"
                label="Value"
                className={classes.inputField}
                onChange={handleChange}
                value={props.filterFields.value}
              />
            </Grid>
          </Grid>
        </div>
      </StyledMenu>
    </div>
  );
};

export default Filter;
