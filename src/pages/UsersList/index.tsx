import * as React from 'react';

import { Redirect } from 'react-router-dom';
import { Grid, List, ListItem, TextField, Typography } from '@material-ui/core';
import { useGetAllProfilesQuery } from 'redux/stores/userProfile/userProfileApi';
import routes from 'routes';
import useStyles from './styles';

const UsersList: React.FC = () => {
  const classes = useStyles();

  // TODO: может все таки добавлять id профайлов а не id юзеров?
  const [memberIds, setMemberIds] = React.useState<string[]>([]);

  const SaveSuccessChat = false;
  const NewChatId = 'chatId recieve after create chat';

  const { data: profiles = [] } = useGetAllProfilesQuery();

  const handleUserClick = (userId: string) => () => {
    setMemberIds([...memberIds, userId]);
  };

  return (
    <Grid className={classes.root}>
      <Typography>Выберите участников</Typography>
      {memberIds.length > 1 && <TextField label="Название группы" />}
      <List>
        {profiles.map((profile) => (
          // eslint-disable-next-line no-underscore-dangle
          <ListItem key={profile._id} onClick={handleUserClick(profile.user.userId)}>
            {profile.username}
          </ListItem>
        ))}
      </List>
      {SaveSuccessChat && <Redirect to={routes.chat(NewChatId)} />}
    </Grid>
  );
};

export default React.memo(UsersList);
