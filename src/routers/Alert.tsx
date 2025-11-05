// 알림 page

const Alert = () => {
  return (
    <>
      <div>
        <header>
          <div className="m-2 font-bold">알림</div>
          <div className="m-2 flex gap-2">
            <button className="cursor-pointer bg-gray-100 p-2 rounded-2xl text-sm">
              친구의 할일
            </button>
            <button className="cursor-pointer bg-gray-100 p-2 rounded-2xl text-sm">
              친구의 일기
            </button>
            <button className="cursor-pointer bg-gray-100 p-2 rounded-2xl text-sm">
              받은 좋아요
            </button>
            <button className="cursor-pointer bg-gray-100 p-2 rounded-2xl text-sm">
              소식
            </button>
          </div>
        </header>
        <div
          className="m-2 p-2 flex flex-col w-auto
          h-auto border-2"
        >
          알림 표시 섹터
          <div className="flex gap-2">
            <button>아이콘</button>
            <button>알림내용</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Alert;
