// Category
// 투두리스트

import { useEffect, useState } from 'react';

const Category = () => {
  //입력창 text 상태관리
  const [inputText, setInputText] = useState('');
  // 리스트 저장 - 배열
  const [todoList, setTodoList] = useState<string[]>([]);

  // 수정버튼 상태 관리
  const [editText, setEditText] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null); //수정 중인 항목의 인덱스 (null일 경우 수정x)

  // 할일 추가 버튼
  const handleAdd = () => {
    const trimmed = inputText.trim(); // trim - text의 공백 제거
    if (trimmed === '') return; // trimmed가 ''면 return
    setTodoList([...todoList, trimmed]); //? 기존 배열 불러와서 trimmed추가
    setInputText(''); //? 입력창 초기화
  };

  // 삭제버튼
  // 삭제는 filter를 이용해서 항목삭제
  const handleDel = (delToDo: number) => {
    // type : number, delToDo -> 삭제하고자 하는 인덱스번호

    setTodoList(todoList.filter((_, index) => index !== delToDo));
    //? .filter() => 배열에서 조건에 맞는 항목만 남겨 새로운 배열 생성
    //? 조건: index !== delToDo > index === delToDo와 동일
    //! 조건에 해당하는 index는 삭제 후 나머지 index로 배열 재생성
  };

  // 수정버튼
  // 수정 시, map을 이용해서 재배열
  // indexToUpdate => 수정할 index , newText: 교체할 내용
  const handleUpdate = (indexToUpdate: number, newText: string) => {
    setTodoList(
      todoList.map((item, index) => (index === indexToUpdate ? newText : item))
    );
  };

  // 새로고침 유지
  useEffect(() => {
    const saved = localStorage.getItem('todoList');
    // localStorage에서 ()안에 있는 값을 불러옴
    // .getItem > 불러오기
    if (saved) {
      setTodoList(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    //? localStorage.setItem(); => () 안에 있는 data를 localStorage에 저장, 문자열만 저장 가능
    //? JSON.stringify() > 객체를 문자열로 변환하는 문법
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

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
