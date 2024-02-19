import React from 'react';
import {
  Bell,
  Bookmark,
  Clipboard,
  HomeIcon,
  InboxIcon,
  LogOut,
  MoreHorizontal,
  Search,
  UserIcon,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import MenuItem from './MenuItem';
import Avatar from '@mui/material/Avatar';
import CreateTweetCard from './CreateTweetCard';
import { Box, Modal, MenuItem as MuiMenuItems, Popover } from '@mui/material';
import useSideBarState from '@/utils/useSideBarState';

const SideBar = ({ user }) => {
  const { username, id } = user;

  const menuItems = [
    {
      icon: HomeIcon,
      label: 'Home',
      href: '/',
    },
    {
      icon: Search,
      label: 'Explore',
      href: '/',
    },
    {
      icon: Bell,
      label: 'Notification',
      href: '/',
    },
    {
      icon: InboxIcon,
      label: 'Messages',
      href: '/',
    },
    {
      icon: Bookmark,
      label: 'Bookmark',
      href: '/',
    },
    {
      icon: Clipboard,
      label: 'Lists',
      href: '/',
    },
    {
      icon: UserIcon,
      label: 'Profile',
      href: `/profile/${id}`,
    },
    {
      icon: MoreHorizontal,
      label: 'More',
      href: '/',
    },
  ];
  const {
    open,
    anchorEl,
    handleClickMenu,
    handleCloseMenu,
    handleSignOut,
    handleOpen,
    handleClose,
    handleSignUp,
  } = useSideBarState();

  return (
    <div
      className={`h-screen w-auto md:w-60 p-4 fixed flex justify-between flex-col`}
    >
      <div>
        <div className="cursor-pointer px-3 py-4">
          <Image src={'/x.png'} width={30} height={30} alt="logo" />
        </div>

        <div className="flex flex-col">
          {menuItems.map((item) => (
            <MenuItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              href={item.href}
            />
          ))}
        </div>

        <div
          onClick={handleOpen}
          className="bg-blue-200 mt-2 hover:bg-blue-600 hover:cursor-pointer flex justify-center text-black hover:text-white font-bold py-2 px-2 focus:outline-none rounded-full focus:shadow-outline md:py-3 md:px-6 md:text-lg lg:text-xl"
        >
          <button>Tweet</button>
        </div>
      </div>

      <div
        onClick={handleClickMenu}
        className="flex justify-between mt-10 items-center px-2.5 mb-4 hover:bg-blue-200 p-2 rounded-full cursor-pointer relative"
      >
        <div className="flex">
          <div>
            <Avatar src="/x-big.jpg" alt="Avatar" width={10} height={10} />
          </div>
          <div className="text-black mt-2 md:flex md:flex-col hover:text-white ml-2 hidden">
            <p className="font-semibold">{username}</p>
          </div>
        </div>

        <div className="flex pl-5 pb-1 mr-3">
          <div className="text-black ml-4 hidden md:inline-flex hover:text-white">
            ...
          </div>
        </div>
        <Popover
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorReference="anchorEl"
          position={'absolute'}
        >
          <MuiMenuItems onClick={handleSignOut}>
            <div className="flex items-center w-full">
              <button className="ml-1 text-gray-500 dark:text-gray-400 font-light ">
                <LogOut color="#5755d8" size={20} />
              </button>
              <span className="ml-2">Logout</span>
            </div>
          </MuiMenuItems>

          <MuiMenuItems onClick={handleSignUp}>
            <div className="flex items-center w-full">
              <button className="ml-1 text-gray-500 dark:text-gray-400 font-light ">
                <Users color="#5755d8" size={20} />
              </button>
              <span className="ml-2">Register A New Account</span>
            </div>
          </MuiMenuItems>
        </Popover>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 1,
          }}
        >
          <CreateTweetCard />
        </Box>
      </Modal>
    </div>
  );
};

export default SideBar;
