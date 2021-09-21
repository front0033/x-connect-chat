import * as React from 'react';
import { makeStyles, createStyles, Theme, Grid, LinearProgress as MUILinearProgress } from '@material-ui/core';

interface ILazyPaginationProgressProps {
  pending: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progress: {
      marginTop: theme.spacing(2),
      // position: 'absolute' нужно что бы скролл при подгрузке данных не срабатывал бесконечное количество раз
      position: 'absolute',
      width: '100%',
      top: 0,
      left: 0,
    },
    progressContainer: {
      position: 'relative',
      height: 20,
      width: '100%',
    },
  })
);

const LinearProgress: React.FC<ILazyPaginationProgressProps> = ({ pending }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.progressContainer}>{pending && <MUILinearProgress className={classes.progress} />}</Grid>
  );
};

export default React.memo(LinearProgress);
