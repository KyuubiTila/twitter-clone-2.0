import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ProfileHeader = ({ profileId }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="border border-black rounded-lg p-2">
        <div className="flex py-1 px-2 justify-between">
          <Link
            href={`/profile/${profileId}/update-profile`}
            className="bg-blue-600 active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-2 py-1 rounded outline-none focus:outline-none xs:mr-1 mb-0.5 ease-linear transition-all duration-150 inline-flex items-center"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M10.5 22H6.59087C5.04549 22 3.81631 21.248 2.71266 20.1966C0.453365 18.0441 4.1628 16.324 5.57757 15.4816C8.12805 13.9629 11.2057 13.6118 14 14.4281"
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
                d="M18.4332 13.8485C18.7685 13.4851 18.9362 13.3035 19.1143 13.1975C19.5442 12.9418 20.0736 12.9339 20.5107 13.1765C20.6918 13.2771 20.8646 13.4537 21.2103 13.8067C21.5559 14.1598 21.7287 14.3364 21.8272 14.5214C22.0647 14.9679 22.0569 15.5087 21.8066 15.9478C21.7029 16.1298 21.5251 16.3011 21.1694 16.6437L16.9378 20.7194C16.2638 21.3686 15.9268 21.6932 15.5056 21.8577C15.0845 22.0222 14.6214 22.0101 13.6954 21.9859L13.5694 21.9826C13.2875 21.9752 13.1466 21.9715 13.0646 21.8785C12.9827 21.7855 12.9939 21.6419 13.0162 21.3548L13.0284 21.1988C13.0914 20.3906 13.1228 19.9865 13.2807 19.6232C13.4385 19.2599 13.7107 18.965 14.2552 18.375L18.4332 13.8485Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>

            <p className="ml-1 mr-2">Edit Profile</p>
          </Link>
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
        </div>

        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-400">
            <Image
              width={20}
              height={20}
              src="/x-big.jpg"
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="text-center mt-1">
          <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-1">
            Jenna Stones
          </h3>
        </div>

        <div className="flex justify-center py-1 lg:pt-2">
          <div className="mr-2 p-1 text-center">
            <span className="text-xs font-bold block uppercase tracking-wide text-blueGray-600">
              22
            </span>
            <span className="text-xs text-blueGray-400">Followers</span>
          </div>
          <div className="mr-2 p-1 text-center">
            <span className="text-xs font-bold block uppercase tracking-wide text-blueGray-600">
              10
            </span>
            <span className="text-xs text-blueGray-400">Following</span>
          </div>
          <div className="lg:mr-2 p-1 text-center">
            <span className="text-xs font-bold block uppercase tracking-wide text-blueGray-600">
              89
            </span>
            <span className="text-xs text-blueGray-400">Comments</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center">
          <div className="w-full lg:w-9/12 px-2">
            <p className="mb-1 text-xs text-center leading-relaxed text-blueGray-700">
              An artist of considerable range, Jenna the name taken by
              Melbourne-raised, Brooklyn-based Nick Murphy writes, performs and
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
