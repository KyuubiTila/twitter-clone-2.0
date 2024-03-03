'use client';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useProfile } from './profile';

const createTweet = async (data) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.post('http://localhost:3001/tweets', data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'An error occurred');
  }
};

const getAllTweets = async () => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.get('http://localhost:3001/tweets', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'An error occurred');
  }
};

const getIndidvidualTweet = async (tweetId) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.get(
      `http://localhost:3001/tweets/${tweetId}`,
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

const deleteIndividualTweet = async (tweetId) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.delete(
      `http://localhost:3001/tweets/${tweetId}`,
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

const updateIndividualTweet = async ({ content, tweetId }) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.patch(
      `http://localhost:3001/tweets/${tweetId}`,
      { content },
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

export const useTweet = () => {
  const router = useRouter();
  const { tweetId } = useParams();
  const { createdTweetForProfileRefetch } = useProfile();

  // CREATE TWEET
  const { mutate: addTweet } = useMutation(createTweet, {
    onSuccess: () => {
      tweetsRefetch();
      createdTweetForProfileRefetch();
    },
    onError: (error) => {
      console.error('tweet creation failed:', error);
    },
  });

  // GET ALL TWEETS
  const {
    data: tweets,
    isLoading: tweetsIsLoading,
    refetch: tweetsRefetch,
  } = useQuery('allTweets', getAllTweets, {
    enabled: false,
  });

  // GET  INDIVIDUAL TWEET
  const {
    data: tweet,
    isLoading: tweetIsLoading,
    refetch: individualTweetRefetch,
  } = useQuery(
    ['profileDetails', tweetId],
    () => getIndidvidualTweet(tweetId),
    {
      enabled: !!tweetId,
    }
  );

  // DELETE INDIVIDUAL'S PERSONAL TWEET
  const { mutate: deleteTweet } = useMutation(deleteIndividualTweet, {
    onSuccess: () => {
      tweetsRefetch();
      createdTweetForProfileRefetch();
    },
    onError: (error) => {
      console.error('tweet delete failed:', error);
    },
  });

  // UPDATE INDIVIDUAL'S PERSONAL TWEET
  const { mutate: updateTweet } = useMutation(updateIndividualTweet, {
    onError: (error) => {
      console.error('tweet delete failed:', error);
    },
  });

  return {
    addTweet,
    tweets,
    tweetsRefetch,
    tweetsIsLoading,
    tweet,
    individualTweetRefetch,
    tweetIsLoading,
    deleteTweet,
    updateTweet,
  };
};
