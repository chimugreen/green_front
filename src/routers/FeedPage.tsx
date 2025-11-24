// 피드 page

import { useEffect, useState } from 'react';
import Calender from '../components/Calender';
import Category from '../components/Category';

const FeedPage = () => {
  // TODOS 배열
  // Todo는 아래의 내용을 가지고 있는 객체
  type Todo = {
    id: number; // 할일 번호
    content: string; // 할일 내용
    date: Date; // 할일 날짜
    isFinished: boolean; // 할일 완료 여부
  };

  //? todos > Todo 타입의 배열
  const todos: Todo[] = [];

  // Calender.tsx props
  const [selectedDate, setSelectedDate] = useState(new Date());

  //? Category
  //입력창 text 상태관리
  const [inputText, setInputText] = useState('');
  // 리스트 저장 - 배열
  const [todoList, setTodoList] = useState<Todo[]>([]);

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
      <header>헤더 아이콘 미작업 영역</header>
      <hr />
      <div className="flex justify-around items-center h-screen ">
        <div className="w-1/3 h-100 flex flex-col rounded-2xl">
          <div>
            <Calender
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
        </div>{' '}
        <div className="w-1/3 h-100 flex flex-col border-2 p-2">
          <Category // Category에 있던 todo 기능 정의 전부 feedPage로 올림, 전부 전달해야됨
            inputText={inputText} // 추가내용
            setInputText={setInputText} // 추가내용
            todoList={todoList}
            handleAdd={handleAdd} // 추가버튼
            handleDel={handleDel} // 삭제버튼
            handleUpdate={handleUpdate} // 수정버튼
            editText={editText} // 수정내용
            setEditText={setEditText} // 수정내용
            editIndex={editIndex} // 수정 번호
            setEditIndex={setEditIndex} // 수정번호
          />
        </div>
      </div>
    </>
  );
};

export default FeedPage;
