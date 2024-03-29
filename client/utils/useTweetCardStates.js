'use client';
import { useState } from 'react';

const useTweetCardStates = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const handleOpenCommentModal = () => {
    setCommentModalOpen(true);
    handleCloseMenu();
  };

  const handleCloseCommentModal = () => {
    setCommentModalOpen(false);
  };

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEditText = () => {
    setIsEditing(true);
    setAnchorEl(null);
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
    handleOpenCommentModal,
    handleCloseCommentModal,
    handleClickMenu,
    handleCloseMenu,
    handleEditText,
    handleMouseOver,
    handleMouseOut,
    isHovering,
  };
};

export default useTweetCardStates;
