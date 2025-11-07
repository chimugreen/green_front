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
  const month = date.getMonth(); //+1

  // 현재 날짜의 일을 숫자로 반환하는 메서드
  const days = date.getDate();

  //new Date(year, month, num); => 특정 날짜를 생성하는 문법
  // 이렇게 쓸 경우 m+1을 써서 월을 맞출 필요가 없어짐
  const firstDay = new Date(year, month, 1).getDay(); // 해당 연도와 당월의 1일을 생성

  // 해당 연도 당월 기준 이전달의 마지막 날을 생성
  // .getDate() => 마지막날이 어떤 값인지 알려줌
  const lastDay = new Date(year, month, 0).getDate();

  // 날짜 배열 생성하기
  const calenderDate1 = Array.from({ length: lastDay }, (_, i) => i + 1);

  // 당월 첫 날 앞에 빈칸 생성
  // 요일과 날짜 셀간의 순서 맞춤 위함
  const calenderDate2 = Array(firstDay).fill(null).concat(calenderDate1);

  // const date1 = [1, 2, 3, 4, 5, 6, 7];

  return (
    <>
      <div className="flex justify-between">
        <div>달력 바뀌면 날짜 바뀌는 부분</div>
        <div className="flex gap-2 m-1">
          <button>날짜이동</button>
          <button> 버튼</button>
        </div>
      </div>
      {/* 구분선 */}
      <hr />
      <div>
        <ul className="flex justify-around text-sm">
          <li>월</li>
          <li>화</li>
          <li>수</li>
          <li>목</li>
          <li>금</li>
          <li className="text-blue-400">토</li>
          <li className="text-red-400">일</li>
        </ul>
      </div>
      <hr />
      <div>
        <div className="flex flex-col text-center">
          <div className="grid grid-cols-7 mt-2 mb-2">
            {/* day = 배열의 요소, index = 배열의 인덱스값(key값) */}
            {/* 첫 날 앞의 null 값인 영역은 안나오도록 ? : (삼항연산자) 추가 */}
            {/* day = 날짜가 있으면 : 없으면 <div/> */}
            {/* <div />(<div><div/>) => 구역은 있지만 아무것도 없는 것으로 보이게함 */}
            {calenderDate2.map((day, index) =>
              day ? (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center"
                >
                  <span>
                    <HiCalendar />
                  </span>
                  <div className="m-2">{day}</div>
                </div>
              ) : (
                <div key={index} />
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CalenderCell;
