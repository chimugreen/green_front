// My 페이지
// import { VscSettingsGear } from 'react-icons/vsc';
import { useEffect, useState } from 'react';
import logo from '../img/icon.png';
import { AiOutlineEdit } from 'react-icons/ai';

const MyPage = () => {
  const [nickname, setNickname] = useState(''); // 닉네임 표시
  const [editNick, setEditNick] = useState(false); // 수정 가능한 상태로 변환; f:기본상태 t:수정가능

  useEffect(() => {
    const nickSaved = localStorage.getItem('nickname');
    setNickname(nickSaved || '새로운 가입자');
  }, []);

  // 닉네임 수정 버튼
  const handleNickname = () => {
    if (editNick) {
      // (기본) + 닉네임 저장
      localStorage.setItem('nickname', nickname);
      alert('닉네임이 변경되었습니다.');
      // 버튼 누른 직후 보기모드로 변경처리
      setTimeout(() => setEditNick(false), 0);
    }
    // 버튼 누르면 수정모드
    setEditNick(true);
  };

  return (
    <>
      <div className="mx-auto my-2 w-180 flex flex-col p-3">
        <div className="m-1 px-1 py-3 ">
          <img className="size-18 float-left rounded-full" src={logo}></img>
          <div className="flex flex-col px-4">
            <div className="flex items-center">
              {editNick ? (
                <input
                  className="font-bold text-lg pr-2 w-auto"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  autoFocus
                />
              ) : (
                <p className="font-bold text-lg pr-2 w-auto">{nickname}</p>
              )}
              <p onClick={handleNickname} className="cursor-pointer">
                <AiOutlineEdit />
              </p>
            </div>
            <p className="text-sm text-gray-500">email@email</p>
            <p className="text-gray-700">
              팔로잉<span className="font-bold px-1">0</span>팔로워
              <span className="font-bold px-1">0</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
