import React from 'react';
import Image from 'next/image';

const OnHoverCard = () => {
  return (
    <div className="w-full">
      <div className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center py-1">
          <Image
            className="w-10 h-10 mb-1 rounded-full shadow-lg"
            width={10}
            height={10}
            src="/x-big.jpg"
            alt="user's image"
          />
          <h5 className="mb-1 text-xm font-medium text-gray-900 dark:text-white">
            Bonnie Green
          </h5>

          <div className="flex justify-center  ">
            <div className="mr-2  text-center">
              <span className="text-xs font-bold block uppercase tracking-wide text-blueGray-600">
                22
              </span>
              <span className="text-xs text-blueGray-400">Followers</span>
            </div>
            <div className="mr-2  text-center">
              <span className="text-xs font-bold block uppercase tracking-wide text-blueGray-600">
                10
              </span>
              <span className="text-xs text-blueGray-400">Following</span>
            </div>
          </div>
          <span className="text-xs px-2 text-center text-gray-500 dark:text-gray-400">
            Visual Designer Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Ex pariatur magni dolorem distinctio dolores veritatis.
          </span>
          <div className="flex mt-1 mb-1">
            <button
              className="bg-blue-600 active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-2 py-1 rounded outline-none focus:outline-none xs:mr-1 mb-0.5 ease-linear transition-all duration-150 inline-flex items-center"
              type="button"
            >
              {true ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M12.5 22H6.59087C5.04549 22 3.81631 21.248 2.71266 20.1966C0.453365 18.0441 4.1628 16.324 5.57757 15.4816C7.67837 14.2307 10.1368 13.7719 12.5 14.1052C13.3575 14.2261 14.1926 14.4514 15 14.7809"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M18.5 22L18.5 15M15 18.5H22"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <p className="ml-1 mr-2">Follow</p>
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M12.5 22H6.59087C5.04549 22 3.81631 21.248 2.71266 20.1966C0.453365 18.0441 4.1628 16.324 5.57757 15.4816C7.67837 14.2307 10.1368 13.7719 12.5 14.1052C13.3575 14.2261 14.1926 14.4514 15 14.7809"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.5 6.5C15.5 8.98528 13.4853 11 11 11C8.51472 11 6.5 8.98528 6.5 6.5C6.5 4.01472 8.51472 2 11 2C13.4853 2 15.5 4.01472 15.5 6.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M15 18.5H22"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>

                  <p className="ml-1 mr-2">Unfollow</p>
                </>
              )}
            </button>
            <a
              href="#"
              className="py-2 px-4 ms-2 text-xs uppercase font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Message
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnHoverCard;
