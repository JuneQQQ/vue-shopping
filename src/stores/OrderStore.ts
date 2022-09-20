import {defineStore} from 'pinia'
import type {Order} from "@/assets/model/OrderDataModel";
import {useUserStore} from "@/stores/UserStore";
import {mockOrderConfirmInfo} from "@/assets/api/mock/mock-main";
import {ElMessage} from "element-plus";

const userStore = useUserStore()
export const useOrderStore = defineStore('order', {
    state: () => {
        return {
            createOrderParams: <Order.CreateOrderParams>[],
            orderInfo: <Order.OrderConfirmInfo>{},   // 提交订单页面的数据，由后端返回
            orderSubmitInfo: <Order.OrderSubmitInfo>{}   // 提交订单时的数据模型，由确认页收集
        }
    },
    getters: {
        // getCurrentSelectedSkuIdSet(state){
        //     return state.currentSelectedSkuIdSet
        // },

        // 计算购物车总价
        getOrderConfirmTotalPrice(state) {
            let sum = 0;
            // @ts-ignore
            for (let i = 0; i < state.orderInfo.goodsList.length; i++) { // @ts-ignore
                const a = state.orderInfo.goodsList[i]; // @ts-ignore
                sum += a.singlePrice * a.count
            }
            return sum;
        },
    },
    actions: {
        pay() {
            ElMessage.success("跳转支付宝支付接口...")
            ElMessage.success("正在支付...")
            ElMessage.success("支付成功...")
        },

        // 两个数组一一对应，代表某个商品买了多少件
        async getOrderInfo(createOrderParams: Order.CreateOrderParams) {
            let result = await mockOrderConfirmInfo(createOrderParams)
            if (result.code == 200) {
                this.orderInfo = result.data  // 页面显示的数据
                this.orderSubmitInfo.orderNo = result.data.orderNo  // 即将提交的数据
                if (result.data.addressList.length) this.orderSubmitInfo.addressId = result.data.addressList[0].id  // 默认选择第一个收货地址
            } else {
                console.log("请求状态码不是200")
            }
        },
        getOrderConfirmInfo(skuId?: number, count?: number) {
            if (skuId) {
                if (!count) {
                    console.error("只传递了skuId而没有count")
                    return
                }
                // 如果传参，说明是点击了"立即购买"按钮，那么去数据库查一遍数据
                this.getOrderInfo([{skuId, count}]) // 获取数据，查询orderNo、收货地址和【商品数据】
            } else {
                // 没有传参，说明是点击了购物车界面的"去结算"按钮，那么根据购物车已选id进行传参
                let params = []
                // 接着从购物车更新 商品数据
                // @ts-ignore
                for (let i = 0; i < userStore.shoppingCartInfo.length; i++) {
                    if (userStore.shoppingCartInfo[i].isSelected) {
                        params.push({skuId:userStore.shoppingCartInfo[i].skuId, count:userStore.shoppingCartInfo[i].count})
                    }
                }
                this.getOrderInfo(params) // 获取数据，查询orderNo、收货地址，不再查询商品数据
            }
        }
    }
})
