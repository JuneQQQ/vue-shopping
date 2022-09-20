export namespace Order {
    export interface CreateOrderParams{
        [index:number]:{
            skuId:number,
            count:number,
        }
    }

    // 提交订单 数据模型
    export interface OrderSubmitInfo{
        orderNo:number  // 订单号，可以根据订单号获取购买的商品信息
        addressId:number, // 收货地址
        remarks?:string, // 订单备注
    }

    // 订单确认页信息
    export interface OrderConfirmInfo {
        orderNo:number  // 订单编号可以做幂等性处理，并在数据库记录订单信息，有效时间设置为15min
        addressList:Array<{
            id: number,
            addressee: string,
            province: string,
            city: string,
            address: string,
            phone: number,
            postalCode: number
        }>
        goodsList?:Array<{   // 数据也可以从购物车取到
            skuId:number
            title:string
            singlePrice:number
            count?:number

            // 以下是购物车数据模型，上面不能比下面少
            // "skuId": number,
            // "title": string,
            // "singlePrice":number, // 单价
            // "count": number,
            // "totalPrice"?:number,
        }>
    }

    // 订单信息收集
    export interface OrderSubmitParams {
        addressId: number
        orderNo:string // 幂等性令牌
    }
}
