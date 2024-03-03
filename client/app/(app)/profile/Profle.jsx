'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import ProfileHeader from './ProfileHeader';
import TweetsProfile from './[profileId]/tweets/page';
import LikesProfile from './[profileId]/likes/page';
import BookmarkProfile from './[profileId]/bookmarks/page';
import CreatedProfile from './[profileId]/created/page';

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
              Re-tweeted
            </Link>
            <Link
              href={`/profile/${profileId}`}
              onClick={() => setCurrentTab('created')}
              className={`text-gray-500 mx-2 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3 ${
                currentTab === 'created'
                  ? 'bg-gray-100 border-b-2 border-blue-500 dark:text-white dark:border-blue-400'
                  : ''
              }`}
            >
              Created
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
            <Link
              href={`/profile/${profileId}`}
              onClick={() => setCurrentTab('bookmark')}
              className={`text-gray-500 mx-2 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3 ${
                currentTab === 'bookmark'
                  ? 'bg-gray-100 border-b-2 border-blue-500 dark:text-white dark:border-blue-400'
                  : ''
              }`}
            >
              Bookmarks
            </Link>
          </div>
          <div className="w-full">
            {/* <div className="mt-5 w-full flex flex-col items-center overflow-hidden  text-sm"> */}
            {currentTab === 'tweets' && <TweetsProfile profile={profile} />}
            {currentTab === 'created' && <CreatedProfile profile={profile} />}
            {currentTab === 'likes' && <LikesProfile profile={profile} />}
            {currentTab === 'bookmark' && <BookmarkProfile profile={profile} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
