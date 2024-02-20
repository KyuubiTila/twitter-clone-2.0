'use client';
import React, { useEffect } from 'react';
import Profile from '../Profle';
import { useProfile } from '@/stores/profile';

const ProfilePage = ({ params }) => {
  const { profile, profileDetailsRefetch, isLoading } = useProfile();

  useEffect(() => {
    profileDetailsRefetch();
  }, [profileDetailsRefetch]);

  return (
    <>
      {isLoading ? ( // Conditionally render based on loading state
        <p>Loading...</p>
      ) : (
        <Profile profileId={params.profileId} profile={profile} />
      )}
    </>
  );
};

export default ProfilePage;
