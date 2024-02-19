'use client';
import React, { useEffect } from 'react';
import Profile from '../Profle';
import { useAuth } from '@/stores/auth';

const ProfilePage = ({ params }) => {
  const { user, userDetailsRefetch } = useAuth();

  useEffect(() => {
    userDetailsRefetch();
  }, [userDetailsRefetch]);

  const { id } = user;
  params.profileId = id;
  return <Profile profileId={params.profileId} />;
};

export default ProfilePage;
