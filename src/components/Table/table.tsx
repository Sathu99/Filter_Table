import React from 'react';
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
import { columns, OriginalRows, originalRows } from './data';
import Filter from '../Filter/Filter';
import ColumnsAct from '../Columns/Columns';

export type FilterType = {
  [key: string]: string | string[] | undefined;
  columns: string[];
  actions: string[];
  value: string;
};

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState(originalRows);
  const [filterFields, setFilterFields] = React.useState<FilterType>({
    columns: [],
    actions: [],
    value: '',
  } as FilterType);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.ChangeEvent<HTMLInputElement>
      | null,
    newPage: number
  ) => {
    setPage(newPage);
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
    console.log(filterFields, value);
    if (value && value['columns'] && value['value']) {
      let filteredRows: OriginalRows[] = [];
      if (value['columns'].length === 1) {
        value['columns'].map((column) => {
          console.log(typeof originalRows[0][column]);
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
              if (!isNaN(+value['value']) && value.actions[0]) {
                filteredRows = originalRows.filter((row) => {
                  console.log(value['value'], row[column]);
                  if (value.actions[0] === 'equal') {
                    return row[column] === parseInt(value['value']);
                  } else if (value.actions[0] === 'greater') {
                    return row[column] > parseInt(value['value']);
                  } else if (value.actions[0] === 'lower') {
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
          return value['columns'].indexOf('name')
            ? row.name
                .toLowerCase()
                .includes(value['value'].toLowerCase().trim())
            : false || value['columns'].indexOf('code')
            ? row.code
                .toLowerCase()
                .includes(value['value'].toLowerCase().trim())
            : false || value['columns'].indexOf('population')
            ? row.population.toString().includes(value['value'].trim())
            : false || value['columns'].indexOf('size')
            ? row.size.toString().includes(value['value'].trim())
            : false;
        });
      }
      setRows(filteredRows);
    } else {
      setRows(originalRows);
    }
    setFilterFields({ ...filterFields, ...value });
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
            <Filter handleFilter={handleFilter} filterFields={filterFields} />
          </div>
          <div className={classes.sectionDesktop}>
            <ColumnsAct />
          </div>
        </Toolbar>
      </div>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
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
                    {columns.map((column) => {
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
}
