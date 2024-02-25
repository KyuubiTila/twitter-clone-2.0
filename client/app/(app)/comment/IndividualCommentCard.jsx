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
import useTweetCardStates from '@/utils/useTweetCardStates';
import Image from 'next/image';
import CreateCommentCard from '@/components/CreateCommentCard';
import OnHoverCard from '@/components/OnHoverCard';
import CommentCard from '@/components/CommentRenderCard';
import Link from 'next/link';
import { useCommentEngagement } from '@/stores/commentEngagement';

const IndividualCommentCard = ({
  user,
  individualComment,
  deleteComment,
  updateComment,
  allComments,
}) => {
  const { retweet, unretweet, like, unlike, bookmark, unBookmark } =
    useCommentEngagement();

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
    isHovering,
  } = useTweetCardStates();

  const {
    content,
    id,
    createdAt,
    userId,
    comment_bookmarked,
    comment_favorited,
    comment_retweeted,
  } = individualComment;

  const {
    bio,
    followersCount,
    followingCount,
    userId: profileUserId,
  } = individualComment?.user?.profile;
  const { username, follower } = individualComment?.user || {};
  // console.log(individualComment);
  const [tweetText, setTweetText] = useState(content);

  const retweetsIds = comment_retweeted?.map((retweet) => retweet.userId);
  const [isRetweet, setIsRetweet] = useState(retweetsIds?.includes(user.id));
  const [retweetCount, setRetweetCount] = useState(
    individualComment?.retweetsCount || 0
  );

  const likesIds = comment_favorited?.map((like) => like.userId);
  const [isLiked, setIsLiked] = useState(likesIds?.includes(user.id));
  const [likeCount, setLikeCount] = useState(
    individualComment?.likesCount || 0
  );

  const bookmarksIds = comment_bookmarked?.map((like) => like.userId);
  const [isBookmark, setIsBookmark] = useState(bookmarksIds?.includes(user.id));
  const [bookmarkCount, setBookmarkCount] = useState(
    individualComment?.bookmarksCount || 0
  );

  useEffect(() => {
    setTweetText(content);
  }, [content]);

  const handleRetweet = async () => {
    await retweet(id);
    setIsRetweet(true);
    setRetweetCount((prevCount) => prevCount + 1);
  };

  const handleUndoRetweet = async () => {
    await unretweet(id);
    setIsRetweet(false);
    setRetweetCount((prevCount) => prevCount - 1);
  };

  const handleLike = async () => {
    await like(id);
    setIsLiked(true);
    setLikeCount((prevCount) => prevCount + 1);
  };

  const handleUndoLike = async () => {
    await unlike(id);
    setIsLiked(false);
    setLikeCount((prevCount) => prevCount - 1);
  };

  const handleBookmark = async () => {
    await bookmark(id);
    setIsBookmark(true);
    setBookmarkCount((prevCount) => prevCount + 1);
  };

  const handleUndoBookmark = async () => {
    await unBookmark(id);
    setIsBookmark(false);
    setBookmarkCount((prevCount) => prevCount - 1);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    updateComment({ content: tweetText, commentId: id });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setTweetText(content);
  };

  const handleDelete = () => {
    handleCloseMenu();
    deleteComment(id);
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

  return individualComment ? (
    <div>
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
                {isHovering && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '100%',
                      borderRadius: '100px',
                      width: '20em',
                    }}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    <OnHoverCard
                      username={username}
                      bio={bio}
                      followersCount={followersCount}
                      followingCount={followingCount}
                      profileUserId={profileUserId}
                      follower={follower}
                    />
                  </div>
                )}
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
                </Link>

                <span className="block text-xs text-gray-500 dark:text-gray-400 font-light leading-snug">
                  {formattedDateTime}
                </span>
              </div>
            </div>
            {user.id === userId && (
              <div>
                <button
                  onClick={handleClickMenu}
                  className="text-gray-500 dark:text-gray-400 font-light"
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
            <div className="text-xs text-gray-800 dark:text-gray-100 leading-snug lg:line-clamp-2 md:line-clamp-3 sm:line-clamp-4 overflow-hidden">
              {tweetText}
            </div>
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
                  <Bookmark
                    color="#5755d8"
                    size={20}
                    onClick={handleBookmark}
                  />
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
          {/* <hr className="mt-3" />
          <CreateCommentCard id={id} />
          <hr />
          <span>Comments</span>
          <hr /> */}

          <>
            {allComments ? (
              allComments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  deleteComment={deleteComment}
                  updateComment={updateComment}
                />
              ))
            ) : (
              <div>Loading</div>
            )}
          </>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading.............</div>
  );
};

export default IndividualCommentCard;
