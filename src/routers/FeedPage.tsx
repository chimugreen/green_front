// 피드 page

import { useEffect, useState } from 'react';
import Calender from '../components/Calender';
import Category from '../components/Category';

export type Todo = {
  id: number; // 할일 번호
  content: string; // 할일 내용
  date: Date; // 할일 날짜
  isFinished: boolean; // 할일 완료 여부
};

const FeedPage = () => {
  // Calender.tsx props
  const [selectedDate, setSelectedDate] = useState(new Date());

  //? Category
  // TODOS 배열
  // Todo는 아래의 내용을 가지고 있는 객체

  //입력창 text 상태관리
  const [inputText, setInputText] = useState('');
  // 리스트 저장 - 배열
  const [todoList, setTodoList] = useState<Todo[]>([]);

  // 수정버튼 상태 관리
  const [editText, setEditText] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null); //수정 중인 항목의 인덱스 (null일 경우 수정x)

  // 할일 추가 버튼
  const handleAdd = () => {
    const trimmed = inputText.trim();
    if (trimmed === '') return;

    const newTodo: Todo = {
      id: Date.now(), // 할일 번호
      content: trimmed,
      date: selectedDate, // 선택한 날짜
      isFinished: false, // 기본 체크 여부 , 미완료상태
    };

    setTodoList([...todoList, newTodo]);
    setInputText('');
  };

  // 삭제버튼
  // 삭제는 filter를 이용해서 항목삭제
  const handleDel = (todoId: number) => {
    setTodoList(todoList.filter((todo) => todo.id !== todoId));
  };

  // 수정버튼
  // 수정 시, map을 이용해서 재배열
  // indexToUpdate => 수정할 index , newText: 교체할 내용
  const handleUpdate = (indexToUpdate: number, newText: string) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === indexToUpdate ? { ...todo, content: newText } : todo
      )
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

  // 선택된 날짜(selectedDate)와 동일한 날짜를 가진 todo만 필터링
  const todosForSelectedDate = todoList.filter(
    (todo) =>
      todo.date.getFullYear() === selectedDate.getFullYear() &&
      todo.date.getMonth() === selectedDate.getMonth() &&
      todo.date.getDate() === selectedDate.getDate()
  );

  // 완료표시 여부
  const handleToggleFinished = (id: number) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, isFinished: !todo.isFinished } : todo
      )
    );
  };

  return (
    <>
      <header className="flex">
        <img
          className="ml-10 mb-10 size-10"
          src="src\img\icon.png"
          alt="mainLogo"
        />
      </header>
      {/* <div className="border-2 w-1/3 flex justify-start ml-15 mt-10 mb-5">
        유저이미지
      </div> */}
      <div className="flex justify-around items-center h-full ">
        <div className="w-1/3 min-h-100 h-auto flex flex-col rounded-2xl">
          <div>
            <Calender
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              todoList={todoList}
            />
          </div>
        </div>{' '}
        <div className="w-1/2 max-h-150 min-h-100 h-auto flex flex-col p-2 bg-neutral-50 rounded-2xl">
          <Category // Category에 있던 todo 기능 정의 전부 feedPage로 올림, 전부 전달해야됨
            inputText={inputText} // 추가내용
            setInputText={setInputText} // 추가내용
            todoList={todosForSelectedDate}
            handleAdd={handleAdd} // 추가버튼
            handleDel={handleDel} // 삭제버튼
            handleUpdate={handleUpdate} // 수정버튼
            editText={editText} // 수정내용
            setEditText={setEditText} // 수정내용
            editIndex={editIndex} // 수정 번호
            setEditIndex={setEditIndex} // 수정번호
            handleToggleFinished={handleToggleFinished} // 완료표시 여부
          />
        </div>
      </div>
    </>
  );
};

export default FeedPage;
