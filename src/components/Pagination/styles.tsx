import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

export type TablePaginationActionsProps = {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.ChangeEvent<HTMLInputElement>
      | null,
    newPage: number
  ) => void;
};
