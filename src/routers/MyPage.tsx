// import React, { useState } from 'react';
import logo from '../img/icon.png';
import feedPic from '../img/feedpic.jpg';
import fPic from '../img/f.jpg';
import mala from '../img/mala.jpeg';
import { SlArrowLeftCircle } from 'react-icons/sl';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api, apiWithHeader } from '../components/api';

interface User {
  name: string;
  email: string;
  postCount: number;
  followerCount: number;
  followingCount: number;
  isFollowing: boolean;
}

// 개인 페이지
const MyPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [nickname, setNickname] = useState<string>(''); // 닉네임 표시
  const [editNick, setEditNick] = useState(false); // 닉네임 수정 가능한 상태로 변환; f:기본상태 t:수정가능

  useEffect(() => {
    const load = async () => {
      const res = await apiWithHeader.get('/user/3');
      setUser(res.data);
    };
    load();
  }, []);

  // const [images, setImages] = useState<string[]>([]);
  const images = [feedPic, fPic, mala];
  const navigate = useNavigate();

  // // 닉네임 수정 버튼
  // const handleNickname = () => {
  //   if (editNick) {
  //     // (기본) + 닉네임 저장
  //     localStorage.setItem('nickname', nickname);
  //     alert('닉네임이 변경되었습니다.');
  //     // 버튼 누른 직후 보기모드로 변경처리
  //     setTimeout(() => setEditNick(false), 0);
  //   }
  //   // 버튼 누르면 수정모드
  //   setEditNick(true);
  // };

  return (
    <div className="flex flex-col max-w-120 mx-auto my-5">
      <div className="my-1 mx-auto max-w-120">
        <div className="flex items-center my-2 w-screen">
          <button
            className="flex px-2 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <SlArrowLeftCircle />
          </button>
          <p className="font-bold text-xl px-2">make plan</p>
        </div>
      </div>
      {/* 상단 회원 정보 */}
      <div className="flex max-w-120 items-center">
        <img
          src={logo}
          alt="프로필 사진"
          className="size-25 float-start mx-3"
        />
        <div className="flex flex-col max-w-120 w-screen mx-3">
          {editNick ? (
            <input
              className="font-bold text-xl"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          ) : (
            <p className="font-bold text-xl">{user?.name}</p>
          )}
          <p className="text-gray-600 text-sm">{user?.email}</p>
          <div className="flex text-sm py-0.5">
            <p>게시물</p> <p className="font-bold px-1">{images.length}</p>
            <p>팔로워</p>
            <p className="font-bold px-1">{user?.followerCount}</p>
            <p>팔로잉</p>
            <p className="font-bold pl-1">{user?.followingCount}</p>
          </div>
          {/* 팔로우 버튼 */}
          <button
            onClick={() => setEditNick((prev) => !prev)}
            className="text-sm bg-gray-200 p-2 rounded-xl transition-all cursor-pointer"
          >
            {editNick ? '완료' : '닉네임 수정'}
          </button>
        </div>
      </div>
      {/* 사진 게시물 */}
      <div className="grid grid-flow-row grid-cols-3 mt-3">
        {images.map((c, idx) => (
          <div key={idx}>
            <img
              src={c}
              className="border border-gray-100 h-full object-cover rounded-xl cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPage;
