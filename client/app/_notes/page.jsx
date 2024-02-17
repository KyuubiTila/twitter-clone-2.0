// modal for sign out
import React, { useState } from 'react';
import {
  Bell,
  Bookmark,
  Clipboard,
  HomeIcon,
  InboxIcon,
  MoreHorizontal,
  Search,
  UserIcon,
} from 'lucide-react';
import Image from 'next/image';
import MenuItem from './MenuItem';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const menuItems = [
  {
    icon: HomeIcon,
    label: 'Home',
    href: '/',
  },
  {
    icon: Search,
    label: 'Explore',
  },
  {
    icon: Bell,
    label: 'Notification',
  },
  {
    icon: InboxIcon,
    label: 'Messages',
  },
  {
    icon: Bookmark,
    label: 'Bookmark',
  },
  {
    icon: Clipboard,
    label: 'Lists',
  },
  {
    icon: UserIcon,
    label: 'Profile',
    href: '/profile',
  },
  {
    icon: MoreHorizontal,
    label: 'More',
  },
];

const SideBar = () => {
  const [isSignOutModalOpen, setSignOutModalOpen] = useState(false);

  const handleOpenSignOutModal = () => {
    setSignOutModalOpen(true);
  };

  const handleCloseSignOutModal = () => {
    setSignOutModalOpen(false);
  };

  return (
    <div className={`h-screen w-auto md:w-60 p-4 fixed flex flex-col`}>
      <div className="cursor-pointer px-3">
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

      <div className="flex mt-10 items-center px-2.5 hover:bg-slate-900 hover:p-3 p-3 rounded-full cursor-pointer">
        <div>
          <Avatar src="/x-big.jpg" alt="Avatar" width={10} height={10} />
        </div>
        <div className="text-white md:flex md:flex-col ml-2 hidden">
          <p className="font-semibold">username</p>
          <p className="text-xs text-muted-foreground">username</p>
        </div>
        <MoreHorizontal
          className="text-white ml-4 hidden md:inline-flex"
          onClick={handleOpenSignOutModal}
        />

        {/* SignOut Modal */}
        <Modal
          open={isSignOutModalOpen}
          onClose={handleCloseSignOutModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 300,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 2,
            }}
          >
            <div>
              <p>Do you want to sign out?</p>
              <Button onClick={handleCloseSignOutModal}>Cancel</Button>
              <Button onClick={'/* Add signout logic */'}>Sign Out</Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default SideBar;

// import React from 'react';

// const Tweet = () => {
//   return (
//     <div>
//       <div class="heading text-center font-bold text-2xl m-5 text-gray-800">
//         New Post
//       </div>
//       <style>body</style>
//       <div class="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
//         <input
//           class="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
//           spellcheck="false"
//           placeholder="Title"
//           type="text"
//         />
//         <textarea
//           class="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
//           spellcheck="false"
//           placeholder="Describe everything about this post here"
//         ></textarea>

//         <div class="icons flex text-gray-500 m-2">
//           <svg
//             class="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               stroke-linecap="round"
//               stroke-linejoin="round"
//               stroke-width="2"
//               d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//             />
//             <path
//               stroke-linecap="round"
//               stroke-linejoin="round"
//               stroke-width="2"
//               d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//             />
//           </svg>
//           <svg
//             class="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               stroke-linecap="round"
//               stroke-linejoin="round"
//               stroke-width="2"
//               d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//             />
//           </svg>
//           <svg
//             class="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               stroke-linecap="round"
//               stroke-linejoin="round"
//               stroke-width="2"
//               d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
//             />
//           </svg>
//           <div class="count ml-auto text-gray-400 text-xs font-semibold">
//             0/300
//           </div>
//         </div>
//         <div class="buttons flex">
//           <div class="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">
//             Cancel
//           </div>
//           <div class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">
//             Post
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Tweet;

// 'use client';
// import React, { useState } from 'react';
// import {
//   Bell,
//   Bookmark,
//   Clipboard,
//   HomeIcon,
//   InboxIcon,
//   MoreHorizontal,
//   Search,
//   UserIcon,
// } from 'lucide-react';
// import Image from 'next/image';
// import MenuItem from './MenuItem';
// import Avatar from '@mui/material/Avatar';
// import CreateTweetCard from './CreateTweetCard';
// import { Box, Modal } from '@mui/material';

// const menuItems = [
//   {
//     icon: HomeIcon,
//     label: 'Home',
//     href: '/',
//   },
//   {
//     icon: Search,
//     label: 'Explore',
//     href: '/',
//   },
//   {
//     icon: Bell,
//     label: 'Notification',
//     href: '/',
//   },
//   {
//     icon: InboxIcon,
//     label: 'Messages',
//     href: '/',
//   },
//   {
//     icon: Bookmark,
//     label: 'Bookmark',
//     href: '/',
//   },
//   {
//     icon: Clipboard,
//     label: 'Lists',
//     href: '/',
//   },
//   {
//     icon: UserIcon,
//     label: 'Profile',
//     href: '/profile/profileId',
//   },
//   {
//     icon: MoreHorizontal,
//     label: 'More',
//     href: '/',
//   },
// ];

// const SideBar = () => {
//   const [isDropdownOpen, setDropdownOpen] = useState(false);
//   const [tweetModalOpen, setTweetModalOpen] = useState(false);

//   const handleToggleDropdown = () => {
//     setDropdownOpen(!isDropdownOpen);
//   };

//   const handleSignOut = () => {
//     // Add signout logic here
//     setDropdownOpen(false);
//   };

//   const handleOpenTweetModal = () => {
//     setTweetModalOpen(true);
//   };

//   const handleCloseTweetModal = () => {
//     setTweetModalOpen(false);
//   };

//   return (
//     <div className={`h-screen w-auto md:w-60 p-4 fixed flex flex-col`}>
//       <div className="cursor-pointer px-3">
//         <Image src={'/x.png'} width={30} height={30} alt="logo" />
//       </div>

//       <div className="flex flex-col">
//         {menuItems.map((item) => (
//           <MenuItem
//             key={item.label}
//             icon={item.icon}
//             label={item.label}
//             href={item.href}
//           />
//         ))}
//       </div>

//       <button
//         onClick={handleOpenTweetModal}
//         className="bg-blue-200 mt-2 hover:bg-blue-600  text-black hover:text-white font-bold py-2 px-2 focus:outline-none rounded-full focus:shadow-outline md:py-3 md:px-6 md:text-lg lg:text-xl"
//       >
//         Tweet
//       </button>

//       <div className="flex mt-10 items-center px-2.5  hover:bg-blue-200 p-2 rounded-full cursor-pointer relative">
//         <div>
//           <Avatar src="/x-big.jpg" alt="Avatar" width={10} height={10} />
//         </div>
//         <div className="text-black md:flex md:flex-col hover:text-white ml-2 hidden">
//           <p className="font-semibold">username</p>
//           <p className="text-xs text-muted-foreground">username</p>
//         </div>
//         <MoreHorizontal
//           className="text-black ml-4 hidden md:inline-flex hover:text-white cursor-pointer"
//           onClick={handleToggleDropdown}
//         />
//       </div>

//       <Modal open={tweetModalOpen} onClose={handleCloseTweetModal}>
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '20%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 600,
//             bgcolor: 'background.paper',
//             boxShadow: 24,
//             p: 1,
//           }}
//         >
//           <CreateTweetCard />
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default SideBar;
