'use client';
import { SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

import Link from 'next/link';

const Widgets = () => {
  const [whatsHappening, setWhatsHappening] = useState([]);
  const [WhoToFollow, SetWHoToFollow] = useState([]);
  const [articleNumber, setArticleNumber] = useState(3);
  const [RandomUserNumber, setRandomUserNumber] = useState(3);
  useEffect(() => {
    async function GetWhatsHappeningData() {
      const res = await fetch(
        'https://saurav.tech/NewsAPI/top-headlines/category/technology/in.json'
      );
      const data = await res.json();
      setWhatsHappening(data.articles);
    }
    GetWhatsHappeningData();
    async function GetWhoToFollow() {
      const res = await fetch(
        'https://randomuser.me/api/?results=25&inc=name,login,picture'
      );
      const data = await res.json();
      SetWHoToFollow(data.results);
    }
    GetWhoToFollow();
  }, []);

  function handleShowMore() {
    setArticleNumber(articleNumber + 3);
  }

  return (
    <div className="text-white mt-1 flex flex-col ml-8 mr-4 border-b-black w-full">
      <div className="sticky top-0 ">
        <div className="flex bg-white text-black mb-2 p-3 mt-2 rounded-full gap-4 border border-blue-200">
          <SearchIcon className="cursor-pointer" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent focus:outline-none "
          />
        </div>
      </div>
      <div className=" bg-white rounded-xl mt-4 border border-blue-200 ">
        <h2 className="text-center text-black text-lg font-semibold p-2">
          Whats happening
        </h2>
        <div className="flex flex-col mt-2">
          {whatsHappening &&
            whatsHappening.slice(0, articleNumber).map((event) => (
              <div
                className=" flex mb-4 text-black px-2 gap-1 border border-blue-100  hover:bg-blue-200 py-2 rounded-lg cursor-pointer"
                key={event.title}
              >
                <Link
                  href={event.url}
                  className="flex gap-3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div>
                    <p className="text-sm text-muted-foreground line-clamp-2 font-medium mb-1">
                      {event.title}
                    </p>
                    <p className="text-xs">{event.author}</p>
                  </div>
                  <img
                    className="rounded-lg "
                    src={event.urlToImage}
                    width={50}
                    height={50}
                    alt="whats happening image"
                  />
                </Link>
              </div>
            ))}
          <Button
            type="button"
            onClick={handleShowMore}
            varient="link"
            className=" text-black "
          >
            Show more
          </Button>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-2 bg-white rounded-xl border border-blue-200 sticky top-16">
        <h2 className="text-center text-black text-lg font-semibold p-2">
          Who to follow
        </h2>
        {WhoToFollow &&
          WhoToFollow.slice(0, RandomUserNumber).map((user) => (
            <div
              key={user.login.uuid}
              className="flex items-center justify-start gap-6 px-4 py-2 border border-black-100  hover:bg-blue-200 cursor-pointer"
            >
              <div>
                <img
                  className="rounded-full"
                  src={user.picture.large}
                  width={50}
                  height={50}
                  alt="whats happening image"
                />
              </div>
              <div>
                <p className="font-semibold text-black hover:underline truncate">
                  {user.name.first}
                </p>
                <p className="text-sm text-black text-muted-foreground">
                  {user.login.username}
                </p>
              </div>
              <Button className="text-black  rounded-2xl bg-white ml-auto hover:text-white">
                Follow
              </Button>
            </div>
          ))}
        <Button
          variant="link"
          className=" text-black "
          onClick={() => setRandomUserNumber(RandomUserNumber + 3)}
        >
          See more
        </Button>
      </div>
    </div>
  );
};

export default Widgets;
