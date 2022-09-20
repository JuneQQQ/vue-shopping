import {defineStore} from 'pinia'
import type {User} from "@/assets/model/UseDataModel";
import {mockCode, mockLogin} from "@/assets/api/mock/mock-main";
import {ElMessage} from "element-plus";
import type {ShoppingCart} from "@/assets/model/ShoppingCartDataModel";
// @ts-ignore
import {regionData} from 'element-china-area-data'
import router from "@/router/MainRouter";

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            loginForm: <User.LoginByPassword | User.LoginByPhone>{},
            userInfo: <User.UserInfo>{},
            loginByPassword: <boolean>true,
            registerUserInfo: <User.RegisterUserInfo>{},
            curRegisterStep: <number>0,

            shoppingCartInfo: <ShoppingCart.ShoppingCartInfo>[],


            userAddressList: <Array<User.AddressInfo>>[],  // 用户的地址信息
            addressInfo: <User.AddressInfo>{},   // 添加/修改地址信息

            userOrderList: <Array<User.OrderInfo>>[], // 用户的订单信息
            orderInfo: <User.OrderInfo>{},   // 添加/修改订单信息

            operations: <string[]>[],   // 尽量控制在4个字以内

            userHomeActiveTitleId: <string>'UserAddressInfo',

            regionData   // 省市联动数据
        }
    },
    getters: {
        getActiveTitle(state) {
            const idToTitle = new Map()
            idToTitle.set('UserAddressInfo', '我的收货地址')
            idToTitle.set('UserOrderInfo', '我的购物订单')
            return idToTitle.get(state.userHomeActiveTitleId)
        },

        getShoppingCartTotalPrice(state) {
            let sum = 0;
            console.log(state.shoppingCartInfo)
            // @ts-ignore
            for (let i = 0; i < state.shoppingCartInfo.length; i++) {
                //@ts-ignore
                if (state.shoppingCartInfo[i].isSelected) {
                    sum += state.shoppingCartInfo[i].singlePrice * state.shoppingCartInfo[i].count
                }
            }
            return sum;
        },
    },
    actions: {
        getOrderList() {
            this.userOrderList = [{
                orderId: 15,
                orderNo: "2144213251254645",
                imgUrl: "/images/350x350.png",
                title: "Apple苹果 iPhone SE3 (第三代) 64GB 黑色 移动联通电信5G手机 未激活无锁机",
                count: 2,
                price: 666,
                totalPrice: 1332,
                createTime: "2022-9-16",
            }, {
                orderId: 15,
                orderNo: "2144213251254645",
                imgUrl: "/images/350x350.png",
                title: "Apple苹果 iPhone SE3 (第三代) 64GB 黑色 移动联通电信5G手机 未激活无锁机",
                count: 2,
                price: 666,
                totalPrice: 2 * 666,
                createTime: "2022-9-16",
            }, {
                orderId: 15,
                orderNo: "2144213251254645",
                imgUrl: "/images/350x350.png",
                title: "Apple苹果 iPhone SE3 (第三代) 64GB 黑色 移动联通电信5G手机 未激活无锁机",
                count: 2,
                price: 666,
                totalPrice: 2 * 666,
                createTime: "2022-9-16",
            }, {
                orderId: 15,
                orderNo: "2144213251254645",
                imgUrl: "/images/350x350.png",
                title: "Apple苹果 iPhone SE3 (第三代) 64GB 黑色 移动联通电信5G手机 未激活无锁机",
                count: 2,
                price: 666,
                totalPrice: 2 * 666,
                createTime: "2022-9-16",
            }, {
                orderId: 15,
                orderNo: "2144213251254645",
                imgUrl: "/images/350x350.png",
                title: "Apple苹果 iPhone SE3 (第三代) 64GB 黑色 移动联通电信5G手机 未激活无锁机",
                count: 2,
                price: 666,
                totalPrice: 2 * 666,
                createTime: "2022-9-16",
            }, {
                orderId: 15,
                orderNo: "2144213251254645",
                imgUrl: "/images/350x350.png",
                title: "Apple苹果 iPhone SE3 (第三代) 64GB 黑色 移动联通电信5G手机 未激活无锁机",
                count: 2,
                price: 666,
                totalPrice: 2 * 666,
                createTime: "2022-9-16",
            }, {
                orderId: 15,
                orderNo: "2144213251254645",
                imgUrl: "/images/350x350.png",
                title: "Apple苹果 iPhone SE3 (第三代) 64GB 黑色 移动联通电信5G手机 未激活无锁机",
                count: 2,
                price: 666,
                totalPrice: 2 * 666,
                createTime: "2022-9-16",
            }, {
                orderId: 15,
                orderNo: "2144213251254645",
                imgUrl: "/images/350x350.png",
                title: "Apple苹果 iPhone SE3 (第三代) 64GB 黑色 移动联通电信5G手机 未激活无锁机",
                count: 2,
                price: 666,
                totalPrice: 2 * 666,
                createTime: "2022-9-16",
            }, {
                orderId: 15,
                orderNo: "2144213251254645",
                imgUrl: "/images/350x350.png",
                title: "Apple苹果 iPhone SE3 (第三代) 64GB 黑色 移动联通电信5G手机 未激活无锁机",
                count: 2,
                price: 666,
                totalPrice: 2 * 666,
                createTime: "2022-9-16",
            }, {
                orderId: 15,
                orderNo: "2144213251254645",
                imgUrl: "/images/350x350.png",
                title: "Apple苹果 iPhone SE3 (第三代) 64GB 黑色 移动联通电信5G手机 未激活无锁机",
                count: 2,
                price: 666,
                totalPrice: 2 * 666,
                createTime: "2022-9-16",
            }, {
                orderId: 15,
                orderNo: "2144213251254645",
                imgUrl: "/images/350x350.png",
                title: "Apple苹果 iPhone SE3 (第三代) 64GB 黑色 移动联通电信5G手机 未激活无锁机",
                count: 2,
                price: 666,
                totalPrice: 2 * 666,
                createTime: "2022-9-16",
            }, {
                orderId: 15,
                orderNo: "2144213251254645",
                imgUrl: "/images/350x350.png",
                title: "Apple苹果 iPhone SE3 (第三代) 64GB 黑色 移动联通电信5G手机 未激活无锁机",
                count: 2,
                price: 666,
                totalPrice: 2 * 666,
                createTime: "2022-9-16",
            }, {
                orderId: 15,
                orderNo: "2144213251254645",
                imgUrl: "/images/350x350.png",
                title: "Apple苹果 iPhone SE3 (第三代) 64GB 黑色 移动联通电信5G手机 未激活无锁机",
                count: 2,
                price: 666,
                totalPrice: 2 * 666,
                createTime: "2022-9-16",
            }, {
                orderId: 15,
                orderNo: "2144213251254645",
                imgUrl: "/images/350x350.png",
                title: "Apple苹果 iPhone SE3 (第三代) 64GB 黑色 移动联通电信5G手机 未激活无锁机",
                count: 2,
                price: 666,
                totalPrice: 2 * 666,
                createTime: "2022-9-16",
            }, {
                orderId: 15,
                orderNo: "2144213251254645",
                imgUrl: "/images/350x350.png",
                title: "Apple苹果 iPhone SE3 (第三代) 64GB 黑色 移动联通电信5G手机 未激活无锁机",
                count: 2,
                price: 666,
                totalPrice: 2 * 666,
                createTime: "2022-9-16",
            }, {
                orderId: 15,
                orderNo: "2144213251254645",
                imgUrl: "/images/350x350.png",
                title: "Apple苹果 iPhone SE3 (第三代) 64GB 黑色 移动联通电信5G手机 未激活无锁机",
                count: 2,
                price: 666,
                totalPrice: 2 * 666,
                createTime: "2022-9-16",
            }, {
                orderId: 15,
                orderNo: "2144213251254645",
                imgUrl: "/images/350x350.png",
                title: "Apple苹果 iPhone SE3 (第三代) 64GB 黑色 移动联通电信5G手机 未激活无锁机",
                count: 2,
                price: 666,
                totalPrice: 2 * 666,
                createTime: "2022-9-16",
            }, {
                orderId: 15,
                orderNo: "2144213251254645",
                imgUrl: "/images/350x350.png",
                title: "Apple苹果 iPhone SE3 (第三代) 64GB 黑色 移动联通电信5G手机 未激活无锁机",
                count: 2,
                price: 666,
                totalPrice: 2 * 666,
                createTime: "2022-9-16",
            },]
        },

        getUserAddressList() {
            this.userAddressList = [
                {
                    addressId: 123456,
                    addressee: 'Gavin',
                    province: '广东省',
                    city: '广州市',
                    area: '天河区',
                    community: '燕岭路633号',
                    phone: 15200000609,
                    postalCode: 510000
                },
                {
                    addressId: 123456,
                    addressee: 'Gavin',
                    province: '广东省',
                    city: '广州市',
                    area: '天河区',
                    community: '燕岭路633号',
                    phone: 15200000609,
                    postalCode: 510000
                },
                {
                    addressId: 123456,
                    addressee: 'Gavin',
                    province: '广东省',
                    city: '广州市',
                    area: '天河区',
                    community: '燕岭路633号',
                    phone: 15200000609,
                    postalCode: 510000
                },
                {
                    addressId: 123456,
                    addressee: 'Gavin',
                    province: '广东省',
                    city: '广州市',
                    area: '天河区',
                    community: '燕岭路633号',
                    phone: 15200000609,
                    postalCode: 510000
                },
                {
                    addressId: 123456,
                    addressee: 'Gavin',
                    province: '广东省',
                    city: '广州市',
                    area: '天河区',
                    community: '燕岭路633号',
                    phone: 15200000609,
                    postalCode: 510000
                },
                {
                    addressId: 123458,
                    addressee: 'Kevin',
                    province: '上海市',
                    city: '上海市',
                    area: '浦东新区',
                    community: '沙新镇',
                    phone: 15800000888,
                    postalCode: 200120
                }
            ];
        },

        deleteAddress(addressId: number) {
            // 1.服务端删除
            // ...
            // 2.本地删除

            // @ts-ignore
            for (let i = 0; i < this.userAddressList.length; i++) {
                if (this.userAddressList[i].addressId == addressId) {
                    // @ts-ignore
                    this.userAddressList.splice(i, 1)
                    break
                }
            }

            return true
        },
        //  查询地址信息
        showAddressInfo(addressId: number) {
            // const result = await mockAddressInfo(addressId)
            // if(result.code==200){
            //     this.addressInfo = result.data
            // }

            // dev 返回固定数据
            this.addressInfo = {
                addressId: 15,  // 如果是新增，则不会有id
                addressee: "JuneQQQ", // 收件人
                regionNumber: ["310000", "310100", "310101"],   // 省市区
                community: "东外滩嘎嘎社区",  // 社区地址
                postalCode: 110,
                phone: 110,
            }
        },

        changeAddressInfo() {
            // data中没有id就是新增，有id就是修改
            // let result = await mockChangeAddressInfo(this.addressInfo)
            // return result.code == 200;

            //1. 服务端修改
            // ... 如果是新增，则会返回id

            //2. 本地处理
            if (this.addressInfo.addressId) {
                // 本地修改
                for (let i = 0; i < this.userAddressList.length; i++) {
                    if (this.userAddressList[i].addressId === this.addressInfo.addressId) {
                        this.userAddressList[i] = this.addressInfo
                        break
                    }
                }
            } else {
                // 本地新增
                this.addressInfo.addressId = 1111 // 这个1111应该是服务端返回的数据
                // 后端需要再去进行regionNum=>具体地区的转换
                this.userAddressList.push(this.addressInfo)
            }

            return true
        },
        // 根据skuId找到商品单价
        getShoppingCartSingleItemTotalPrice(skuId: number) {
            // @ts-ignore
            for (let i = 0; i < this.shoppingCartInfo.length; i++) {
                const a = this.shoppingCartInfo[i];
                if (a.skuId == skuId) {
                    return a.singlePrice * a.count;
                }
            }
        },
        async getShoppingCartInfo() {
            console.log("获取购物车状态/购物车刷新")
            // TODO 购物车商品更新状态时机？？？
            // let result = await mockCartInfo(userId);
            // if(result.code==200){
            //     this.shoppingCartInfo = result.data
            // }
            this.shoppingCartInfo = [
                {
                    skuId: 1,
                    img: "/images/350x350.png",
                    title: "this is title1this is title1this is title1this is title1this is title1this is title1this is title1",
                    singlePrice: 15,
                    count: 1,
                    isSelected: true
                },
                {
                    skuId: 2,
                    img: "/images/350x350.png",
                    title: "this is title2",
                    singlePrice: 22,
                    count: 8,
                    isSelected: true
                },
                {
                    skuId: 3,
                    img: "/images/350x350.png",
                    title: "this is title3",
                    singlePrice: 5151,
                    count: 8,
                    isSelected: true
                },
                {
                    skuId: 4,
                    img: "/images/350x350.png",
                    title: "this is title4",
                    singlePrice: 153,
                    count: 9,
                    isSelected: true
                },
            ]
        },

        async verifyStep2() {
            // let result = await mockVerifyPhone(this.registerUserInfo.phone)
            let result = {
                code: 200,
                msg: "success",
                data: null
            }
            if (result.code == 200) {
                return true;
            } else {
                ElMessage.error(result.msg)
                return false;
            }
        },
        async verifyStep1() {
            // let result = await mockVerifyPhone(this.registerUserInfo.phone)
            let result = {
                code: 200,
                msg: "success",
                data: null
            }
            if (result.code == 200) {
                return true;
            } else {
                ElMessage.error(result.msg)
                return false;
            }
        },
        async login() {
            let result = await mockLogin(this.loginForm)
            if (result.code == 200) {
                this.userInfo = result.data
                return true  // login success
            } else {
                // 有错误返回错误信息
                ElMessage.error(result.msg)
                return false // login failure
            }
        },
        async sendCode() {
            let form = this.loginForm as User.LoginByPhone
            if (form.phone) {
                let result = await mockCode(form.phone);
                if (result.code == 200) {
                    ElMessage.success("验证码已发送")
                } else {
                    ElMessage.error("请检查手机号是否正确")
                }
            }
        }
    }
})
