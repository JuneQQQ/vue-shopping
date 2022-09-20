export namespace GoodsDetail {
    // 添加商品到购物车 数据模型
    export interface AddToCartParams{
        skuId:number,
        count:number
    }

    // 商品详情 数据模型
    export interface GoodsInfo {
        "goodsImg": string[]
        "title": string
        "tags": string[]
        "discount": string[]
        "promotion": string[]
        "remarksNum": number,
        "skus": Array<{
            "id":number,
            "img": string,
            "intro": string,
            "price": number
        }>
        "hot": Array<{
            "img": string
            "price": number
            "sale": number
        }>
        "goodsDetail": string[]
        "param": Array<{
            "title": string
            "content": string
        }>
        "remarks": {
            "goodAnalyse": number,
            "remarksTags": string[]
            "remarksNumDetail": number[]
            "detail": Array<{
                "username": string,
                "values": number,
                "content": string,
                "goods": string,
                "create_at": string
            }>
        }
    }

}
