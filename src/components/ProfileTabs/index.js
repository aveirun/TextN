import React, { useState } from 'react';

import { Tab, Tabs } from '@material-ui/core';
import ProfileEdit from './ProfileEdit';
import ProfileSubscriptions from './ProfileSubscriptions';
import ProfileFollowers from './ProfileFollowers';
import ProfilePosts from './ProfilePosts';

const ProfileTabs = ({ isAnotherUser }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let tabs = [
    { label: <Tab label="Edit" />, value: <ProfileEdit /> },
    { label: <Tab label="Following" />, value: <ProfileSubscriptions /> },
    { label: <Tab label="Followers" />, value: <ProfileFollowers /> },
    { label: <Tab label="Posts" />, value: <ProfilePosts /> },
  ];

  if (isAnotherUser) {
    tabs = tabs.slice(1);
  }

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
      >
        {tabs.map(tab => tab.label)}
      </Tabs>
      {tabs.map((tab, id) => value === id && tab.value)}
    </div>
  );
};

export default ProfileTabs;
