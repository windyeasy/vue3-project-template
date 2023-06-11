import axios from "axios";
import { BASE_URL, TIME_OUT } from "./config";

class Request {
  constructor(baseURL, timeout) {
    this.instance = axios.create({
      baseURL,
      timeout,
    });
    this.instance.interceptors.request.use((res) => {
      return res;
    });
    this.instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        return err;
      }
    );
  }
  request(config) {
    return new Promise((resolve, reject) => {
      this.instance(config)
        .then((res) => {
          resolve(res.data);
        })
        .catch(reject);
    });
  }
  /**
   *
   * @param {string} url 请求地址
   * @param {object} params 请求参数
   * @param {object} config 配置信息
   */
  get(url, params, config = {}) {
    return this.request({ url, method: "GET", params, ...config });
  }
  /**
   *
   * @param {string} url 请求地址
   * @param {object} data 请求参数/conf
   * @param {object} config 配置信息
   * return Promise
   */
  post(url, data, config = {}) {
    return this.request({ url, method: "POST", data, ...config });
  }
}
export default new Request(BASE_URL, TIME_OUT);
