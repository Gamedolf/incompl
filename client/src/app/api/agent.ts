import axios, { AxiosResponse } from "axios";
import { Shortlink } from "../models/shortlink";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(async (response) => {
  try {
    await sleep(0);
    return response;
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Shortlinks = {
  list: () => requests.get<Shortlink[]>("/shortlinks"),
  details: (id: string) => requests.get<Shortlink>(`/shortlinks/${id}`),
  create: (shortlink: Shortlink) => requests.post<void>("/shortlinks", shortlink),
  update: (shortlink: Shortlink) => requests.put<void>(`/shortlinks/${shortlink.id}`, shortlink),
  delete: (id: string) => requests.del<void>(`/shortlinks/${id}`),
};

const agent = {
  Shortlinks,
};

export default agent;
