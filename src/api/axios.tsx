// 투두 fe be 연동
import axios from 'axios';
import type { Todo, TodoResponse } from '../routers/FeedPage';

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
  console.log(schedule + '11123');
  try {
    const token = localStorage.getItem('AccessToken');
    const response = await api.post(
      '/todos',
      {
        content,
        schedule: schedule,
        isDone,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data;

    return {
      id: data.id,
      content: data.content,
      schedule: data.schedule,
      isDone: data.done,
    };
  } catch (error) {
    console.log('추가 실패');
  }
};

// get = 조회
export const getTodos = async (): Promise<Todo[]> => {
  try {
    const token = localStorage.getItem('AccessToken'); // <-- 여기서 가져오기
    const response = await api.get('/todos', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const list = response.data;
    const convertedList = list.map((item: TodoResponse) => {
      const utcDate = new Date(item.schedule); // UTC 기준
      const koreaDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000); // 9시간 더함

      return {
        id: item.id,
        content: item.content,
        schedule: koreaDate,
        isDone: item.done,
      };
    });
    console.log('before');
    console.log(list);
    console.log('after');
    console.log(convertedList);

    return convertedList;
  } catch (error) {
    console.error('조회 실패:', error);
    throw error;
  }
};

// delete = 삭제
export const delTodo = async (todoId: number) => {
  try {
    const token = localStorage.getItem('AccessToken'); // 새로고침 후 token 확보
    const response = await api.delete(`/todos/${todoId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log('삭제 성공:', response.data);
    return response.data; // FE에서 필요하면 반환
  } catch (error) {
    console.error('삭제 실패:');
    throw error; // 에러 던져서 handleDel에서 잡을 수 있게
  }
};

// put = 수정
export const updateTodo = async (
  id: number,
  content: string,
  schedule: Date,
  isDone: boolean
) => {
  try {
    const token = localStorage.getItem('AccessToken');

    const response = await api.put(
      `/todos/${id}`,
      {
        content,
        schedule, // Date 객체 그대로 보내면 됨 (서버에서 자동으로 string 변환됨)
        isDone,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('수정 성공', response.data);
    return response.data;
  } catch (error) {
    console.log('수정 실패', error);
    throw error;
  }
};
