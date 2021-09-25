import * as React from 'react';

import { Grid, IconButton, List, ListItem, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useAppSelector } from 'redux/hooks';
import { IChat, useGetChatsByUserIdQuery } from 'redux/stores/chats/chatApi';
import { useGetAllProfilesQuery } from 'redux/stores/userProfile/userProfileApi';
import { IProfile } from 'redux/stores/userProfile/userProfileSlice';

import useStyles from './styles';

const getChatName = (myUserId: string, chat: IChat, profiles: IProfile[]): string => {
  const { name, userIds } = chat;

  if (name) {
    return name;
  }

  if (userIds.length === 2) {
    const [otherUserName] = userIds
      .filter((id) => id !== myUserId)
      .map((id) => profiles.find((item) => item.user.userId === id)?.username ?? '');

    return otherUserName || '';
  }

  return 'Чат без названия';
};

const MainPage: React.FC = () => {
  const classes = useStyles();

  const profile = useAppSelector((store) => store.profile.userProfile) || {};
  const userId = profile.user?.userId ?? '';

  const { data: userChats } = useGetChatsByUserIdQuery(userId);
  const { data: profiles = [] } = useGetAllProfilesQuery();

  return (
    <Grid container direction="column" alignItems="center" className={classes.root} justifyContent="space-between">
      <List className={classes.messageList}>
        {(userChats || []).map((chat) => (
          <ListItem key={chat.chatId} className={classes.listItem}>
            <Typography>{getChatName(userId, chat, profiles)}</Typography>
          </ListItem>
        ))}
      </List>
      <Grid container wrap="nowrap" alignItems="center" className={classes.textFieldContainer}>
        <IconButton className={classes.button}>
          <AddIcon className={classes.icon} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default MainPage;
