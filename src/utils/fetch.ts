/*
 * @Author: wangshicheng
 * @Date: 2021-04-25 12:15:50
 * @LastEditTime: 2021-04-26 18:53:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/utils/fetch.ts
 */
/**
 * 返回状态码对应文本提示信息
 *
 * @param {number} code 响应状态码
 * @return {string} 文本提示
 */
function getErrorMsgByStatusCode(msg: string, code: number) {
  let result = "未知错误";
  if (code >= 400 && code < 500) {
    switch (code) {
      case 401:
        result = msg || "您尚未登录,请登录后访问.";
        break;
      case 403:
        result = msg || "您所请求的资源被禁止访问.";
        break;
      case 404:
        result = msg || "您所请求的资源并不存在.";
        break;
      case 405:
        result = msg || "非法请求被禁止.";
        break;
      case 406:
        result = msg || "参数错误.";
        break;
      default:
        result = `${"抱歉，程序出了问题"}(${code}).`;
    }
  } else if (code >= 500 && code < 600) {
    result = msg || "服务器出错啦.";
  }
  return result;
}

/**
 * 检查接口响应状态码
 *
 * @param {T} response fetch返回的响应对象
 * @return {Promise<T>} 状态码正常时返回响应本身，否则返回 reject 信息
 */
function checkStatus(response: any) {
  console.log("response", response);
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    const msg = getErrorMsgByStatusCode(response.msg, response.status);
    return Promise.reject({ msg, response });
  }
}

export interface IRequest {
  url: string;
  config: {
    method?: "GET" | "POST";
    params?: {};
  };
}
export const request = (requestApi: IRequest, requestParams: any = {}) => {
  const { url, config = {} } = requestApi;
  if (config.method === "GET") {
    return fetch(url)
      .then(checkStatus)
      .then((rps) => rps.json());
  }
  if (config.method === "POST") {
    console.log(requestApi);
    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestParams),
    })
      .then(checkStatus)
      .then((rps) => rps.json())
      .catch((error) => {
        console.error(error);
      });
  }
};
