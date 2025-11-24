import { useState } from 'react';
import { HiCalendar } from 'react-icons/hi2';

// FeedPage.tsx에서 정의한 props 함수의 타입 선언
interface CalendarProps {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

// 매개변수에 props 전달
const Calender = ({ selectedDate, setSelectedDate }: CalendarProps) => {
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());

  // onClick 이벤트로 버튼 클릭 시, 현재 날짜로 리턴
  // 헤더 클릭 시, 오늘 날짜로 하이라이트 되돌리기
  const returnDate = () => {
    const today = new Date();
    setSelectedDate(today);
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
  };

  // 달력 이동
  // setCurrentMonth(현재 월)이 0(1월)일 때, 이전 버튼 클릭 시, setCurrenYear(현재 년도) - 1
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  // setCurrentMonth(현재 월)이 11(12월)일 때, 다음 버튼 클릭 시, setCurrenYear(현재 년도) + 1
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  // 클릭 시, 선택한 날짜표시
  // 오늘 날짜는 회색처리
  // 선택 날짜는 검은색 배경/흰색글씨
  const dateOnClick = (day: number) => {
    setSelectedDate(new Date(currentYear, currentMonth, day));
  };

  //new Date(year, month, num); => 특정 날짜를 생성하는 문법
  //new Date().getDay() => 0~6까지 일~토 생성
  // 이렇게 쓸 경우 m+1을 써서 월을 맞출 필요가 없어짐
  // currentYear 및 currentMonth 사용으로 버튼 이동시 달력도 같이 렌더링
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  // 해당 연도 당월 기준 이전달의 마지막 날을 생성
  // .getDate() => 마지막날이 어떤 값인지 알려줌
  const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();

  // 날짜 배열 생성하기
  // Array.from()은 “배열처럼 생긴 객체”를 진짜 배열로 변환하는 문법
  // Array.from(arrayLike, mapFn?)
  // (_,i) > mapFn(매핑함수) : 각 요소를 어떻게 변환할지 정의하는 함수
  const days = Array.from({ length: lastDay }, (_, i) => i + 1);

  // 당월 첫 날 앞에 빈칸 생성
  // 요일과 날짜 셀간의 순서 맞춤 위함
  const convertedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
  const calendar = Array(convertedFirstDay).fill(null).concat(days);

  //CSS 조건부용 변수 선언
  const isSameDate = (a: Date, b: Date) => {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
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
          {calendar.map((day, idx) =>
            day ? (
              <button
                key={idx}
                onClick={() => dateOnClick(day)}
                className="flex flex-col items-center justify-center
                m-1 p-1 rounded-2xl cursor-pointer"
              >
                <span className="text-2xl">
                  <HiCalendar />
                </span>

                {/* 날짜 스타일 */}
                <div
                  className={`p-1 m-1 w-6 text-sm rounded-2xl
                    ${
                      isSameDate(
                        new Date(currentYear, currentMonth, day),
                        selectedDate
                      )
                        ? 'bg-black text-white'
                        : 'bg-white text-black'
                    }
                  `}
                >
                  {day}
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
