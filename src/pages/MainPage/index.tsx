import * as React from 'react';

import { Button, Grid, List, ListItem, TextField, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { sendMessageAction } from 'redux/stores/chats/chatSlice';
import useStyles from './styles';

const MainPage: React.FC = () => {
  const classes = useStyles();
  const [text, setText] = React.useState('');

  const dispatch = useAppDispatch();

  const handleSendClick = () => {
    dispatch(sendMessageAction(text));
    setText('');
  };

  const messageList = useAppSelector((state) => state.chat.messageList);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <Grid container direction="column" alignItems="center" className={classes.root}>
      <Typography variant="h5" gutterBottom id="no-found-title">
        Chat
      </Typography>
      <List>
        {messageList.map((msg) => (
          <ListItem key={msg}>{msg}</ListItem>
        ))}
      </List>

      <TextField className={classes.textField} value={text} onChange={handleChange} />
      <Button className={classes.button} onClick={handleSendClick}>
        Отправить
      </Button>
    </Grid>
  );
};

export default MainPage;
