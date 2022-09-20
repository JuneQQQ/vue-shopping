export namespace Search {
    // 搜索结果 封装
    export interface SearchResult {
        // 左侧精选/广告商品
        selectGoods: Array<{
            id: number,
            img: string,
            price: number,
            title: string,
            remarks: number
        }>
        // 搜索结果包含的所有属性，包括品牌
        attrs: Array<{
            "attrId": number,
            "attrName": string   // 属性名
            "attrValueList": Array<{
                attrValueId: number,  // 属性值id
                attrValue: string  // 所有商品在这一属性名下的属性值
            }>
        }>
        // 商品列表
        goods: Array<{
            id: number,
            img: string,
            price: number,
            title: string,
            describe: string,
            remarks: number,
            shopName: string, // 商家名
            sales: number, //销量
            // 以下为带参搜索需要的参数
            "createTime": string,
            "category1Id": number,
            "category1Name": number,
            "category2Id": number,
            "category2Name": number,
            "category3Id": number,
            "category3Name": number,
            "hotScore": number,
            "attrs": string[]
        }>
        // 分页参数
        "total": number,
        "pageSize": number,
        "pageNo": number,
        "totalPages": number,
    }

    // 搜索所需参数，参数全部是可选的
    export interface SearchParam {
        category1Id?: number
        category2Id?: number
        category3Id?: number
        categoryName?: string  // 分类名
        keyword?: string
        props?: string[]    // 商品属性的数组: ["属性ID:属性值:属性名"] 示例: ["2:6.0～6.24英寸:屏幕尺寸"]
        trademark?: string  // 品牌: "品牌ID:品牌名称" 示例: "1:苹果"
        order?: string
        pageNo?: number  // 排序方式 1: 综合,2: 价格 asc: 升序,desc: 降序   示例: "1:desc"
        pageSize?: number
    }
}
