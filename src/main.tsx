import { createRoot } from 'react-dom/client';
import App from './App'; // ✅ App 컴포넌트 임포트
import './index.css'; // ✅ Tailwind import
import Login from './loginPage/LoginPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignupPage from './loginPage/SignupPage';
import CreatePost from './SearchPage/CreatePost';
import EachUser from './components/EachUser';
import MyPage from './routers/MyPage';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignupPage /> },
  { path: '/createPost', element: <CreatePost /> },
  { path: '/user/:userId', element: <MyPage /> },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
