// import React, { useState } from 'react';
import logo from '../img/icon.png';
import feedPic from '../img/feedpic.jpg';
import fPic from '../img/f.jpg';
import mala from '../img/mala.jpeg';
import { SlArrowLeftCircle } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FollowerList from '../userPage/FollowerList';
import FollowingList from '../userPage/FollowingList';
import { useFollowData } from '../hooks/useFollowData';
import { useUserId } from '../useCase/useUserId';
import { apiWithHeader } from './api';
import { userInfoStorage } from '../utils/userInfoStorage';

interface EachUserProps {
  userId: number;
}

// 개인 페이지
const EachUser = ({ userId }: EachUserProps) => {
  const loadUserId = Number(userId);
  // 임시 유저페이지 사진보여줌
  const images = [feedPic, fPic, mala];
  const navigate = useNavigate();
  // 'user/{userId}' 형식의 주소
  const { setLoadedUserData, loadedUserData, isLoading } =
    useUserId(loadUserId);
  // 로그인한 사용자의 userId가져오기
  const myId = Number(userInfoStorage.getUserId());
  // 로그인한 사용자의 userId와 로드된 userId가 같은지
  const isMine = myId === loadUserId;

  // 팔로워, 팔로잉 가져오기
  const [followerOpen, setFollowerOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);
  const { follower, following, loadingFollower, loadingFollowing } =
    useFollowData(loadUserId);

  // 팔로우 버튼 - 다시 누르면 팔로우 취소
  const [isFollowed, setIsFollowed] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  console.log('myId, userId, isMine:', myId, userId, isMine);

  useEffect(() => {
    if (!loadedUserData) return;
    setIsFollowed(loadedUserData.isFollowing);
    setFollowerCount(loadedUserData.followerCount);
    setNickname(loadedUserData.name); // 유저 데이터 들어오면 닉네임에 반영
  }, [loadedUserData]);

  const handleFollow = () => {
    setIsFollowed((prev) => {
      setFollowerCount((prevCount) => (isFollowed ? Math.max(prevCount - 1, 0) : prevCount + 1));
      return !prev;
    })

  };

  // 유저 닉네임 변경
  const [nickname, setNickname] = useState(''); // 닉네임 표시
  const [editNick, setEditNick] = useState(false); // 닉네임 수정 가능한 상태로 변환; f:기본상태 t:수정가능

  // 닉네임 수정 버튼
  const handleNickname = async () => {
    if (!loadedUserData) return;

    const trimmedName = nickname.trim();
    if (!trimmedName) return alert('수정할 닉네임을 입력해주세요.');

    try {
      const res = await apiWithHeader.post(`/user/name`, {
        name: trimmedName,
      });
      // 새로운 닉네임
      const newNickName = res.data?.name ?? trimmedName;
      setNickname(newNickName); // 닉네임 업데이트
      setLoadedUserData((prev) =>
        prev ? { ...prev, name: newNickName } : prev
      );
      setEditNick(false); // 다시 보기모드로 전환
    } catch (err) {
      console.error(err);
    }
  };

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
          <div>
            {/* 닉네임 수정 */}
            {/* 본인인지? */}
            {isMine ? (
              editNick ? (
                // 닉네임 수정
                <input
                  className="font-bold text-xl"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              ) : (
                // 수정버튼 안눌렀을 때
                <p className="font-bold text-xl">{nickname}</p>
              )
            ) : (
              <p className="font-bold text-xl">{loadedUserData?.name}</p>
            )}
          </div>
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
          {isMine ? (
            editNick ? (
              // 수정 모드
              <button
                onClick={handleNickname}
                className="text-sm bg-gray-200 p-2 rounded-xl transition-all cursor-pointer"
              >
                완료
              </button>
            ) : (
              // 보기 모드
              <button
                onClick={() => setEditNick(true)}
                className="text-sm bg-gray-200 p-2 rounded-xl transition-all cursor-pointer"
              >
                닉네임 수정
              </button>
            )
          ) : (
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
          )}
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
        <div className="flex flex-col ">
          <p className="font-bold text-center p-2 my-1.5">팔로워</p>
          {loadingFollower ? (
            <p>로딩 중 。。。</p>
          ) : (
            follower.map((u) => (
              <div key={u.userId}>
                <div
                  className="flex bg-white rounded-md p-2 my-1.5"
                  // onClick={()=>navigate(EachUser userId={myId})}
                >
                  <img
                    src={u.profileImageUrl}
                    alt="프로필 사진"
                    className="size-10 float-left rounded-full mx-2 flex items-center"
                  />
                  <p className="px-2 flex items-center font-bold">{u.name}</p>
                </div>
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
          <p className="font-bold text-center p-2 my-1.5">팔로잉</p>
          {loadingFollowing ? (
            <p>로딩 중 。。。</p>
          ) : (
            following.map((u) => (
              <div
                key={u.userId}
                className="flex bg-white rounded-md p-2 my-1.5"
              >
                <img
                  src={u.profileImageUrl}
                  alt="프로필 사진"
                  className="size-10 float-left rounded-full mx-2 flex items-center"
                />
                <p className="px-2 flex items-center font-bold">{u.name}</p>
              </div>
            ))
          )}
        </div>
      </FollowingList>
    </div>
  );
};

export default EachUser;
