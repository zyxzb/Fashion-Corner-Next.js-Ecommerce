import { Metadata } from 'next';
import React from 'react';

import Form from './Form';

export const metadata: Metadata = {
  title: 'Profile',
};

const ProfilePage = async () => {
  return (
    <div>
      <Form />
    </div>
  );
};

export default ProfilePage;
