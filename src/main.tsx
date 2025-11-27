import { createRoot } from 'react-dom/client';
import './index.css'; // ✅ Tailwind import
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MyPage from './routers/MyPage';
import SearchPage from './routers/SearchPage';
import MainPage from './routers/MainPage';
import { Layout } from './components/layout/Layout';
import MainLoginPage from './loginPage/MainLoginPage';
import LoginPage from './loginPage/LoginPage';
import SignupPage from './loginPage/SignupPage';
import CreatePost from './routers/pages/post/createPost/CreatePost';
import ChatPage from './routers/ChatPage';

const router = createBrowserRouter([
  
  // 로그인 전
  { path: '/', element: <MainLoginPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
  {
    element: <Layout />,
    children: [
      // 로그인 후 메인 페이지
      { path: '/todocalendar', element: <MainPage /> },
      { path: '/postfeed', element: <SearchPage /> },
      { path: '/alert', element: <ChatPage /> },
      { path: '/user/my', element: <MyPage /> },
      // 추가 페이지
      { path: '/createpost', element: <CreatePost /> },
      { path: '/user/:userId', element: <MyPage /> },
      // { path: '/post/user/:postId', element: <EachPost  /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
