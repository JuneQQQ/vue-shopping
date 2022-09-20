export namespace ShoppingCart {
    // Cart详情页 数据模型
    export interface ShoppingCartInfo {
        [index:number]:{
            "skuId": number,
            "img":string,
            "title": string,
            "singlePrice":number, // 单价
            "count": number,
            "totalPrice"?:number,
            "isSelected":boolean,   // 是否选中
        }
    }
}
