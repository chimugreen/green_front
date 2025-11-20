import { createRoot } from 'react-dom/client';
import App from './App'; // ✅ App 컴포넌트 임포트
import './index.css'; // ✅ Tailwind import
import Login from './loginPage/LoginPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignupPage from './loginPage/SignupPage';
import CreatePost from './SearchPage/CreatePost';
import MyPage from './routers/MyPage';
import SearchPage from './routers/SearchPage';
import FeedPage from './routers/FeedPage';
import AlertPage from './routers/AlertPage';
import { Layout } from './components/Layout';
import MainLoginPage from './loginPage/MainLoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // 로그인 전
      { path: '/', element: <MainLoginPage /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <SignupPage /> },
      // 로그인 후 메인 페이지
      { path: '/todoCalendar', element: <FeedPage /> },
      { path: '/postFeed', element: <SearchPage /> },
      { path: '/alert', element: <AlertPage /> },
      { path: '/user/:userId', element: <MyPage /> },
      //
      { path: '/createPost', element: <CreatePost /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
