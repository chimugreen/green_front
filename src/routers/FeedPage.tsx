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

  // 입력창 text 상태관리
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

      // 서버 응답 → FE 타입 변환
      const newTodo: Todo = {
        id: response.id,
        content: response.content,
        // 선택한 날짜 기준으로 시간 00:00:00 초기화
        schedule:
          response.schedule instanceof Date &&
          !isNaN(response.schedule.getTime())
            ? new Date(
                response.schedule.getFullYear(),
                response.schedule.getMonth(),
                response.schedule.getDate()
              )
            : new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate()
              ),
        isDone: typeof response.isDone === 'boolean' ? response.isDone : false,
      };
      // 상태에 추가 → 바로 화면에 반영
      setTodoList((prev) => [...prev, newTodo]);
      setInputText('');
      console.log('추가 완료:', newTodo);
    } catch (error) {
      console.log('추가 실패:', error);
    }
  };

  // 삭제버튼
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
  const handleUpdate = (indexToUpdate: number, newText: string) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === indexToUpdate ? { ...todo, content: newText } : todo
      )
    );
  };

  // 서버에서 todo 불러오기
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await getTodos();

        const parsed = data.map((todo: any) => ({
          id: todo.id,
          content: todo.content,
          schedule: todo.schedule
            ? new Date(
                new Date(todo.schedule).getFullYear(),
                new Date(todo.schedule).getMonth(),
                new Date(todo.schedule).getDate()
              )
            : new Date(),
          isDone: typeof todo.isDone === 'boolean' ? todo.isDone : false,
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
      todo.schedule.getFullYear() === selectedDate.getFullYear() &&
      todo.schedule.getMonth() === selectedDate.getMonth() &&
      todo.schedule.getDate() === selectedDate.getDate()
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
          <Category
            inputText={inputText} // 추가내용
            setInputText={setInputText} // 추가내용
            todoList={todosForSelectedDate} // 필터된 리스트
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
