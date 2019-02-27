import { ApiResponse } from '../utils/types';

import { ApiAuth } from './auth.service';

const fakeAuthItems = [
  {
    email: 'viktorov2009@mail.ru',
    password: '7865Vik',
    lastname: 'Иванов',
    firstname: 'Виктор',
    username: 'user1',
    token: '7ed7e970-35b6-11e9-b56e-0800200c9a66',
    refresh_token: '57361e2c-850f-4d23-9ddd-33f315d6a1a5',
  },
  {
    email: 'dinamoFan@gmail.com',
    password: 'prosto234',
    lastname: 'Увалов',
    firstname: 'Максим',
    username: 'user2',
    token: '79587e1a-ab0d-4878-b621-379f63d7e2c8',
    refresh_token: '3e55cbf9-0420-4d63-b7bd-5e036ba225c4',
  },
  {
    email: 'zerotoolHK@yandex.ru',
    password: '45t67u78',
    lastname: 'Чараев',
    firstname: 'Сергей',
    username: 'user3',
    token: 'c08a3ab8-f697-43d6-b1dd-27bde92cdbc3',
    refresh_token: 'edc065fe-7203-453f-a750-d8b726ab46f7',
  },
];

export const fakeRefresh = (refreshToken: string | undefined) => {
  const user = fakeAuthItems.find(item => item.refresh_token === refreshToken);

  if (user === undefined) {
    return {
      status_code: 403,
      status: 'error',
      error: 'Access denied',
    };
  } else {
    return {
      status_code: 200,
      status: 'success',
      data: user,
    };
  }
};

export const fakeLogIn = (username: string, password: string) => {
  const user = fakeAuthItems.find(item => item.username === username);

  if (user === undefined) {
    return {
      status_code: 404,
      status: 'error',
      error: 'The specified resource was not found',
    };
  } else if (user.password !== password) {
    return {
      status_code: 403,
      status: 'error',
      error: 'Access denied',
    };
  } else {
    return {
      status_code: 200,
      status: 'success',
      data: user,
    };
  }
};

export const formatData = (response: ApiResponse<ApiAuth>) => {
  const { data, error, status_code, status } = response;

  const state = data !== undefined
    ? {
      login: data.username,
      firstName: data.firstname,
      lastName: data.lastname,
      email: data.email,
      token: data.token,
      refreshToken: data.refresh_token,
    }
    : undefined;

  return {
    state,
    statusCode: status_code,
    status,
    error,
  };
};
