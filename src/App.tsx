// import { Route, Routes } from 'react-router-dom';
import './App.css';
import Feed from './routers/Feed';
import { VscAccount, VscSearch, VscBell } from 'react-icons/vsc';
import { IoHomeOutline } from 'react-icons/io5';
import { useState } from 'react';
import My from './routers/My';
import Search from './routers/Search';
import Alert from './routers/Alert';
// import Settings from './routers/Settings';

function App() {
  // const navigate = useNavigate();

  // const handleClick = () => {
  //   navigate('/My');
  // };

  // 타입스크립트이기 때문에 useState()에서 ()에 들어갈 변수에 대한 타입을 지정해야됨 => String 지정
  // ()안에 들어갈 것은 기본 화면 값 = Feed 화면
  // Url 변경없이(Link / useNavigate) 페이지 이동 시, 조건부 상태 변화로 변경 -> useState 사용
  const [pageChange, setPageChange] = useState<string>('Feed');

  return (
    <>
      <div className="flex flex-col h-screen">
        {/* 메인 */}
        {/* <Routes>
          <Route path="/settings" element={<Settings />} />
        </Routes> */}

        {/* pageChange가 ''면 뒤에 링크를 보여주는 조건부 문법*/}
        {pageChange === 'Feed' && <Feed />}
        {pageChange === 'My' && <My />}
        {pageChange === 'Alert' && <Alert />}
        {pageChange === 'Search' && <Search />}
      </div>
      <footer className="absolute bottom-3 w-full overflow-hidden">
        {/* 하단 페이지 이동 */}
        <div className="flex justify-center gap-10">
          <button
            onClick={() => setPageChange('Feed')}
            className="cursor-pointer flex flex-col
           items-center"
          >
            <IoHomeOutline />
            피드
          </button>
          <button
            onClick={() => setPageChange('Search')}
            className="cursor-pointer flex flex-col
           items-center"
          >
            <VscSearch />
            탐색
          </button>
          <button
            onClick={() => setPageChange('Alert')}
            className="cursor-pointer flex flex-col
           items-center"
          >
            <VscBell />
            알림
          </button>
          <button
            onClick={() => setPageChange('My')}
            className="cursor-pointer flex flex-col
           items-center"
          >
            <VscAccount />
            My
          </button>
        </div>
      </footer>
    </>
  );
}

export default App;
