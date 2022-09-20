import request from "@/assets/request";
import type {Index} from "@/assets/model/HomeDataModel";



// 获取首页三级分类数据
export const reqCategoryList = () => {
    // 返回的数据格式可以和服务端约定
    return request.get<Array<Index.CategoryList>>('/product/getBaseCategoryList');
}

