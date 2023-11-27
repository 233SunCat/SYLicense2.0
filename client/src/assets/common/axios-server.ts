import axios, { AxiosResponse } from "axios";
import * as qs from 'qs';

interface Params {
  [key: string]: any;
}

const paramsSerializer = (params: Params): string => {
  return qs.stringify(params, { arrayFormat: 'brackets' });
};

const AxiosPost = async (data: Params, path: string): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios({
      url: path,
      data: data,
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  } catch (error) {
    throw error; // 抛出错误，以便调用方能够捕获
  }
};

const AxiosGet = async (path: string): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.get(path);
    return response.data;
  } catch (error) {
    throw error; // 抛出错误，以便调用方能够捕获
  }
};

export default { AxiosPost, AxiosGet };
