import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(7),
      marginTop: theme.spacing(6),
      padding: theme.spacing(3),
      textAlign: 'center',
      height: '90%',
    },
    actions: {
      marginTop: theme.spacing(6),
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
    },
    textField: {
      width: 300,
    },
    button: {
      border: `2px solid ${theme.palette.success.main}`,
      marginLeft: theme.spacing(1),
      padding: 6,
    },
    icon: {
      color: theme.palette.success.main,
      paddingLeft: 4,
    },
    messageList: {
      height: '70%',
      width: '100%',
    },
  })
);

export default useStyles;
