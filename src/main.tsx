import { createRoot } from 'react-dom/client';
import App from './App'; // ✅ App 컴포넌트 임포트
import './index.css'; // ✅ Tailwind import
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreatePost from './SearchPage/CreatePost';
import MyPage from './routers/MyPage';
import SearchPage from './routers/SearchPage';
import FeedPage from './routers/FeedPage';
import AlertPage from './routers/AlertPage';
import { Layout } from './components/Layout';
import MainLoginPage from './loginPage/MainLoginPage';
import LoginPage from './loginPage/LoginPage';
import SignupPage from './loginPage/SignupPage';

const router = createBrowserRouter([
  // 로그인 전
  { path: '/', element: <MainLoginPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
  {
    element: <Layout />,
    children: [
      // 로그인 후 메인 페이지
      { path: '/todoCalendar', element: <FeedPage /> },
      { path: '/postFeed', element: <SearchPage /> },
      { path: '/alert', element: <AlertPage /> },
      { path: '/user/:userId', element: <MyPage /> },
      // 추가 페이지
      { path: '/createPost', element: <CreatePost /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
