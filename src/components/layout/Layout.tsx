import { Outlet } from 'react-router-dom';
import { MainFooter } from './MainFooter';
export const Layout = () => {
  return (
    <div>
      <Outlet />
      <MainFooter />
    </div>
  );
};
