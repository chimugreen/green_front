// import React, { useState } from 'react';
import logo from '../img/icon.png';
import feedPic from '../img/feedpic.jpg';
import fPic from '../img/f.jpg';
import mala from '../img/mala.jpeg';
import { SlArrowLeftCircle } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// 개인 페이지
const EachUser = () => {
  // const [images, setImages] = useState<string[]>([]);
  const images = [feedPic, fPic, mala];
  const navigate = useNavigate();
  const [isFollowed, setIsFollowed] = useState(false);

  // 팔로우 버튼 - 다시 누르면 팔로우 취소
  const handleFollow = () => {
    setIsFollowed((prev) => !prev);
  };

  return (
    <div className="flex flex-col max-w-120 mx-auto my-5">
      <div className="my-1 mx-auto max-w-120">
        <div className="flex items-center my-2 w-screen">
          <button
            className="flex px-2 hover:cursor-pointer"
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
          <p className="font-bold text-xl">nick</p>
          <p className="text-gray-600 text-sm">email@email</p>
          <div className="flex text-sm py-0.5">
            <p>게시물</p> <p className="font-bold px-1">{images.length}</p>
            <p>팔로워</p> <p className="font-bold px-1">1천</p>
            <p>팔로잉</p> <p className="font-bold pl-1">1천</p>
          </div>
          {/* 팔로우 버튼 */}
          <button
            onClick={handleFollow}
            className={`${
              isFollowed
                ? 'text-sm bg-gray-200 p-2 rounded-xl transition-all cursor-pointer'
                : 'text-sm bg-sky-600 p-2 rounded-xl text-white transition-all cursor-pointer'
            }`}
          >
            {isFollowed ? '팔로우 취소' : '팔로우'}
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

export default EachUser;
