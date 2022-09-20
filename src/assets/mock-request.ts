import type {AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios'
import axios from 'axios'
import nprogress from "nprogress"
import "nprogress/nprogress.css"
import {ElMessage} from 'element-plus'
import {useUserStore} from "@/stores/UserStore";
import router from "@/router/MainRouter";
import type {User} from "@/assets/model/UseDataModel";
// 数据返回的接口
// 定义请求响应参数，不含data
interface Result {
    code: number;
    msg: string
}

// 请求响应参数，包含data
interface ResultData<T = any> extends Result {
    data: T;
}

const URL: string = 'https://mock.apifox.cn/m1/1590358-0-default/'   // 这里写前缀

enum RequestEnums {
    TIMEOUT = 20000,
    OVERDUE = 600, // 登录失效
    FAIL = 999, // 请求失败
    SUCCESS = 200, // 请求成功
}

const config = {
    // 默认地址
    baseURL: URL as string,
    // 设置超时时间
    timeout: RequestEnums.TIMEOUT as number,
    // 跨域时候允许携带凭证
    withCredentials: true,
}

class RequestHttp {
    // 定义成员变量并指定类型
    service: AxiosInstance;

    public constructor(config: AxiosRequestConfig) {
        // 实例化axios
        this.service = axios.create(config);

        /**
         * 请求拦截器
         * 客户端发送请求 -> [请求拦截器] -> 服务器
         * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
         */
        this.service.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                nprogress.start()
                const token = useUserStore().userInfo.token || '';
                return {
                    ...config,
                    headers: {
                        'x-access-token': token, // 请求头中携带token信息
                    }
                }
            },
            (error: AxiosError) => {
                // 请求报错
                Promise.reject(error)
            }
        )

        /**
         * 响应拦截器
         * 服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
         */
        this.service.interceptors.response.use(
            (response: AxiosResponse) => {

                const {data, config} = response; // 解构
                // 状态码600  需要登录
                if (data.code === RequestEnums.OVERDUE) {
                    // 登录信息失效，应跳转到登录页面，并清空本地的token
                    useUserStore().userInfo = <User.UserInfo>{}
                    localStorage.setItem('token', '');
                    router.replace({
                        name: 'Login'
                    })
                    return Promise.reject(data);
                }
                // 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
                if (data.code && data.code !== RequestEnums.SUCCESS) {
                    ElMessage.error(data); // 此处也可以使用组件提示报错信息
                    return Promise.reject(data)
                }
                nprogress.done()
                return data;
            },
            (error: AxiosError) => {
                const {response} = error;
                if (response) {
                    this.handleCode(response.status)
                }
                if (!window.navigator.onLine) {
                    ElMessage.error('网络连接失败');
                    // 可以跳转到错误页面，也可以不做操作
                    // return router.replace({
                    // path: '/404'
                    // });
                }
            }
        )
    }

    handleCode(code: number): void {
        switch (code) {
            case 401:
                ElMessage.error('登录失败，请重新登录');
                break;
            default:
                ElMessage.error('请求失败');
                break;
        }
    }

    // 常用方法封装
    get<T>(url: string, params?: any): Promise<ResultData<T>> {
        return this.service.get(url, {params});
    }

    post<T>(url: string, params?: any): Promise<ResultData<T>> {
        return this.service.post(url, params);
    }

    put<T>(url: string, params?: any): Promise<ResultData<T>> {
        return this.service.put(url, params);
    }

    delete<T>(url: string, params?: any): Promise<ResultData<T>> {
        return this.service.delete(url, {params});
    }
}

// 导出一个实例对象
export default new RequestHttp(config);
