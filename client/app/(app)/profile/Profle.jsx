'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import ProfileHeader from './ProfileHeader';
import RepliesPage from './[profileId]/replies/RepliesPage';
import MediaPage from './[profileId]/media/MediaPage';
import TweetsProfile from './[profileId]/tweets/page';
import LikesProfile from './[profileId]/likes/page';

const Profile = ({ profileId, profile }) => {
  const [currentTab, setCurrentTab] = useState('tweets');

  return (
    <>
      <ProfileHeader profileId={profileId} profile={profile} />
      <div className="bg-white border border-black rounded-lg my-4">
        <div className="mt-1">
          <div className="flex justify-between items-center my-5 px-6">
            <Link
              href={`/profile/${profileId}`}
              onClick={() => setCurrentTab('tweets')}
              className={`text-gray-500 mx-2 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3 ${
                currentTab === 'tweets'
                  ? 'bg-gray-100 border-b-2 border-blue-500 dark:text-white dark:border-blue-400'
                  : ''
              }`}
            >
              Tweets
            </Link>
            <Link
              href={`/profile/${profileId}`}
              onClick={() => setCurrentTab('replies')}
              className={`text-gray-500 mx-2 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3 ${
                currentTab === 'replies'
                  ? 'bg-gray-100 border-b-2 border-blue-500 dark:text-white dark:border-blue-400'
                  : ''
              }`}
            >
              Replies
            </Link>
            <Link
              href={`/profile/${profileId}`}
              onClick={() => setCurrentTab('media')}
              className={`text-gray-500 mx-2 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3 ${
                currentTab === 'media'
                  ? 'bg-gray-100 border-b-2 border-blue-500 dark:text-white dark:border-blue-400'
                  : ''
              }`}
            >
              Media
            </Link>
            <Link
              href={`/profile/${profileId}`}
              onClick={() => setCurrentTab('likes')}
              className={`text-gray-500 mx-2 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3 ${
                currentTab === 'likes'
                  ? 'bg-gray-100 border-b-2 border-blue-500 dark:text-white dark:border-blue-400'
                  : ''
              }`}
            >
              Likes
            </Link>
          </div>
          <div className="w-full">
            {/* <div className="mt-5 w-full flex flex-col items-center overflow-hidden  text-sm"> */}
            {currentTab === 'tweets' && <TweetsProfile />}
            {currentTab === 'replies' && <RepliesPage />}
            {currentTab === 'media' && <MediaPage />}
            {currentTab === 'likes' && <LikesProfile />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
