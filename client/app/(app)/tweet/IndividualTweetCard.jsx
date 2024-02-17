'use client';
import React from 'react';
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
import useTweetCardStates from '@/utils/UseTweetCardStates';
import CreateCommentCard from '@/components/CreateCommentCard';
import TweetCard from '@/components/TweetRenderCard';

const IndividualTweetCard = () => {
  const {
    anchorEl,
    commentModalOpen,
    isEditing,
    tweetText,
    setTweetText,
    handleOpenCommentModal,
    handleCloseCommentModal,
    handleClickMenu,
    handleCloseMenu,
    handleEditText,
    handleSaveEdit,
    handleCancelEdit,
  } = useTweetCardStates();

  return (
    <div className="p-1 bg-gray-50 dark:bg-yellow-900 flex items-center justify-center max-w-screen-xl">
      <div className="px-4 py-3 bg-white dark:bg-gray-800 rounded-lg w-full ">
        <div className="flex justify-between mb-2">
          <div className="flex">
            <img
              className="w-10 h-10 rounded-full"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="profile"
            />
            <div className="ml-2 mt-1">
              <span className="block font-medium text-xs leading-snug text-black dark:text-gray-100">
                Loyce Kuvalis
              </span>
              <span className="block text-xs text-gray-500 dark:text-gray-400 font-light leading-snug">
                16 December at 08:25
              </span>
            </div>
          </div>
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
              <MenuItem onClick={handleCloseMenu}>
                <div className="flex items-center w-full">
                  <button className="ml-1 text-gray-500 dark:text-gray-400 font-light ">
                    <Trash2 color="#5755d8" size={20} />
                  </button>
                  <span className="ml-2">Delete</span>
                </div>
              </MenuItem>
            </Menu>
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
            href={'/tweet/tweetId'}
            className="text-xs text-gray-800 dark:text-gray-100 leading-snug lg:line-clamp-2 md:line-clamp-3 sm:line-clamp-4 overflow-hidden"
          >
            {tweetText}
          </Link>
        )}
        <div className="flex justify-between items-center mt-3">
          <button
            onClick={handleOpenCommentModal}
            className="ml-1 text-gray-500 dark:text-gray-400 font-light  "
          >
            <MessageSquare color="#5755d8" size={20} />
          </button>
          <button className="ml-1 text-gray-500 dark:text-gray-400 font-light ">
            {true ? (
              <Repeat color="red" fill="red" size={20} />
            ) : (
              <Repeat color="#5755d8" size={20} />
            )}
          </button>

          <button className="ml-1 text-gray-500 dark:text-gray-400 font-light ">
            {true ? (
              <Heart color="red" fill="red" size={20} />
            ) : (
              <Heart color="#5755d8" size={20} />
            )}
          </button>
          <button className="ml-1 text-gray-500 dark:text-gray-400 font-light ">
            {true ? (
              <BookmarkCheck color="red" fill="red" size={20} />
            ) : (
              <Bookmark color="#5755d8" size={20} />
            )}
          </button>
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

        <CreateCommentCard />
        <hr />
        <p>Comments</p>
        <hr />
        <TweetCard />
        <TweetCard />
        <TweetCard />
        <TweetCard />
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
  );
};

export default IndividualTweetCard;
