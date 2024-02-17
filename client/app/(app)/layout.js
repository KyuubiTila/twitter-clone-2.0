import SideBar from '@/components/SideBar';
import Widgets from '@/components/Widgets';

export default function AppLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto min-h-screen">
      {/* Sidebar */}
      <div className="w-16 md:w-60 fixed h-full ">
        <SideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-16 md:ml-60 p-4 ">{children}</div>

      {/* Widgets - Hidden on smaller screens */}
      <div className="hidden lg:inline-flex max-w-96">
        <Widgets />
      </div>
    </div>
  );
}
