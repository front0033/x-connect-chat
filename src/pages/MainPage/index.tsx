import * as React from 'react';

import { Link } from 'react-router-dom';
import { Grid, IconButton, List, ListItem, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useAppSelector } from 'redux/hooks';
import { IChat, useGetChatsByUserIdQuery } from 'redux/stores/chats/chatApi';
import routes from 'routes';

import useStyles from './styles';

const unknownChatName = 'unknown chat';

const getChatName = (myUserId: string, chat: IChat): string => {
  const { name, members } = chat;

  if (name) {
    return name;
  }

  if (members.length === 2) {
    const [otherMember] = members.filter((mbr) => mbr.userId !== myUserId);

    return otherMember ? otherMember.username : unknownChatName;
  }

  return unknownChatName;
};

const MainPage: React.FC = () => {
  const classes = useStyles();

  const profile = useAppSelector((store) => store.profile.userProfile) || {};
  const userId = profile.user?.userId ?? '';

  const { data: userChats } = useGetChatsByUserIdQuery(userId);

  return (
    <Grid container direction="column" alignItems="center" className={classes.root} justifyContent="space-between">
      <List className={classes.messageList}>
        {(userChats || []).map((chat) => (
          <ListItem key={chat.chatId} className={classes.listItem}>
            <Typography>{getChatName(userId, chat)}</Typography>
          </ListItem>
        ))}
      </List>
      <Grid container wrap="nowrap" alignItems="center" className={classes.textFieldContainer}>
        <IconButton className={classes.button} component={Link} to={routes.chat()}>
          <AddIcon className={classes.icon} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default MainPage;
