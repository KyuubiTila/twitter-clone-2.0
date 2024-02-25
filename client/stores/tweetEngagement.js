'use client';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useTweet } from './tweet';
import { useProfile } from './profile';

const doRetweet = async (tweetId) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.post(
      `http://localhost:3001/tweets-retweets/${tweetId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'An error occurred');
  }
};

const undoRetweet = async (tweetId) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.delete(
      `http://localhost:3001/tweets-retweets/${tweetId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'An error occurred');
  }
};

const doLike = async (tweetId) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.post(
      `http://localhost:3001/tweet-favoriting/${tweetId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'An error occurred');
  }
};

const undoLike = async (tweetId) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.delete(
      `http://localhost:3001/tweet-favoriting/${tweetId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'An error occurred');
  }
};

const doBookmark = async (tweetId) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.post(
      `http://localhost:3001/tweet-bookmarks/${tweetId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'An error occurred');
  }
};

const undoBookmark = async (tweetId) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.delete(
      `http://localhost:3001/tweet-bookmarks/${tweetId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'An error occurred');
  }
};

export const useEngagement = () => {
  const { tweetsRefetch } = useTweet();
  const { retweetedTweetsForProfileRefetch } = useProfile();
  // RETWEET TWEET
  const { mutate: retweet } = useMutation(doRetweet, {
    onSuccess: () => {
      tweetsRefetch();
      retweetedTweetsForProfileRefetch();
    },
    onError: (error) => {
      console.error('tweet retweet failed:', error);
    },
  });

  // UNDO TWEET RETWEET
  const { mutate: unretweet } = useMutation(undoRetweet, {
    onSuccess: () => {
      tweetsRefetch();
      retweetedTweetsForProfileRefetch();
    },
    onError: (error) => {
      console.error('tweet unretweet failed:', error);
    },
  });

  //  LIKE TWEET
  const { mutate: like } = useMutation(doLike, {
    onSuccess: () => {
      tweetsRefetch();
    },
    onError: (error) => {
      console.error('tweet like failed:', error);
    },
  });

  //  UNDO TWEET LIKE
  const { mutate: unlike } = useMutation(undoLike, {
    onSuccess: () => {
      tweetsRefetch();
    },
    onError: (error) => {
      console.error('undo tweet like failed:', error);
    },
  });

  //  BOOKMARK TWEET
  const { mutate: bookmark } = useMutation(doBookmark, {
    onSuccess: () => {
      tweetsRefetch();
    },
    onError: (error) => {
      console.error('tweet bookmark failed:', error);
    },
  });

  //  UNDO TWEET BOOKMARK
  const { mutate: unBookmark } = useMutation(undoBookmark, {
    onSuccess: () => {
      tweetsRefetch();
    },
    onError: (error) => {
      console.error('tweet bookmark failed:', error);
    },
  });

  return { retweet, unretweet, like, unlike, bookmark, unBookmark };
};
