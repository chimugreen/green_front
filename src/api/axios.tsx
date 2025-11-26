// 투두 fe be 연동
import axios from 'axios';

//
const api = axios.create({
  baseURL: 'http://192.168.0.10:8080/',
});

const token = localStorage.getItem('AccessToken');

//post = 추가
export const addTodo = async (
  content: string,
  schedule: Date,
  isDone: boolean
) => {
  try {
    const response = await api.post(
      '/todos',
      {
        content: content,
        schedule: schedule.toISOString().split('T')[0],
        isDone: isDone,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data;

    // ⭐ FE에서 쓰는 Todo 형태로 변환
    const converted = {
      id: data.id,
      content: data.content,
      schedule: data.schedule ? new Date(data.schedule) : null,
      isDone: data.done, // <--- 여기!
    };

    console.log('추가 성공 변환:', converted);

    return converted; // FE는 이걸 받음
  } catch (error) {
    console.log('추가 실패', error.response?.data || error.message);
  }
};

// get = 조회
export const getTodos = async () => {
  try {
    const response = await api.get('/todos', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const list = response.data;

    // 리스트도 변환 필요
    const convertedList = list.map((item: any) => ({
      id: item.id,
      content: item.content,
      schedule: item.schedule ? new Date(item.schedule) : null,
      isDone: item.done,
    }));

    return convertedList;
  } catch (error) {
    console.error('조회 실패:', error);
    throw error;
  }
};

// // put = 수정
// const putTodo = async () => {
//     try {
//         const response = await api.put(, {

//         })
//         console.log("수정 성공");
//     } catch (error) {
//         console.log("수정 실패");
//     }
// }

// // delete = 삭제
// const delTodo = async () => {
//     try {
//         const response = await api.delete(, {

//         })
//         console.log("삭제 성공");
//     } catch (error) {
//         console.log("삭제 실패");
//     }
// }
