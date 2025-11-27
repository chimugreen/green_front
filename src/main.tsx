import { createRoot } from 'react-dom/client';
import './index.css'; // ✅ Tailwind import
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MyPage from './routers/MyPage';
import SearchPage from './routers/SearchPage';
import FeedPage from './routers/MainPage';
import AlertPage from './routers/AlertPage';
import { Layout } from './components/layout/Layout';
import MainLoginPage from './loginPage/MainLoginPage';
import LoginPage from './loginPage/LoginPage';
import SignupPage from './loginPage/SignupPage';
import CreatePost from './routers/pages/post/createPost/CreatePost';

const router = createBrowserRouter([
  // 로그인 전
  { path: '/', element: <MainLoginPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
  {
    element: <Layout />,
    children: [
      // 로그인 후 메인 페이지
      { path: '/todocalendar', element: <FeedPage /> },
      { path: '/postfeed', element: <SearchPage /> },
      { path: '/alert', element: <AlertPage /> },
      { path: '/user/my', element: <MyPage /> },
      // 추가 페이지
      { path: '/createpost', element: <CreatePost /> },
      { path: '/user/:userId', element: <MyPage /> },
      // 추가 페이지
      { path: '/createpost', element: <CreatePost /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
