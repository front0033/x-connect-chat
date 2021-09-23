import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    alert: {
      width: 250,
    },
    alertMessage: {
      width: '100%',
    },
    alertIcon: {
      display: 'none',
    },
    date: {
      width: 33,
    },
  })
);

export default useStyles;
