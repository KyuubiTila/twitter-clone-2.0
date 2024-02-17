import { useAuth } from '@/stores/auth';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const useSideBarState = () => {
  const { logOut } = useAuth();

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    setAnchorEl(null);
    setOpen(false);
    logOut();
  };

  const handleSignUp = () => {
    setAnchorEl(null);
    setOpen(false);
    router.push('/signup');
  };

  useEffect(() => {
    const handleCloseOnOutsideClick = (event) => {
      if (anchorEl && !anchorEl.contains(event.target)) {
        handleCloseMenu();
      }
    };

    document.body.addEventListener('click', handleCloseOnOutsideClick);

    return () => {
      document.body.removeEventListener('click', handleCloseOnOutsideClick);
    };
  }, [anchorEl]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return {
    open,
    anchorEl,
    handleClickMenu,
    handleCloseMenu,
    handleSignOut,
    handleOpen,
    handleClose,
    handleSignUp,
    setAnchorEl,
  };
};

export default useSideBarState;
