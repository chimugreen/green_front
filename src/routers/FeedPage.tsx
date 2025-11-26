// 피드 page

import { useEffect, useState } from 'react';
import Calender from '../components/Calender';
import Category from '../components/Category';
import { addTodo, delTodo, getTodos } from '../api/axios';

export type Todo = {
  id: number; // 할일 번호
  content: string; // 할일 내용
  schedule: Date; // 할일 날짜
  isDone: boolean; // 할일 완료 여부
};

// 서버 응답용 타입
export type TodoResponse = {
  id: number;
  content: string;
  schedule: string; // 문자열
  done: boolean;
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
  const handleAdd = async () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    try {
      const response = await addTodo(trimmed, selectedDate, false);
      if (!response) return;

      const newTodo: Todo = {
        id: response.id,
        content: response.content,
        schedule: response.schedule
          ? new Date(response.schedule)
          : selectedDate,
        isDone: response.done,
      };

      setTodoList((prev) => [...prev, newTodo]);
      setInputText('');
      console.log('추가 완료:', newTodo);
    } catch (error) {
      console.log('추가 실패:', error);
    }
  };

  // 삭제버튼
  // 삭제는 filter를 이용해서 항목삭제
  const handleDel = async (todoId: number) => {
    try {
      // 서버에 DELETE 요청
      await delTodo(todoId);

      // FE 상태에서 해당 Todo 제거
      setTodoList((prev) => prev.filter((todo) => todo.id !== todoId));

      console.log('삭제 완료:', todoId);
    } catch (error) {
      console.error('삭제 실패:', error);
    }
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

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await getTodos();

        // 백엔드 응답 → FE 타입 변환
        const parsed = data.map((todo: TodoResponse) => ({
          id: todo.id,
          content: todo.content,
          schedule: new Date(todo.schedule),
          isDone: todo.done,
        }));

        setTodoList(parsed);
      } catch (e) {
        console.log('서버에서 todo 로드 실패:', e);
      }
    };

    loadTodos();
  }, []);

  // 선택된 날짜(selectedDate)와 동일한 날짜를 가진 todo만 필터링
  const todosForSelectedDate = todoList.filter(
    (todo) =>
      new Date(todo.schedule).toDateString() === selectedDate.toDateString()
  );

  // 완료표시 여부
  const handleToggleFinished = (id: number) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  return (
    <>
      <header className="flex">
        <img
          className="ml-10 mt-5 mb-10 size-10"
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
