// My 페이지
import { VscSettingsGear } from 'react-icons/vsc';
// import { Link } from 'react-router-dom';

const My = () => {
  return (
    <>
      <div>
        <header className="flex justify-end">
          {/* 상단 아이콘 */}

          <div className="flex m-2 p-2">
            {/* <Link to="/settings"> */}
            <button className="text-xl cursor-pointer">
              <VscSettingsGear />
            </button>
            {/* </Link> */}
          </div>
        </header>
        {/*  */}
        <div className="flex gap-2">
          {/* 클릭시 내정보 페이지로 이동 */}
          <button className="cursor-pointer rounded-2xl bg-gray-200">
            <img src="" alt="MyProfile" />
          </button>
          <div className="flex flex-col text-xl border-black border-2 p-1">
            <p>username</p>
            <div className="flex gap-5 text-sm border-black border-2 ">
              <p>팔로잉 0</p>
              <p>팔로워 0</p>
            </div>
          </div>
        </div>
        {/*  */}
        <div
          className="border-black border-2 rounded-md
         w-auto h-[40%] flex justify-center items-center m-2"
        >
          <p>나의 기록</p>
        </div>
        <div
          className="border-black border-2 rounded-md 
        w-auto h-[40%] flex justify-center items-center m-2"
        >
          <p>보관함</p>
        </div>
      </div>
    </>
  );
};

export default My;
