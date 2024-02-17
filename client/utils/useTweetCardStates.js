'use client';
import { useState } from 'react';

const useTweetCardStates = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tweetText, setTweetText] = useState('Lorem ipsum...');
  const [isHovering, setIsHovering] = useState(false);
  const handleOpenCommentModal = () => {
    setCommentModalOpen(true);
    handleCloseMenu();
  };

  const handleCloseCommentModal = () => {
    setCommentModalOpen(false);
  };

  const handleClickMenu = (event) => {
    console.log(event);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEditText = () => {
    setIsEditing(true);
    setAnchorEl(null);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    // Handle saving edited text here
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset tweet text to original content
    setTweetText('Lorem ipsum...');
  };

  const handleMouseOver = () => {
    setTimeout(() => {
      setIsHovering(true);
    }, 300);
  };

  const handleMouseOut = () => {
    setTimeout(() => {
      setIsHovering(false);
    }, 300);
  };

  return {
    anchorEl,
    setAnchorEl,
    commentModalOpen,
    setCommentModalOpen,
    isEditing,
    setIsEditing,
    tweetText,
    setTweetText,
    handleOpenCommentModal,
    handleCloseCommentModal,
    handleClickMenu,
    handleCloseMenu,
    handleEditText,
    handleSaveEdit,
    handleCancelEdit,
    handleMouseOver,
    handleMouseOut,
    isHovering,
  };
};

export default useTweetCardStates;
