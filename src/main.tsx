import { createRoot } from 'react-dom/client';
import App from './App'; // ✅ App 컴포넌트 임포트
import './index.css'; // ✅ Tailwind import
import Login from './loginPage/loginPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignupPage from './loginPage/SignupPage';
import EachUser from './components/EachUser';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignupPage /> },
  { path: '/userDetail', element: <EachUser /> },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
