import React, { MouseEvent, ChangeEvent, FC } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { IconButton, TextField } from '@material-ui/core';
import { TablePaginationBaseProps } from '@material-ui/core/TablePagination';

import { useStyles } from './styles';

interface TablePaginationActionsProps
  extends Omit<TablePaginationBaseProps, 'onPageChange'> {
  onPageChange:
    | ((event: MouseEvent<HTMLButtonElement>) => void)
    | ((event: ChangeEvent<HTMLInputElement>) => void);
}

// interface TablePaginationActionsProps = {
//   count: number;
//   page: number;
//   rowsPerPage: number;
// };

const TablePaginationActions: FC<TablePaginationActionsProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  console.log({ ...props });

  // const { count, page, rowsPerPage, onPageChange } = props;

  // const noOfPages = Math.ceil(count / rowsPerPage) - 1;
  // const opt = [];
  // for (let index = 0; index <= noOfPages; index++) {
  //   opt.push(
  //     <option key={index} value={index}>
  //       {index + 1}
  //     </option>
  //   );
  // }

  // const handleFirstPageButtonClick = (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ): void => {
  //   onPageChange(event, 0);
  // };

  // const handleBackButtonClick = (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ): void => {
  //   onPageChange(event, page - 1);
  // };

  // const handleNextButtonClick = (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ): void => {
  //   onPageChange(event, page + 1);
  // };

  // const handleLastPageButtonClick = (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ): void => {
  //   onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  // };

  // const handleJumbedPage = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ): void => {
  //   props.onPageChange(event, parseInt(event.target.value));
  // };

  return (
    <div className={classes.root}>
      {/* <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>

      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>

      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton> */}

      <span> JumpTo</span>
      <TextField
        select
        label="Page No"
        // onChange={handleJumbedPage}
        style={{ width: 80, height: 50, marginLeft: theme.spacing(2.5) }}
        SelectProps={{
          native: true,
        }}
      >
        {/* {opt} */}
      </TextField>
    </div>
  );
};

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default TablePaginationActions;
