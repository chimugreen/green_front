import React from 'react';
import { SlArrowLeftCircle } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="mx-auto my-2 max-w-180 flex flex-col p-3">
      <div className="flex m-1 px-1 py-3">
        <button
          className="flex-1 text-left px-0.5 hover:cursor-pointer"
          onClick={() => navigate('/')}
        >
          <SlArrowLeftCircle />
        </button>
        <h2 className="text-center font-bold flex-1">로그인</h2>
        <div className="flex-1"></div>
      </div>
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="이메일"
          required
          className="rounded-xl bg-gray-100 m-1 p-4 text-sm font-bold focus:border-none "
        />
        <input
          type="password"
          placeholder="비밀번호"
          required
          className="rounded-xl bg-gray-100 m-1 p-4 text-sm font-bold"
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <button
          type="submit"
          className="bg-black text-white w-fit rounded-full p-3.5 px-6 m-4 text-sm font-bold hover:cursor-pointer"
        >
          확인
        </button>
        <p className="text-gray-400 text-sm hover:cursor-pointer">
          비밀번호를 잊었다면?
        </p>
      </div>
    </div>
  );
};

export default Login;
