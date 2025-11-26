import { Outlet } from 'react-router-dom';
import { MainFooter } from './MainFooter';
export const Layout = () => {
  return (
    <div>
      <div className="pb-[72px]">
        <Outlet />
      </div>
      <MainFooter />
    </div>
  );
};
