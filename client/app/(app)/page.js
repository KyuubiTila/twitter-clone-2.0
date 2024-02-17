import Header from '@/components/Header';
import Post from '@/components/Post';
import CreateTweetCard from '../../components/CreateTweetCard';

export default function Home() {
  return (
    <div className="md:mr-60 lg:mr-60 w-full">
      <div className="w-full border-gray-800 border-2 ">
        <Header />
        <div className="p-4">
          <CreateTweetCard />
          <Post />
        </div>
      </div>
    </div>
  );
}
