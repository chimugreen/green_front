import { Outlet } from 'react-router-dom';
import { MainFooter } from './MainFooter';
export const Layout = () => {
  return (
    <div>
      <Outlet />
      <footer className="fixed bottom-0 pt-2 h-auto w-full bg-white">
        <MainFooter />
      </footer>
    </div>
  );
};
