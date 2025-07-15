import axios from 'axios';

export const apiPath = 'http://localhost:8080/api';
const bodyParserHeaders = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const apiGetProfile = async () => {
  try {
    const response = await axios.get(`${apiPath}/profile`);

    return response.data;
  } catch {
    return {};
  }
};

export const apiPostProfile = async (data) => {
  const response = await axios.post(`${apiPath}/profile`, data, {
    ...bodyParserHeaders,
  });
  return response;
};

export const apiGetTasks = async () => {
  const response = await axios.get(`${apiPath}/tasks`);

  return response.data;
};

export const apiPostNewTask = async (data) => {
  const response = await axios.post(`${apiPath}/tasks/new`, data, {
    ...bodyParserHeaders,
  });
  return response.data;
};

export const apiGetTask = async (id) => {
  const response = await axios.get(`${apiPath}/tasks/task/${id}`);
  return response.data;
};

export const apiPutReset = async () => {
  const response = await axios.put(`${apiPath}/reset`);
  return response;
};

export const apiPutTasks = async (data) => {
  const response = await axios.put(`${apiPath}/tasks`, data, {
    ...bodyParserHeaders,
  });
  return response;
};

export const apiPutTask = async (data) => {
  const response = await axios.put(`${apiPath}/tasks/task`, data, {
    ...bodyParserHeaders,
  });
  return response;
};

export const apiDeleteTasks = async (data) => {
  const response = await axios.delete(`${apiPath}/tasks`, {
    data,
    ...bodyParserHeaders,
  });
  return response;
};

export const apiGetTaskImage = async (filename) => {
  const response = await axios.get(
    `${apiPath}/data/images/${filename}}?timestamp=${new Date().getTime()}`,
    { 'Cache-Control': 'no-cache', Pragma: 'no-cache', Expires: '0' },
  );
  return response;
};

export const apiGetTheme = async () => {
  try {
    const response = await axios.get(`${apiPath}/theme`);

    return response.data;
  } catch {
    return {};
  }
};

export const apiPutTheme = async (data) => {
  const response = await axios.put(`${apiPath}/theme`, data, {
    ...bodyParserHeaders,
  });
  return response;
};
