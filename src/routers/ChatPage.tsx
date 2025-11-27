// 알림 page

const ChatPage = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <div
          className="flex flex-row items-center justify-start
         p-1 w-180 min-w-2 h-auto"
        >
          <div className="flex flex-row">
            <p className="flex m-1 p-2 border-2 rounded-2xl flex-row bg-white">
              profile
            </p>
          </div>
          <div className="border-2 rounded-2xl m-1 bg-white w-full h-[600px] flex flex-col">
            {/* 상단 헤더 */}
            <div className="p-2 border-b">
              <p className="font-semibold">name</p>
            </div>

            {/* 메시지 영역 */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              <p className="p-1 m-1 rounded-2xl">msg</p>
              {/* ... */}
            </div>

            {/* 입력 바 (하단 고정) */}
            <div className="sticky bottom-0 rounded-2xl bg-white p-3 border-t">
              <div className="flex gap-2">
                <input
                  className="flex-1 h-10 border-2 rounded-2xl px-3"
                  type="text"
                  placeholder="메시지를 입력하세요"
                />
                <button className="px-4 h-10 border-2 rounded-2xl">발송</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
