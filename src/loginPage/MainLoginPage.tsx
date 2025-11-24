import { useNavigate } from 'react-router-dom';

import logo from '../img/icon.png';
import { useState } from 'react';
import MainAppModal from '../components/MainAppModal';
// import MainPage from '../routers/MainPage';

const MainLoginPage = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="text-center">
        <img className="size-50" src={logo}></img>
        <h2 className="font-extrabold text-3xl py-2">make plan</h2>
        <p className="text-sm text-gray-500">
          할 일을 작성하고 매일을 기록해보세요.
        </p>
      </div>
      <div className="flex flex-col m-3">
        <button
          className="bg-black text-white w-80 rounded-full py-3 px-4 text-sm font-bold m-1 hover:cursor-pointer"
          onClick={() => navigate('/login')}
        >
          로그인
        </button>
        <button
          className="bg-black text-white w-80 rounded-full py-3 px-4 m-1 text-sm font-bold hover:cursor-pointer"
          onClick={() => navigate('/signup')}
        >
          회원가입
        </button>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-800">
          데스크탑 버전으로 더 편리하게 이용해 보세요.
        </p>
        <p
          className="text-sm hover:cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
          다운로드
        </p>
      </div>

      <MainAppModal open={modalOpen} onClose={() => setModalOpen(false)}>
        <p className="text-center py-2 m-1 text-gray-500">
          데스크탑 앱 다운로드
        </p>
        <button className="bg-gray-100 py-2 m-1 rounded-lg text-gray-700 hover:cursor-pointer">
          윈도우
        </button>
        <button className="bg-gray-100 py-2 m-1 rounded-lg text-gray-700 hover:cursor-pointer">
          맥OS
        </button>
        <button
          className="bg-gray-100 py-2 m-1 rounded-lg text-gray-700 hover:cursor-pointer"
          onClick={() => setModalOpen(false)}
        >
          취소
        </button>
      </MainAppModal>
    </div>
  );
};

export default MainLoginPage;
