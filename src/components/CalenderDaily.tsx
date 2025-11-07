const CalenderDaily = () => {
  // 문자열 배열 Ts
  // const date: string[] = ['월', '화', '수', '목', '금', '토', '일'];

  return (
    <>
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
    </>
  );
};

export default CalenderDaily;
