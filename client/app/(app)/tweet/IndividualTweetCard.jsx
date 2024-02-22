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
import { useTweet } from '@/stores/tweet';
import { useAuth } from '@/stores/auth';

const IndividualTweetCard = () => {
  const { tweet, individualTweetRefetch, deleteTweet, updateTweet } =
    useTweet();
  const { user, userDetailsRefetch } = useAuth();

  useEffect(() => {
    userDetailsRefetch();
  }, [userDetailsRefetch]);
  useEffect(() => {
    individualTweetRefetch();
  }, [individualTweetRefetch]);

  const {
    bookmarksCount,
    content,
    id,
    likesCount,
    retweetsCount,
    createdAt,
    userId,
  } = tweet || {};
  const { username } = tweet?.user || {};

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
  const [tweetText, setTweetText] = useState(content);

  useEffect(() => {
    // Update tweetText state when content changes
    setTweetText(content);
  }, [content]);

  const handleSaveEdit = () => {
    setIsEditing(false);
    updateTweet({ content: tweetText, tweetId: id });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setTweetText(content);
  };

  const handleDelete = () => {
    handleCloseMenu();
    deleteTweet(id);
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

  return tweet ? (
    <div className="p-1 bg-gray-50 dark:bg-yellow-900 flex items-center justify-center max-w-screen-xl">
      <div className="px-4 py-3 bg-white dark:bg-gray-800 rounded-lg w-full ">
        <div className="flex justify-between mb-2">
          <div className="flex">
            <div className="relative hover:cursor-pointer">
              <Image
                className="w-10 h-10 rounded-full"
                width={20}
                height={20}
                src="/x-big.jpg"
                alt="profile"
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              />
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
                  <OnHoverCard />
                </div>
              )}
            </div>
            <div className="ml-2 mt-1">
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
              {true ? (
                <Repeat color="red" fill="red" size={20} />
              ) : (
                <Repeat color="#5755d8" size={20} />
              )}
            </button>
            <div className="ml-1">{retweetsCount}</div>
          </div>
          <div className="flex">
            <button className="ml-1 text-gray-500 dark:text-gray-400 font-light ">
              {true ? (
                <Heart color="red" fill="red" size={20} />
              ) : (
                <Heart color="#5755d8" size={20} />
              )}
            </button>
            <div className="ml-1">{likesCount}</div>
          </div>

          <div className=" flex">
            <button className=" ml-1 text-gray-500 dark:text-gray-400 font-light ">
              {true ? (
                <BookmarkCheck color="red" fill="red" size={20} />
              ) : (
                <Bookmark color="#5755d8" size={20} />
              )}
            </button>
            <div className="ml-1">{bookmarksCount}</div>
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
            <CreateCommentCard />
          </Box>
        </Modal>
      </div>
    </div>
  ) : (
    <div>Loading.............</div>
  );
};

export default IndividualTweetCard;
