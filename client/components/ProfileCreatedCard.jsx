'use client';
import React, { useEffect, useState } from 'react';
import { Box, Menu, MenuItem, Modal, TextField, Button } from '@mui/material';
import {
  Bookmark,
  BookmarkCheck,
  Heart,
  MessageSquare,
  Pencil,
  Repeat,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import CreateCommentCard from './CreateCommentCard';
import useTweetCardStates from '@/utils/useTweetCardStates';
import Image from 'next/image';
import { useAuth } from '@/stores/auth';
import { useEngagement } from '@/stores/tweetEngagement';
import { useTweet } from '@/stores/tweet';
import { useCommentEngagement } from '@/stores/commentEngagement';
import { useComment } from '@/stores/comment';

const ProfileCreatedCard = ({ tweet }) => {
  const { user, userDetailsRefetch } = useAuth();
  const { deleteTweet, updateTweet } = useTweet();
  const { deleteComment: commentDelete, updateComment: commentUpdate } =
    useComment();

  const { retweet, unretweet, like, unlike, bookmark, unBookmark } =
    useEngagement();
  const {
    retweet: commentRetweet,
    unretweet: commentUnretweet,
    like: commentLike,
    unlike: commentUnlike,
    bookmark: commentBookmark,
    unBookmark: commentUnbookmark,
  } = useCommentEngagement();

  useEffect(() => {
    userDetailsRefetch();
  }, [userDetailsRefetch]);

  const {
    content,
    id,
    createdAt,
    userId,
    tweet_bookmarked,
    tweet_favorited,
    tweet_retweeted,
    comment_retweeted,
    comment_favorited,
    comment_bookmarked,
  } = tweet;

  const isTweet = tweet.tweet_bookmarked !== undefined;
  const { username } = tweet?.user;

  const retweetsIds =
    tweet_retweeted?.map((retweet) => retweet.userId) ||
    comment_retweeted.map((retweet) => retweet.userId);
  const [isRetweet, setIsRetweet] = useState(retweetsIds?.includes(user.id));
  const [retweetCount, setRetweetCount] = useState(tweet?.retweetsCount || 0);

  const likesIds =
    tweet_favorited?.map((like) => like.userId) ||
    comment_favorited.map((retweet) => retweet.userId);
  const [isLiked, setIsLiked] = useState(likesIds?.includes(user.id));
  const [likeCount, setLikeCount] = useState(tweet?.likesCount || 0);

  const bookmarksIds =
    tweet_bookmarked?.map((like) => like.userId) ||
    comment_bookmarked.map((retweet) => retweet.userId);
  const [isBookmark, setIsBookmark] = useState(bookmarksIds?.includes(user.id));
  const [bookmarkCount, setBookmarkCount] = useState(
    tweet?.bookmarksCount || 0
  );

  const handleRetweet = async () => {
    isTweet ? await retweet(id) : commentRetweet(id);
    setIsRetweet(true);
    setRetweetCount((prevCount) => prevCount + 1);
  };

  const handleUndoRetweet = async () => {
    isTweet ? await unretweet(id) : commentUnretweet(id);
    setIsRetweet(false);
    setRetweetCount((prevCount) => prevCount - 1);
  };

  const handleLike = async () => {
    isTweet ? await like(id) : commentLike(id);
    setIsLiked(true);
    setLikeCount((prevCount) => prevCount + 1);
  };

  const handleUndoLike = async () => {
    isTweet ? await unlike(id) : commentUnlike(id);
    setIsLiked(false);
    setLikeCount((prevCount) => prevCount - 1);
  };

  const handleBookmark = async () => {
    isTweet ? await bookmark(id) : commentBookmark(id);
    setIsBookmark(true);
    setBookmarkCount((prevCount) => prevCount + 1);
  };

  const handleUndoBookmark = async () => {
    isTweet ? await unBookmark(id) : commentUnbookmark(id);
    setIsBookmark(false);
    setBookmarkCount((prevCount) => prevCount - 1);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  };

  const formattedDateTime = formatDate(createdAt);

  const {
    anchorEl,
    commentModalOpen,
    isEditing,
    handleOpenCommentModal,
    handleCloseCommentModal,
    handleClickMenu,
    handleCloseMenu,
    handleEditText,
    setIsEditing,
    handleMouseOver,
    handleMouseOut,
  } = useTweetCardStates();
  const [tweetText, setTweetText] = useState(tweet?.content ? content : '');

  const handleSaveEdit = () => {
    setIsEditing(false);
    isTweet
      ? updateTweet({ content: tweetText, tweetId: id })
      : commentUpdate({ content: tweetText, commentId: id });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setTweetText(content);
  };

  const handleDelete = () => {
    handleCloseMenu();
    isTweet ? deleteTweet(id) : commentDelete(id);
  };

  return (
    <div className="p-1 bg-gray-50 dark:bg-yellow-900 flex items-center justify-center max-w-screen-xl">
      <div className="px-4 py-3 bg-white dark:bg-gray-800 rounded-lg w-full ">
        <div className="flex justify-between mb-2">
          <div className="flex">
            <div className="relative hover:cursor-pointer">
              <Link href={`/profile/${userId}`}>
                <Image
                  className="w-10 h-10 rounded-full"
                  width={20}
                  height={20}
                  src="/x-big.jpg"
                  alt="profile"
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                />
              </Link>
            </div>
            <div className="ml-2 mt-1">
              <Link href={`/profile/${userId}`}>
                <span
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                  className="block font-medium text-xs hover:cursor-pointer leading-snug text-black  dark:text-gray-100"
                >
                  {username}
                </span>
                <span className="block text-xs text-gray-500 dark:text-gray-400 font-light leading-snug">
                  {formattedDateTime}
                </span>
              </Link>
            </div>
          </div>
          <div className="flex justify-end">
            {isTweet ? (
              <span
                href="#_"
                className={`mb-2 px-1.5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm ${
                  user.id === userId ? 'mr-2' : ''
                }`}
              >
                tweet
              </span>
            ) : (
              <span
                href="#_"
                className={`mb-2 px-1.5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm ${
                  user.id === userId ? 'mr-2' : ''
                }`}
              >
                comment
              </span>
            )}
            {user.id === userId && (
              <div className="">
                <button
                  onClick={handleClickMenu}
                  className="text-gray-500 mt-1 dark:text-gray-400 font-light"
                >
                  ...
                </button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <MenuItem onClick={handleEditText}>
                    <div className="flex items-center w-full">
                      <button className="ml-1 text-gray-500 dark:text-gray-400 font-light ">
                        <Pencil color="#5755d8" size={20} />
                      </button>
                      <span className="ml-2">Edit</span>
                    </div>
                  </MenuItem>
                  <MenuItem onClick={handleDelete}>
                    <div className="flex items-center w-full">
                      <button className="ml-1 text-gray-500 dark:text-gray-400 font-light ">
                        <Trash2 color="#5755d8" size={20} />
                      </button>
                      <span className="ml-2">Delete</span>
                    </div>
                  </MenuItem>
                </Menu>
              </div>
            )}
          </div>
        </div>
        {isEditing ? (
          <TextField
            value={tweetText}
            onChange={(e) => setTweetText(e.target.value)}
            fullWidth
            multiline
            variant="outlined"
            size="normal"
          />
        ) : (
          <Link
            href={isTweet ? `/tweet/${id}` : `/comment/${id}`}
            className="text-xs text-gray-800 dark:text-gray-100 leading-snug lg:line-clamp-2 md:line-clamp-3 sm:line-clamp-4 overflow-hidden"
          >
            {tweetText}
          </Link>
        )}
        <div className="flex justify-between items-center mt-3">
          <div className="flex">
            <button
              onClick={handleOpenCommentModal}
              className="ml-1 text-gray-500 dark:text-gray-400 font-light  "
            >
              <MessageSquare color="#5755d8" size={20} />
            </button>
          </div>
          <div className="flex">
            <button className="ml-1 text-gray-500 dark:text-gray-400 font-light ">
              {isRetweet ? (
                <Repeat
                  color="red"
                  fill="red"
                  size={20}
                  onClick={handleUndoRetweet}
                />
              ) : (
                <Repeat color="#5755d8" size={20} onClick={handleRetweet} />
              )}
            </button>
            <div className="ml-1">{retweetCount}</div>
          </div>
          <div className="flex">
            <button className="ml-1 text-gray-500 dark:text-gray-400 font-light ">
              {isLiked ? (
                <Heart
                  color="red"
                  fill="red"
                  size={20}
                  onClick={handleUndoLike}
                />
              ) : (
                <Heart color="#5755d8" size={20} onClick={handleLike} />
              )}
            </button>
            <div className="ml-1">{likeCount}</div>
          </div>

          <div className=" flex">
            <button className=" ml-1 text-gray-500 dark:text-gray-400 font-light ">
              {isBookmark ? (
                <BookmarkCheck
                  color="red"
                  fill="red"
                  size={20}
                  onClick={handleUndoBookmark}
                />
              ) : (
                <Bookmark color="#5755d8" size={20} onClick={handleBookmark} />
              )}
            </button>
            <div className="ml-1">{bookmarkCount}</div>
          </div>
        </div>
        {isEditing && (
          <div className="flex justify-end mt-3">
            <Button
              onClick={handleCancelEdit}
              variant="outlined"
              color="warning"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              variant="outlined"
              color="success"
              className="ml-2"
            >
              UPDATE
            </Button>
          </div>
        )}
        <Modal open={commentModalOpen} onClose={handleCloseCommentModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '20%',
              left: '44.5%',
              transform: 'translate(-50%, -50%)',
              width: 600,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 1,
            }}
          >
            <CreateCommentCard
              commentModalOpen={commentModalOpen}
              handleCloseCommentModal={handleCloseCommentModal}
              id={id}
            />
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default ProfileCreatedCard;
