import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { useStyles } from './styles';
import { FilterType } from '../Table/table';

export type SelectTypes = {
  lable: string;
  options: string[];
  filterFields: FilterType;
  handleFilter: (value: FilterType) => void;
};

const MultipleSelect = (props: SelectTypes) => {
  const classes = useStyles();
  const inputObj: { [key: string]: string[] } = {};

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    inputObj[props.lable.toLowerCase()] = event.target.value as string[];
    props.handleFilter({ ...props.filterFields, ...inputObj });
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">{props.lable}</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={props.filterFields.columns}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => (selected as string[]).join(', ')}
          // MenuProps={MenuProps}
        >
          {props.options.map((colName) => (
            <MenuItem key={colName.toLowerCase()} value={colName.toLowerCase()}>
              <Checkbox
                checked={
                  props.filterFields.columns.indexOf(colName.toLowerCase()) > -1
                }
              />
              <ListItemText primary={colName} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultipleSelect;
