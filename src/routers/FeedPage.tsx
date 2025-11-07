// 피드 page

import CalenderCell from '../components/CalenderCell';
import CalenderDaily from '../components/CalenderDaily';

const FeedPage = () => {
  return (
    <>
      <header>헤더 아이콘 미작업 영역</header>
      <hr />
      <div className="flex justify-around items-center h-screen ">
        <div className="w-1/3 flex flex-col border-2">
          <CalenderDaily />
          {/* 임시 구분 선 */}
          <hr />
          <CalenderCell />
        </div>{' '}
        <div className="w-1/3 flex border-2">
          <p>카테고리 컴포넌트 영역</p>
        </div>
      </div>
    </>
  );
};

export default FeedPage;
