import React from 'react';

import { Box } from '@material-ui/core';
import ProfileForm from 'components/ProfileForm';
import { useCreateOrUpdateMutation } from 'redux/stores/userProfile/userProfileApi';

// Страница редактирования профиля пользователя
const ProfilePage: React.FC = () => {
  const [createOrUpdate, { isLoading, isError }] = useCreateOrUpdateMutation();
  return (
    <Box mt={5}>
      <ProfileForm onSubmit={createOrUpdate} isLoading={isLoading} isError={isError} />
    </Box>
  );
};

export default React.memo(ProfilePage);
