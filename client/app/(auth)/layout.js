import React from 'react';
import '../globals.css';
import Image from 'next/image';

export default function AuthLayout({ children }) {
  return (
    <div className="w-full">
      <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
        <div className="g-0 lg:flex lg:flex-wrap">
          <div className="flex items-center bg-blue-500  lg:w-6/12  ">
            <div className="px-4 py-6 text-white md:mx-6 md:p-12">
              <Image
                className="ml-2 "
                width={500}
                height={500}
                src="/xx.png"
                alt="profile"
              />
            </div>
          </div>
          {/* <div className="lg:w-6/12 container flex items-center justify-center min-h-screen px-6 mx-auto">
            {children}
          </div> */}

          {children}
        </div>
      </div>
    </div>
  );
}
