'use client';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { useParams } from 'next/navigation';

const createComment = async ({ content, articleId }) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.post(
      `http://localhost:3001/comments/${articleId}`,
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

const getAllTweetComments = async (tweetId) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.get(
      `http://localhost:3001/comments/tweet/${tweetId}`,
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

const getIndividualComment = async (commentId) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.get(
      `http://localhost:3001/comments/${commentId}`,
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

const deleteIndividualComment = async (commentId) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.delete(
      `http://localhost:3001/comments/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
};

const updateIndividualComment = async ({ content, commentId }) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.patch(
      `http://localhost:3001/comments/${commentId}`,
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

export const useComment = () => {
  const { tweetId } = useParams();
  const { commentId } = useParams();

  // CREATE COMMENT
  const { mutate: addComment } = useMutation(createComment, {
    onSuccess: () => {
      individualTweetCommentsRefetch();
    },
    onError: (error) => {
      console.error('comment creation failed:', error);
    },
  });
  // GET  INDIVIDUAL TWEET COMMENTS
  const {
    data: allComments,
    isLoading: isCommentsLoading,
    refetch: individualTweetCommentsRefetch,
  } = useQuery(
    ['allTweetCommets', tweetId],
    () => getAllTweetComments(tweetId),
    {
      enabled: !!tweetId,
    }
  );

  // GET  INDIVIDUAL COMMENT
  const {
    data: individualComment,
    isLoading: isCommentLoading,
    refetch: individualCommentRefetch,
  } = useQuery(
    ['individualCommets', commentId],
    () => getIndividualComment(commentId),
    {
      enabled: !!commentId,
    }
  );

  // DELETE INDIVIDUAL'S  COMMENT
  const { mutate: deleteComment } = useMutation(deleteIndividualComment, {
    onSuccess: () => {
      individualTweetCommentsRefetch();
    },
    onError: (error) => {
      console.error('comment delete failed:', error);
    },
  });

  // UPDATE INDIVIDUAL'S  COMMENT
  const { mutate: updateComment } = useMutation(updateIndividualComment, {
    onSuccess: () => {
      individualCommentRefetch();
      individualTweetCommentsRefetch();
    },
    onError: (error) => {
      console.error('comment update failed:', error);
    },
  });

  return {
    addComment,
    allComments,
    isCommentsLoading,
    individualTweetCommentsRefetch,
    individualComment,
    isCommentLoading,
    individualCommentRefetch,
    deleteComment,
    updateComment,
  };
};
