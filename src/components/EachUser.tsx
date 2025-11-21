// import React, { useState } from 'react';
import logo from '../img/icon.png';
import feedPic from '../img/feedpic.jpg';
import fPic from '../img/f.jpg';
import mala from '../img/mala.jpeg';
import { SlArrowLeftCircle } from 'react-icons/sl';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FollowerList from '../userPage/FollowerList';
import FollowingList from '../userPage/FollowingList';
import { useFollowData } from '../hooks/useFollowData';
import { useUserId } from '../useCase/useUserId';
import { apiWithHeader } from './api';

interface EachUserProps {
  userId: number;
}

// 개인 페이지
const EachUser = ({ userId }: EachUserProps) => {
  // 임시 유저페이지 사진보여줌
  const images = [feedPic, fPic, mala];
  const navigate = useNavigate();
  // 'user/{userId}' 형식의 주소
  const { loadedUserData, isLoading } = useUserId(userId);

  // 팔로워, 팔로잉 가져오기
  const [followerOpen, setFollowerOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);
  const { follower, following, loadingFollower, loadingFollowing } =
    useFollowData(userId);

  // 팔로우 버튼 - 다시 누르면 팔로우 취소
  const [isFollowed, setIsFollowed] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    if (!loadedUserData) return;
    setIsFollowed(loadedUserData.isFollowing);
    setFollowerCount(loadedUserData.followerCount);
    // setIsFollowed((prev) => !prev);
  }, [loadedUserData]);

  // const handleFollow = async () => {
  //   if (!userId) return;

  //   try {
  //     if (isFollowed) {
  //       // 언팔
  //       await apiWithHeader.delete(`/user/followings/${userId}`);
  //       setIsFollowed(false);
  //       setFollowerCount((prev) => Math.max(prev - 1, 0));
  //     } else {
  //       // 팔로우
  //       await apiWithHeader.post(`/user/followings/${userId}`);
  //       setIsFollowed(true);
  //       setFollowerCount((prev) => prev + 1);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleFollow = () => {
    setIsFollowed((prev) => !prev);
    setFollowerCount((prev) => (isFollowed ? Math.max(prev - 1, 0) : prev + 1));
  };

  // // 유저 닉네임 변경
  // const [nickname, setNickname] = useState(users?.name || ''); // 닉네임 표시
  // const [editNick, setEditNick] = useState(false); // 닉네임 수정 가능한 상태로 변환; f:기본상태 t:수정가능

  // 닉네임 수정 버튼
  // const handleNickname = async () => {
  //   try {
  //     const res = await apiWithHeader.patch(`/user/${numericUserId}`, {
  //       name: nickname,
  //     });
  //     setUsers(res.data);
  //     setEditNick(false);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  if (isLoading) return <p>로딩 중 ...</p>;

  return (
    <div className="flex flex-col max-w-120 mx-auto my-2">
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
          {/* {editNick ? (
            <input
              className="font-bold text-xl"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          ) : (
            <p className="font-bold text-xl">{users?.name}</p>
          )} */}
          <p className="font-bold text-xl">{loadedUserData?.name}</p>
          <p className="text-gray-600 text-sm">{loadedUserData?.email}</p>
          <div className="flex text-sm py-0.5">
            <p>게시물</p> <p className="font-bold px-1">{images.length}</p>
            <p>팔로워</p>
            <p
              onClick={() => setFollowerOpen(true)}
              className="font-bold px-1 cursor-pointer"
            >
              {loadedUserData?.followerCount}
            </p>
            <p>팔로잉</p>
            <p
              onClick={() => setFollowingOpen(true)}
              className="font-bold pl-1 cursor-pointer"
            >
              {loadedUserData?.followingCount}
            </p>
          </div>
          {/* 팔로우 버튼 */}
          {/* <button
            onClick={() => setEditNick((prev) => !prev)}
            className="text-sm bg-gray-200 p-2 rounded-xl transition-all cursor-pointer"
          >
            {editNick ? '완료' : '닉네임 수정'}
          </button> */}
          <button
            onClick={handleFollow}
            value={followerCount}
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
      <FollowerList open={followerOpen} onClose={() => setFollowerOpen(false)}>
        <div className="flex flex-col">
          <p className="font-bold text-center p-2">팔로워</p>
          {loadingFollower ? (
            <p>로딩 중 。。。</p>
          ) : (
            follower.map((u) => (
              <div key={u.userId} className="flex">
                <img
                  src={u.profileImageUrl}
                  alt="프로필 사진"
                  className="size-10 float-left rounded-full"
                />
                <p>{u.name}</p>
              </div>
            ))
          )}
        </div>
      </FollowerList>
      <FollowingList
        open={followingOpen}
        onClose={() => setFollowingOpen(false)}
      >
        <div className="flex flex-col">
          <p className="font-bold text-center p-2">팔로잉</p>
          {loadingFollowing ? (
            <p>로딩 중 。。。</p>
          ) : (
            following.map((u) => (
              <div key={u.userId} className="flex">
                <img
                  src={u.profileImageUrl}
                  alt="프로필 사진"
                  className="size-10 float-left rounded-full"
                />
                <p>{u.name}</p>
              </div>
            ))
          )}
        </div>
      </FollowingList>
    </div>
  );
};

export default EachUser;
