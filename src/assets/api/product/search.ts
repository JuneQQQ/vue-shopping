import request from "@/assets/request";
import type {Search} from "@/assets/model/SearchDataModel";

export const reqSearch = (params: Search.SearchParam) => {
    console.log("reqSearch", {...params})
    // 返回的数据格式可以和服务端约定
    return request.post<Array<Search.SearchResult>>('/list', params);
}
