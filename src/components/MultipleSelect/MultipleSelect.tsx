import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { MenuProps, useStyles } from './styles';
import { FilterType } from '../Table/table';

export type SelectTypes = {
  lable: string;
  options: string[];
  filterFields: FilterType;
  handleFilter: (value: FilterType) => void;
};

const MultipleSelect = (props: SelectTypes) => {
  const classes = useStyles();
  const [personName, setPersonName] = React.useState<string[]>([]);
  const inputObj: { [key: string]: string[] } = {};

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPersonName(event.target.value as string[]);
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
          value={personName}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => (selected as string[]).join(', ')}
          MenuProps={MenuProps}
        >
          {props.options.map((name) => (
            <MenuItem key={name.toLowerCase()} value={name.toLowerCase()}>
              <Checkbox checked={personName.indexOf(name.toLowerCase()) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultipleSelect;
