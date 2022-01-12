import React, { MouseEvent, ChangeEvent } from 'react';
import {
  TableFooter,
  Toolbar,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  InputBase,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import TablePaginationActions from '../Pagination/TablePagination';
import { StyledTableCell, StyledTableRow, useStyles } from './styles';
import { Column, columns, OriginalRows, originalRows } from './data';
import Filter from '../Filter/Filter';
import ColumnsAct from '../Columns/Columns';
export type FilterType = {
  [key: string]: string | string[] | undefined;
  columns: string[];
  actions: string;
  value: string;
};

const StickyHeadTable = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState(originalRows);
  const [selectedCol, setSelectedCol] = React.useState<Column[]>(columns);
  const [filterFields, setFilterFields] = React.useState<FilterType>({
    columns: [],
    actions: '',
    value: '',
  } as FilterType);

  const handleChangePage =
    (): // event: MouseEvent<HTMLButtonElement> | unknown | null,
    // newPage: number
    void => {
      // setPage(newPage);
    };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const requestSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchedVal = event.target.value;
    const filteredRows = originalRows.filter((row) => {
      return (
        row.name.toLowerCase().includes(searchedVal.toLowerCase().trim()) ||
        row.code.toLowerCase().includes(searchedVal.toLowerCase().trim()) ||
        row.population.toString().includes(searchedVal.trim()) ||
        row.size.toString().includes(searchedVal.trim())
      );
    });
    setRows(filteredRows);
  };

  const handleFilter = (value: FilterType) => {
    console.log(value);
    setFilterFields({ ...filterFields, ...value });

    if (value && value['value'] && value['columns'][0]) {
      let filteredRows: OriginalRows[] = [];
      if (value['columns'].length === 1) {
        value['columns'].map((column) => {
          switch (typeof originalRows[0][column]) {
            case 'string': {
              filteredRows = originalRows.filter((row) => {
                return row[column]
                  .toString()
                  .toLowerCase()
                  .includes(value['value'].toLowerCase().trim());
              });
              break;
            }
            case 'number': {
              if (!isNaN(+value['value']) && value.actions !== '') {
                filteredRows = originalRows.filter((row) => {
                  if (value.actions === 'equal') {
                    return row[column] === parseInt(value['value']);
                  } else if (value.actions === 'greater') {
                    return row[column] > parseInt(value['value']);
                  } else if (value.actions === 'lower') {
                    return row[column] < parseInt(value['value']);
                  }
                });
              } else {
                filteredRows = originalRows.filter((row) => {
                  return row[column]
                    .toString()
                    .toLowerCase()
                    .includes(value['value'].toLowerCase().trim());
                });
              }
              break;
            }
            default:
              break;
          }
        });
      } else {
        filteredRows = originalRows.filter((row) => {
          return (
            (value['columns'].indexOf('name') !== -1
              ? row.name
                  .toLowerCase()
                  .includes(value['value'].toLowerCase().trim())
              : true) &&
            (value['columns'].indexOf('code') !== -1
              ? row.code
                  .toLowerCase()
                  .includes(value['value'].toLowerCase().trim())
              : true) &&
            (value['columns'].indexOf('population') !== -1
              ? row.population.toString().includes(value['value'].trim())
              : true) &&
            (value['columns'].indexOf('size') !== -1
              ? row.size.toString().includes(value['value'].trim())
              : true)
          );
        });
      }
      setRows(filteredRows);
    } else {
      setRows(originalRows);
    }
  };

  const handleSelectCol = (selCol: string[]) => {
    setSelectedCol(columns.filter((col) => selCol.indexOf(col.id) !== -1));
  };

  return (
    <Paper className={classes.root}>
      <div className={classes.grow}>
        <Toolbar>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={requestSearch}
            />
          </div>
          <div className={classes.sectionDesktop}>
            <Filter
              handleFilter={handleFilter}
              filterFields={filterFields}
              filterableCol={selectedCol}
            />
          </div>
          <div className={classes.sectionDesktop}>
            <ColumnsAct options={columns} handleSelect={handleSelectCol} />
          </div>
        </Toolbar>
      </div>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {selectedCol.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <StyledTableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                  >
                    {selectedCol.map((column) => {
                      const value = row[column.id];
                      return (
                        <StyledTableCell key={column.id} align={column.align}>
                          {value}
                        </StyledTableCell>
                      );
                    })}
                  </StyledTableRow>
                );
              })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={4}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default StickyHeadTable;
