import * as React from 'react';

import { Divider, Grid, IconButton, List, ListItem, TextField, Typography } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { sendMessageAction } from 'redux/stores/chats/chatSlice';
import { useGetAllProfilesQuery } from 'redux/stores/userProfile/userProfileApi';
import Message from 'components/Message';

import useStyles from './styles';

const MainPage: React.FC = () => {
  const classes = useStyles();
  const [text, setText] = React.useState('');

  const dispatch = useAppDispatch();
  const profile = useAppSelector((store) => store.profile.userProfile) || {};
  const { data: profiles = [] } = useGetAllProfilesQuery();

  const handleSendClick = () => {
    const data = { userId: profile.user?.userId, message: text, date: Date.now() };
    dispatch(sendMessageAction(JSON.stringify(data)));
    setText('');
  };

  const messageList = useAppSelector((state) => state.chat.messageList);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const getUserNameById = (userId: string) => {
    if (userId === profile.user?.userId) {
      return 'Вы: ';
    }

    // eslint-disable-next-line no-underscore-dangle
    return `${profiles.find((p) => p.user._id === userId)?.username ?? 'unknown'}: `;
  };

  return (
    <Grid container direction="column" alignItems="center" className={classes.root} justifyContent="space-between">
      <List className={classes.messageList}>
        {messageList.map((msg) => (
          <ListItem key={msg.date}>
            <Message
              userName={getUserNameById(msg.userId)}
              message={msg.message}
              date={msg.date}
              my={msg.userId === profile.user?.userId}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Grid container wrap="nowrap" alignItems="center">
        <TextField variant="outlined" className={classes.textField} value={text} onChange={handleChange} />
        <IconButton className={classes.button} onClick={handleSendClick}>
          <SendIcon className={classes.icon} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default MainPage;
