'use client';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useComment } from './comment';
import { useProfile } from './profile';

const doRetweet = async (commentId) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.post(
      `http://localhost:3001/comment-retweet/${commentId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (error) {
    throw new Error(error.response.data.message || 'An error occurred');
  }
};

const undoRetweet = async (commentId) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.delete(
      `http://localhost:3001/comment-retweet/${commentId}`,
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

const doLike = async (commentId) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.post(
      `http://localhost:3001/comment-favorited/${commentId}`,
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

const undoLike = async (commentId) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.delete(
      `http://localhost:3001/comment-favorited/${commentId}`,
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

const doBookmark = async (commentId) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.post(
      `http://localhost:3001/comment-bookmark/${commentId}`,
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

const undoBookmark = async (commentId) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.delete(
      `http://localhost:3001/comment-bookmark/${commentId}`,
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

export const useCommentEngagement = () => {
  const { individualTweetCommentsRefetch } = useComment();
  const { retweetedCommentsForProfileRefetch, likedCommentsForProfileRefetch } =
    useProfile();

  // RETWEET COMMENT
  const { mutate: retweet } = useMutation(doRetweet, {
    onSuccess: () => {
      individualTweetCommentsRefetch();
      retweetedCommentsForProfileRefetch();
    },
    onError: (error) => {
      console.error('comment retweet failed:', error);
    },
  });

  // UNDO COMMENT RETWEET
  const { mutate: unretweet } = useMutation(undoRetweet, {
    onSuccess: () => {
      individualTweetCommentsRefetch();
      retweetedCommentsForProfileRefetch();
    },
    onError: (error) => {
      console.error('comment unretweet failed:', error);
    },
  });

  //  LIKE COMMENT
  const { mutate: like } = useMutation(doLike, {
    onSuccess: () => {
      individualTweetCommentsRefetch();
      likedCommentsForProfileRefetch();
    },
    onError: (error) => {
      console.error('comment like failed:', error);
    },
  });

  //  UNDO COMMENT LIKE
  const { mutate: unlike } = useMutation(undoLike, {
    onSuccess: () => {
      individualTweetCommentsRefetch();
      likedCommentsForProfileRefetch();
    },
    onError: (error) => {
      console.error('undo comment like failed:', error);
    },
  });

  //  BOOKMARK COMMENT
  const { mutate: bookmark } = useMutation(doBookmark, {
    onSuccess: () => {
      individualTweetCommentsRefetch();
    },
    onError: (error) => {
      console.error('comment bookmark failed:', error);
    },
  });

  //  UNDO COMMENT BOOKMARK
  const { mutate: unBookmark } = useMutation(undoBookmark, {
    onSuccess: () => {
      individualTweetCommentsRefetch();
    },
    onError: (error) => {
      console.error('comment bookmark failed:', error);
    },
  });

  return { retweet, unretweet, like, unlike, bookmark, unBookmark };
};
