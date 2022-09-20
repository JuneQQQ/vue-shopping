export namespace User {
    // export interface UserAddressList {
    //     // 数据类型与下面同步
    //     [index: number]: {
    //         addressId?: number  // 如果是新增，则不会有id
    //         addressee?: string, // 收件人
    //         regionNumber?: string[],   // 省市区编号
    //         community?: string  // 社区地址
    //         postalCode?: number   // 邮政编码
    //         phone?: number
    //         province?: string,  // 省
    //         city?: string,  // 市
    //         area?: string,  // 区
    //     }
    // }

    // 个人中心 - 我的订单
    export interface AddressInfo {
        addressId?: number  // 如果是新增，则不会有id
        addressee?: string, // 收件人
        regionNumber?: string[],   // 省市区编号
        community?: string  // 社区地址
        postalCode?: number   // 邮政编码
        phone?: number
        province?: string,  // 省
        city?: string,  // 市
        area?: string,  // 区
    }

    // 个人中心 - 我的订单
    export interface OrderInfo {
        orderId?:number,
        orderNo?:string,
        imgUrl?:string,
        title?:string,
        count?:number,
        price?:number,
        createTime?:string,
        totalPrice?:number   // 这个商品的总价
    }

    // 登录的方式之一
    export interface LoginByPassword {
        username: string,
        password: string,
    }

    // 登录方式之二
    export interface LoginByPhone {
        phone: number,
        code: number,
    }

    // 登录返回的数据
    // 如果有错误那么会在状态码栏封装错误信息，这里显示null
    export interface UserInfo {
        id: number,
        avatar: string, // 头像url
        nickName: string,  // 昵称
        token: string,
    }

    export interface RegisterUserInfo {
        phone: number
        code: number
        username: string
        password: string
        repassword?: string
        avatar?: string  // 头像，可选
        email?: string // 邮箱，可选
    }
}
