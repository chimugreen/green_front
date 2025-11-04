import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // ✅ App 컴포넌트 임포트
import './index.css'; // ✅ Tailwind import

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* ✅ App 컴포넌트 렌더링 */}
    <App />{' '}
  </StrictMode>
);
