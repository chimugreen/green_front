// 알림 page

const ChatPage = () => {
  return (
    <>
      <div>DM</div>
      <div className="flex items-center justify-around">
        <div
          className="flex flex-col items-center justify-start
         p-3 w-200 min-w-2 h-180 border-2 rounded-2xl bg-gray-200"
        >
          <div className="flex justify-start flex-row">
            <p className="flex m-3 p-2 border-2 rounded-2xl flex-row bg-white">
              profile
            </p>
            <p className="flex m-3 p-2 border-2 rounded-2xl flex-row bg-white">
              profile
            </p>
            <p className="flex m-3 p-2 border-2 rounded-2xl flex-row bg-white">
              profile
            </p>
            <p className="flex m-3 p-2 border-2 rounded-2xl flex-row bg-white">
              profile
            </p>
          </div>
          <div className="border-2 rounded-2xl m-2 p-2 bg-white w-full h-full">
            <p>name</p>
            <hr />
          </div>
          <div className="flex gap-2 w-full">
            <input
              className="w-full h-auto border-2 rounded-2xl bg-white w-"
              type="text"
            />
            <button className="m-1 p-1 border-2 rounded-2xl bg-white">
              발송
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
