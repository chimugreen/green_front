// Category
// 투두리스트

// Category props 타입 정의
interface CategoryProps {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  todoList: string[];
  handleAdd: () => void;
  handleDel: (index: number) => void;
  handleUpdate: (index: number, newText: string) => void;
  editText: string;
  setEditText: React.Dispatch<React.SetStateAction<string>>;
  editIndex: number | null;
  setEditIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

// 매개변수에 정의한 props 전달
const Category = ({
  inputText,
  setInputText,
  todoList,
  handleAdd,
  handleDel,
  handleUpdate,
  editText,
  setEditText,
  editIndex,
  setEditIndex,
}: CategoryProps) => {
  return (
    <>
      <div className="text-black font-bold text-shadow-lg">Today's Todo</div>

      {/* 입력필드 */}
      <div className="flex justify-end items-center gap-1 m-2">
        <input
          className="flex w-1/2 border-2 rounded-2xl p-2"
          value={inputText} //! 제어컴포넌트 지정
          onChange={(e) => setInputText(e.target.value)} //! text 입력 시 inputText 상태 업데이트
          type="text"
        />
        <button
          onClick={() => {
            handleAdd();
          }}
          className="cursor-pointer bg-blue-50 rounded-2xl p-2"
          type="submit"
        >
          입력
        </button>
      </div>
      <div>
        <ul className="bg-amber-50 rounded-2xl">
          {/* todolist 배열 map으로 렌더링 */}
          {todoList.map((todo, index) => (
            <li
              className="flex gap-2 m-1 justify-between items-center"
              key={index}
            >
              <div className="flex gap-2 m-1 justify-between items-center">
                <img className="size-5" src="./src/img/icon.png" alt="아이콘" />
                <span>{todo}</span>
              </div>

              <div
                className="flex items-center gap-2
               "
              >
                {editIndex === index ? (
                  <>
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="border rounded p-1"
                    />
                    <button
                      onClick={() => {
                        handleUpdate(index, editText);
                        setEditIndex(null);
                        setEditText('');
                      }}
                    >
                      저장
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditIndex(index);
                        setEditText(todo);
                      }}
                    >
                      수정
                    </button>
                  </>
                )}

                <button
                  onClick={() => handleDel(index)}
                  className="cursor-pointer hover:bg-gray-100 rounded-2xl p-1"
                >
                  삭제
                </button>
              </div>
            </li>
            // key 값 = index 번호, index번호를 토대로 출력
          ))}
        </ul>
      </div>
    </>
  );
};

export default Category;
