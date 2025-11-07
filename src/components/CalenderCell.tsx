// 달력 일자 셀
import { useState } from 'react';
import { HiCalendar } from 'react-icons/hi2';

const CalenderCell = () => {
  // 라이브러리 없이 date 생성
  // 현재 날짜를 저장할 상태 초기값 생성
  const [date, setDate] = useState(new Date());

  // 현재 날짜의 연도를 숫자로 반환하는 메서드
  const year = date.getFullYear();

  // 현재 날짜의 월을 숫자로 반환하는 메서드, month는 +1을 해야 현재 월을 표시
  const month = date.getMonth() + 1;

  // 현재 날짜의 일을 숫자로 반환하는 메서드
  const days = date.getDate();

  //new Date(year, month, num); => 특정 날짜를 생성하는 문법
  const firstDay = new Date(year, month, 1).getDay(); // 해당 연도와 당월의 1일을 생성

  // 해당 연도 당월 기준 이전달의 마지막 날을 생성
  // .getDate() => 마지막날이 어떤 값인지 알려줌
  const lastDay = new Date(year, month, 0).getDate();

  // 날짜 배열 생성하기
  const calenderDate1 = Array.from({ length: lastDay }, (_, i) => i + 1);

  // const date1 = [1, 2, 3, 4, 5, 6, 7];

  return (
    <>
      <div>
        <div className="flex flex-col text-center justify-around">
          <div className="flex justify-around mt-2 mb-2">
            {/* day = 배열의 요소, index = 배열의 인덱스값(key값) */}
            {calenderDate1.map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <HiCalendar />
                <div>{day}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CalenderCell;
