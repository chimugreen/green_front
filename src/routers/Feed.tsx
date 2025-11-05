// 피드 page

import { GoPlus } from 'react-icons/go';

const Feed = () => {
  return (
    <>
      <div>
        <header className="flex justify-between">
          {/* 상단 아이콘 */}
          <div
            className="border-black border-2 
          flex m-2 p-2"
          >
            <p>아이콘 자리</p>
          </div>
          <div
            className=" border-black border-2 
          flex m-2 p-2 gap-10"
          >
            <p>달력 확대 버튼</p>
            <p>DM</p>
            <p>햄버거바</p>
          </div>
        </header>
      </div>
      <div
        className="flex justify-center items-center
       border-black border-2 w-auto h-[80%] m-2 p-2"
      >
        <div
          className="flex justify-center
       border-black border-2 p-2 m-2
       w-1/2 h-[90%]"
        >
          달력 컴포넌트
        </div>
        <div
          className="flex justify-start
       border-black border-2
       w-1/2 h-[90%]"
        >
          <ul>
            <li className="bg-gray-100 p-2 m-2 rounded-2xl">
              <button className="flex gap-2 items-center cursor-pointer">
                카테고리 1
                <span className="bg-white rounded-2xl text-xl">
                  <GoPlus />
                </span>
              </button>
            </li>
            <li className="bg-gray-100 p-2 m-2 rounded-2xl">
              <button className="flex gap-2 items-center cursor-pointer ">
                카테고리 2
                <span className="bg-white rounded-2xl text-xl">
                  <GoPlus />
                </span>
              </button>
            </li>
            <li className="bg-gray-100 p-2 m-2 rounded-2xl">
              <button className="flex gap-2 items-center cursor-pointer">
                카테고리 3
                <span className="bg-white rounded-2xl text-xl">
                  <GoPlus />
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Feed;
