import axios from 'axios'

const baseURL = '/'
const ErrOk = 0
const axiosInstance = axios.create({
  baseURL,
  timeout: 10000
})

// axios封装意义 返回真正需要的数据  当网络层和业务层都成功返回数据 否则返回全局处理错误
interface BusinessCommonResponse<T> {
   code: number;
   result:T;
}
export const get = <T>(url:string, params?:Record<string, unknown>):Promise<T> => {
  return new Promise((resolve, reject) => {
    axiosInstance.get<BusinessCommonResponse<T>>(url, {
      params
    }).then(res => {
      if (res.status === 200 && res.data.code === ErrOk) {
        resolve(res.data.result)
      }
    }).catch(error => {
      reject(error)
    })
  })
}
