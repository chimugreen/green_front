import { useState } from 'react';

// FeedPage.tsx에서 정의한 props 함수의 타입 선언
interface CalendarProps {
  selectedDate: Date; // 타입 = Date
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  todoList: Todo[]; // Todo.date는 string일 수 있음
}

// 매개변수에 props 전달
const Calender = ({
  selectedDate,
  setSelectedDate,
  todoList,
}: CalendarProps) => {
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());

  // 오늘 날짜로 돌아가기
  const returnDate = () => {
    const today = new Date();
    setSelectedDate(today);
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
  };

  // 이전 달
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  // 다음 달
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  // 날짜 클릭
  const dateOnClick = (day: number) => {
    setSelectedDate(new Date(currentYear, currentMonth, day));
  };

  // 당월 1일의 요일
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  // 당월 마지막 날
  const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();

  // 날짜 배열 생성 (객체로 fullDate 포함)
  const days = Array.from({ length: lastDay }, (_, i) => ({
    day: i + 1,
    fullDate: new Date(currentYear, currentMonth, i + 1),
  }));

  // 첫 날 앞 빈칸
  const convertedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
  const calendar = Array(convertedFirstDay).fill(null).concat(days);

  // 날짜 비교 함수
  const isSameDate = (a: Date, b: Date) => {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  };

  // 특정 날짜의 todo 상태 계산
  const getTodoStatusForDate = (date: Date) => {
    const todosForDate = todoList.filter((todo) => {
      const todoDate = new Date(todo.date); // 문자열을 Date로 변환
      return (
        todoDate.getFullYear() === date.getFullYear() &&
        todoDate.getMonth() === date.getMonth() &&
        todoDate.getDate() === date.getDate()
      );
    });

    const total = todosForDate.length;
    const finished = todosForDate.filter((t) => t.isFinished).length;

    return { total, finished };
  };

  return (
    <>
      {/* ---- 헤더 ---- */}
      <div className="flex justify-between mb-2">
        <button
          onClick={returnDate}
          className="font-bold m-1 ml-9 cursor-pointer"
        >
          {currentYear}년 {currentMonth + 1}월
        </button>

        <div className="flex gap-2 m-1 mr-4">
          <button onClick={prevMonth} className="cursor-pointer">
            ◁
          </button>
          <button onClick={nextMonth} className="cursor-pointer">
            ▷
          </button>
        </div>
      </div>

      {/* ---- 요일 ---- */}
      <ul className="flex justify-around text-sm">
        <li>월</li>
        <li>화</li>
        <li>수</li>
        <li>목</li>
        <li>금</li>
        <li className="text-blue-400">토</li>
        <li className="text-red-400">일</li>
      </ul>

      {/* ---- 달력 날짜 ---- */}
      <div className="flex flex-col text-center">
        <div className="grid grid-cols-7 mt-2 mb-2">
          {calendar.map((dayObj, idx) =>
            dayObj ? (
              <button
                key={idx}
                onClick={() => dateOnClick(dayObj.day)}
                className="flex flex-col items-center justify-center
                m-1 p-1 rounded-2xl cursor-pointer"
              >
                {/* todo 개수 표시 박스 */}
                {(() => {
                  const { total, finished } = getTodoStatusForDate(
                    dayObj.fullDate
                  );
                  return (
                    <div className="mt-1 w-5 h-5 border-2 border-gray-300 flex items-center justify-center text-xs">
                      {total === 0
                        ? ''
                        : total === finished
                        ? '✔'
                        : total - finished}
                    </div>
                  );
                })()}

                {/* 날짜 스타일 */}
                <div
                  className={`p-1 m-1 w-6 text-sm rounded-2xl
                    ${
                      isSameDate(dayObj.fullDate, selectedDate)
                        ? 'bg-black text-white'
                        : 'bg-white text-black'
                    }
                  `}
                >
                  {dayObj.day}
                </div>
              </button>
            ) : (
              <div key={idx} />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Calender;
