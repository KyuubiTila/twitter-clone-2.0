'use client';
import SideBar from '@/components/SideBar';
import Widgets from '@/components/Widgets';
import { useAuth } from '@/stores/auth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NoSSR from 'react-no-ssr';

export default function AppLayout({ children }) {
  const router = useRouter();

  const { user, userDetailsRefetch, loggedIn } = useAuth();

  useEffect(() => {
    userDetailsRefetch();
  }, [userDetailsRefetch]);

  useEffect(() => {
    if (!loggedIn) {
      router.push('/signin');
    }
  }, [loggedIn, router]);

  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto min-h-screen">
      {/* Sidebar */}
      <NoSSR>
        <div className="w-16 md:w-60 fixed h-full ">
          <SideBar user={user} />
        </div>
      </NoSSR>

      {/* Main Content */}
      <div className="flex-1 ml-16 md:ml-60 p-4 ">{children}</div>

      {/* Widgets - Hidden on smaller screens */}
      <div className="hidden lg:inline-flex max-w-96">
        <Widgets />
      </div>
    </div>
  );
}
