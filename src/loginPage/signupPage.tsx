import { useState } from 'react';
import { SlArrowLeftCircle } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import { api } from '../components/api';

type User = {
  id?: number;
  email: string;
  password: string;
};

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  // 회원 가입 버튼
  const handleSubmit = async () => {
    if (!email) {
      setMsg('이메일을 입력해주세요.');
      return;
    }
    if (!password) {
      setMsg('비밀번호를 입력해주세요.');
      return;
    }
    // Axios.Post 회원 가입
    try {
      const res = await api.post('/auth/signup', {
        email,
        password,
      });
      console.log(res.data);
      setEmail('');
      setPassword('');
      alert('회원가입이 완료되었습니다.');
      navigate('/');
    } catch (error) {
      setMsg('회원가입에 실패하였습니다.');
      console.error(error);
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
        <h2 className="text-center font-bold flex-1">가입하기</h2>
        <div className="flex-1"></div>
      </div>
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="이메일 등록"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          autoComplete="email"
          required
          className="rounded-xl bg-gray-100 m-1 p-4 text-sm font-bold focus:border-none "
        />
        <input
          type="password"
          placeholder="비밀번호 등록"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          autoComplete="new-password"
          required
          className="rounded-xl bg-gray-100 m-1 p-4 text-sm font-bold"
        />
      </div>
      <div className="mt-2">
        <div className="m-1 py-1 text-gray-600">
          <input type="checkbox"></input>
          <label>
            <span className="text-orange-600"> 필수</span> | 만 14세 이상입니다.
          </label>
        </div>
        <div className="m-1 py-1 text-gray-600">
          <input type="checkbox"></input>
          <label> 선택 | 마케팅 정보 수신에 동의합니다.</label>
        </div>
        <p className="text-sm text-gray-600 m-1 py-1">
          다른 기기에서도 로그인 할 수 있습니다. 가입 시 메이크플랜의
          <span className="text-blue-500"> 이용약관</span>과
          <span className="text-blue-500"> 개인정보 정책</span>에 동의하게
          됩니다.
        </p>
      </div>
      <div className="text-center">
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-black text-white w-fit rounded-full p-3.5 px-6 m-4 text-sm font-bold hover:cursor-pointer"
        >
          이메일 인증
        </button>
        {msg && <p className="text-red-400 text-sm">{msg}</p>}
      </div>
    </div>
  );
};

export default SignupPage;
