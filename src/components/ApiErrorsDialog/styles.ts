import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    content: {
      padding: theme.spacing(2),
    },
    icon: {
      paddingRight: theme.spacing(1),
      verticalAlign: 'middle',
    },
  })
);

export default useStyles;
