import { SlArrowLeftCircle } from 'react-icons/sl';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import FollowerList from '../userPage/FollowerList';
import FollowingList from '../userPage/FollowingList';
import { useUserId } from '../useCase/useUserId';
import { apiWithHeader } from './api';
import { userInfoStorage } from '../utils/userInfoStorage';
import { PostList } from '../routers/pages/post/createPost/components/PostList';
import { useGetPost } from '../useCase/useGetPost';

type EachUserProps = {
  userId: number;
};

// 개인 페이지
const EachUser = ({ userId }: EachUserProps) => {
  // const { userId } = useParams<{ userId: string }>();

  const navigate = useNavigate();
  const loadUserId = Number(userId);
  const [page, setPage] = useState(0);
  const size = 10;
  const { posts, pagenation } = useGetPost({
    userId: Number(userId),
    page,
    size,
  });

  const { setLoadedUserData, loadedUserData, isLoading } =
    useUserId(loadUserId);
  // 로그인한 사용자의 userId가져오기
  const myId = Number(userInfoStorage.getUserId());
  const isMine = myId === loadUserId;
  const [editNick, setEditNick] = useState(false);

  const [isOpenedFollowingList, setIsOpenedFollowingList] = useState(false);
  const [isOpenedFollowerList, setIsOpenedFollowerList] = useState(false);

  console.log('myId, userId, isMine:', myId, userId, isMine);

  // 팔로우 버튼
  const handleFollow = async () => {
    if (loadedUserData?.isFollowing) {
      // unfollow
      const res = await apiWithHeader.post(`user/unfollow`, {
        userId: loadUserId,
      });
      if (res.status == 200) {
        setLoadedUserData((pre) =>
          pre
            ? {
                ...pre,
                followerCount: pre.followerCount - 1,
                isFollowing: false,
              }
            : pre
        );
      }
    } else {
      // follow
      const res = await apiWithHeader.post(`user/follow`, {
        userId: loadUserId,
      });
      if (res.status == 200) {
        setLoadedUserData((pre) =>
          pre
            ? {
                ...pre,
                followerCount: pre.followerCount + 1,
                isFollowing: true,
              }
            : pre
        );
      }
    }
  };

  // 닉네임 수정 버튼
  const handleNickname = async () => {
    if (!loadedUserData) return;

    const trimmedName = loadedUserData.name.trim();
    if (!trimmedName) return alert('수정할 닉네임을 입력해주세요.');

    try {
      const res = await apiWithHeader.post(`/user/name`, {
        name: trimmedName,
      });
      // 새로운 닉네임
      const newNickName = res.data?.name ?? trimmedName;
      // 닉네임 업데이트
      setLoadedUserData((prev) =>
        prev ? { ...prev, name: newNickName } : prev
      );
      setEditNick(false); // 다시 보기모드로 전환
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <p>로딩 중 ...</p>;

  // if (!loadedUserData) {
  //   alert('해당 ID의 유저가 없습니다.');
  //   navigate(-1);
  // }

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
          src={loadedUserData?.profileImageUrl}
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
                  value={loadedUserData?.name}
                  onChange={(e) => {
                    setLoadedUserData((prev) =>
                      prev ? { ...prev, name: e.target.value } : prev
                    );
                  }}
                />
              ) : (
                // 수정버튼 안눌렀을 때
                <p className="font-bold text-xl">{loadedUserData?.name}</p>
              )
            ) : (
              <p className="font-bold text-xl">{loadedUserData?.name}</p>
            )}
          </div>
          <p className="text-gray-600 text-sm">{loadedUserData?.email}</p>
          <div className="flex text-sm py-0.5">
            <p>게시물</p>{' '}
            <p className="font-bold px-1">{loadedUserData?.postCount}</p>
            <p>팔로워</p>
            <p
              onClick={() => setIsOpenedFollowerList(true)}
              className="font-bold px-1 cursor-pointer"
            >
              {loadedUserData?.followerCount}
            </p>
            <p>팔로잉</p>
            <p
              onClick={() => setIsOpenedFollowingList(true)}
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
              value={loadedUserData?.followerCount}
              className={`${
                loadedUserData?.isFollowing
                  ? 'text-sm bg-gray-200 p-2 rounded-xl transition-all cursor-pointer'
                  : 'text-sm bg-sky-600 p-2 rounded-xl text-white transition-all cursor-pointer'
              }`}
            >
              {loadedUserData?.isFollowing ? '팔로우 취소' : '팔로우'}
            </button>
          )}
        </div>
      </div>
      {/* 사진 게시물 */}
      <div className="mt-4">
        <PostList posts={posts} pagenation={pagenation} setPage={setPage} />
      </div>
      {/* 팔로잉&팔로워 리스트 */}
      <FollowerList
        open={isOpenedFollowerList}
        onClose={() => setIsOpenedFollowerList(false)}
        userId={userId}
      ></FollowerList>
      <FollowingList
        open={isOpenedFollowingList}
        onClose={() => setIsOpenedFollowingList(false)}
        userId={userId}
      ></FollowingList>
    </div>
  );
};

export default EachUser;
