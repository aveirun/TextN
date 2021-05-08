import React, { useState } from 'react';

import { Tab, Tabs } from '@material-ui/core';
import ProfileEdit from './ProfileEdit';
import ProfileSubscriptions from './ProfileSubscriptions';
import ProfileFollowers from './ProfileFollowers';
import ProfilePosts from './ProfilePosts';

const ProfileTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Редактирование" />
        <Tab label="Подписки" />
        <Tab label="Подписчики" />
        <Tab label="Посты" />
      </Tabs>
      {value === 0 && <ProfileEdit />}
      {value === 1 && <ProfileSubscriptions />}
      {value === 2 && <ProfileFollowers />}
      {value === 3 && <ProfilePosts />}
    </>
  );
};

export default ProfileTabs;
