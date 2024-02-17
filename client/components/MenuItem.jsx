'use client';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

const MenuItem = ({ icon: Icon, label, href }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };

  return (
    <div
      onClick={handleClick}
      className={`font-bold text-xl mt-1 flex gap-5 text-black w-full items-center px-4  hover:bg-blue-200 hover:text-white hover:p-3 p-3 rounded-full cursor-pointer`}
    >
      <Icon />
      <p className="hidden md:inline-flex">{label}</p>
    </div>
  );
};

export default MenuItem;
