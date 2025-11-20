import { useState } from 'react';
import { SlArrowLeftCircle } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import { loginUseCase } from '../useCase/loginUseCase';
import { userInfoStorage } from '../utils/userInfoStorage';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await loginUseCase(email, password);
      alert('로그인 완료되었습니다.');
      navigate('/todoCalendar');
    } catch (error) {
      console.error(error);
      alert('로그인 실패했습니다.');
    }
  };

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
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          autoComplete="email"
          required
          className="rounded-xl bg-gray-100 m-1 p-4 text-sm font-bold focus:border-none "
        />
        <input
          type="password"
          placeholder="비밀번호"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          autoComplete="new-password"
          required
          className="rounded-xl bg-gray-100 m-1 p-4 text-sm font-bold"
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <button
          type="submit"
          className="bg-black text-white w-fit rounded-full p-3.5 px-6 m-4 text-sm font-bold hover:cursor-pointer"
          // onClick => 버튼 클릭시 발생하는 이벤트 처리
          // callBack 함수 {() => {안에 있는 함수 실행}}
          onClick={() => {
            handleLogin();
          }}
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

export default LoginPage;
