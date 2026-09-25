import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import SearchOverlay from '../ui/SearchOverlay';
import AssistantWidget from '../ui/AssistantWidget';
import { useApp } from '../../hooks/useApp';

export default function Layout() {
  const { searchOpen } = useApp();

  return (
    <div className="flex min-h-screen bg-slate-100/80">
      <Sidebar />
      <div className="main-layout flex flex-col min-h-screen min-w-0">
        <Topbar />
        <main className="flex-1 p-5 lg:p-7 xl:p-8">
          <div className="max-w-[1400px] mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>

      {searchOpen && <SearchOverlay />}
      <AssistantWidget />
    </div>
  );
}
