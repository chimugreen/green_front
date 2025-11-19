// 달력 일자 셀
import { useEffect, useState } from 'react';
import { HiCalendar } from 'react-icons/hi2';

const Calender = () => {
  // 라이브러리 없이 date 생성
  // 현재 날짜를 저장할 상태 초기값 생성
  const [date, setDate] = useState<Date>(new Date());

  // 달력 이동 버튼
  // useState로 상태변화 감지 & 초기값() = new Date().getMonth() : 현재 Month
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const [currentYear, setCurrenYear] = useState<number>(
    new Date().getFullYear()
  );

  // 달력 이동
  // setCurrentMonth(현재 월)이 0(1월)일 때, 이전 버튼 클릭 시, setCurrenYear(현재 년도) - 1
  const prevMonth = () => {
    if (currentMonth === 0) {
      // month 0 => 1월
      setCurrentMonth(11);
      setCurrenYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // useState 초기값에 new Date() = 오늘 날짜를 저장
  const [currentDate, setCurrentDate] = useState(new Date());

  // 현재 날짜의 연도를 숫자로 반환하는 메서드
  const year = currentDate.getFullYear();
  // 현재 날짜의 월을 숫자로 반환하는 메서드, month는 +1을 해야 현재 월을 표시
  const month = currentDate.getMonth(); //+1
  // 현재 날짜의 일을 숫자로 반환하는 메서드
  const today = currentDate.getDate(); // type=number

  // setCurrentMonth(현재 월)이 11(12월)일 때, 다음 버튼 클릭 시, setCurrenYear(현재 년도) + 1
  const nextMonth = () => {
    if (currentMonth === 11) {
      // month 11 => 12월
      setCurrentMonth(0);
      setCurrenYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  //new Date(year, month, num); => 특정 날짜를 생성하는 문법
  //new Date().getDay() => 0~6까지 일~토 생성
  // 이렇게 쓸 경우 m+1을 써서 월을 맞출 필요가 없어짐
  // currentYear 및 currentMonth 사용으로 버튼 이동시 달력도 같이 렌더링
  const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // 해당 연도와 당월의 1일을 생성

  // 해당 연도 당월 기준 이전달의 마지막 날을 생성
  // .getDate() => 마지막날이 어떤 값인지 알려줌
  const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();

  // 날짜 배열 생성하기
  // Array.from()은 “배열처럼 생긴 객체”를 진짜 배열로 변환하는 문법
  // Array.from(arrayLike, mapFn?)
  // (_,i) > mapFn(매핑함수) : 각 요소를 어떻게 변환할지 정의하는 함수
  const calenderDate1 = Array.from({ length: lastDay }, (_, i) => i + 1);

  // 당월 첫 날 앞에 빈칸 생성
  // 요일과 날짜 셀간의 순서 맞춤 위함
  const newFirstDay = firstDay === 0 ? 6 : firstDay - 1;
  const calenderDate2 = Array(newFirstDay).fill(null).concat(calenderDate1);

  // 달력 헤더 클릭 시, 오늘 날짜로 돌아오기
  // onClick 이벤트로 버튼 클릭 시, 현재 날짜로 리턴
  const returnDate = () => {
    // 스코프내에서 오늘 날짜 새로 선언
    const today = new Date();

    console.log(`오늘 날짜는 ${today.getDate()}일`);
    if (currentDate.getDate() !== today.getDate()) {
      // currentDate, today > Object
      // .getDate()로 날짜만 추출 > type: number
      return currentDate;
    } else {
      return;
    }
  };

  // 날짜 선택 감지용 useState 생성
  // <type>선언 => Date 타입 또는 null
  const [selectDate, setSelectDate] = useState<Date | null>(new Date()); // 초기 상태 = 오늘 날짜

  //CSS 조건부용 변수 선언
  const isSameDate = (a: Date, b: Date | null) => {
    if (!a || !b) return false; // a나 b가 다르면(!) false
    return (
      // a와 b가 같을 경우 return
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  };

  // 클릭 시, 선택한 날짜표시
  // 오늘 날짜는 회색처리
  // 선택 날짜는 검은색 배경/흰색글씨
  const dateOnClick = (day: number) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    setSelectDate(clickedDate);
    console.log(`오늘 날짜는 ${today}일`); // today > 무조건 오늘 날짜로 나옴
  };

  return (
    <>
      <div className="flex justify-between mb-2">
        {/* 해당 버튼 클릭 시, 오늘 날짜로 변동 */}
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

      <div>
        <div className="flex flex-col text-center">
          <div className="grid grid-cols-7 mt-2 mb-2">
            {/* day = 배열의 요소, index = 배열의 인덱스값(key값) */}
            {/* 첫 날 앞의 null 값인 영역은 안나오도록 ? : (삼항연산자) 추가 */}
            {/* day = 날짜가 있으면 : 없으면 <div/> */}
            {/* <div />(<div><div/>) => 구역은 있지만 아무것도 없는 것으로 보이게함 */}
            {calenderDate2.map((day, index) =>
              day ? (
                <button
                  key={index}
                  onClick={() => {
                    dateOnClick(day);
                  }}
                  className="flex flex-col items-center justify-center
                  m-1 p-1 rounded-2xl cursor-pointer"
                >
                  <span className="text-2xl">
                    <HiCalendar />
                  </span>
                  {/* 조건부 스타일 양식: 
                  className={`공통클래스 ${조건 ? '조건부클래스' : '대체클래스'}`} */}
                  {/* ? "" : "" 를 늘려 순서대로 스타일링 조건을 확장 시킬 수 있음 */}
                  <div
                    className={`p-1 m-1 w-6 text-sm rounded-2xl ${
                      isSameDate(
                        new Date(currentYear, currentMonth, day),
                        selectDate
                      )
                        ? 'bg-black text-white'
                        : 'bg-white text-black'
                    }`}
                  >
                    {day}
                  </div>
                </button>
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

export default Calender;
