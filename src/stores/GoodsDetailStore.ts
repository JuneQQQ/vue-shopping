import {defineStore} from 'pinia'
import {mockAddToCart} from "@/assets/api/mock/mock-main";
import type {GoodsDetail} from "@/assets/model/GoodsDetailDataModel";

export const useGoodsItemStore = defineStore('detail', {
    state: () => {
        return {
            goodsInfo: <GoodsDetail.GoodsInfo>{},
            curSelectedSkuId: <number>-1,
            curSelectedCount: <number>0,
            curSelectedSinglePrice: <number>0,
        }
    },
    getters: {
        getTotalPrice(state) {
            return state.curSelectedCount * state.curSelectedSinglePrice
        },
        getPayment(state) {
            let total = state.curSelectedCount * state.curSelectedSinglePrice;
            const three = total / 3;
            const sex = total / 6;
            const twelve = total / 12 * 1.0025;
            const twentyFour = total / 24 * 1.005;
            return [
                {
                    tooltip: '无手续费',
                    type: '不分期'
                },
                {
                    tooltip: '无手续费',
                    type: `￥${three.toFixed(2)} x 3期`
                },
                {
                    tooltip: '无手续费',
                    type: `￥${sex.toFixed(2)} x 6期`
                },
                {
                    tooltip: '含手续费：费率0.25%起，￥0.1起×12期',
                    type: `￥${twelve.toFixed(2)} x 12期`
                },
                {
                    tooltip: '含手续费：费率0.5%起，￥0.1起×12期',
                    type: `￥${twentyFour.toFixed(2)} x 24期`
                }
            ]
        }
    },
    actions: {
        async addToCart(skuId: number, count: number) {
            return true
            // let result = await  mockAddToCart({skuId,count})
            // if(result.code == 200){
            //     return result.data
            // }else{
            //     return false
            // }
        },
        changeSelect(skuId: number) {
            this.curSelectedSkuId = skuId
            for (let i = 0; i < this.goodsInfo.skus.length; i++) {
                if (this.goodsInfo.skus[i].id === skuId) {
                    this.curSelectedSinglePrice = this.goodsInfo.skus[i].price
                    break
                }
            }
            this.curSelectedCount = 1;
            this.curSelectedSinglePrice *= this.curSelectedCount;
        },
        async getItem(skuId: number) {
            this.goodsInfo = {
                "goodsImg": ["/images/350x350.png", "/images/350x350.png", "/images/350x350.png", "/images/350x350.png"],
                "title": "苹果8/7手机壳iPhone7 Plus保护壳全包防摔磨砂硬外壳",
                "tags": ["满69-20元", "关注产品★送钢化膜", "BIT配次日达"],
                "discount": ["满148减10", "满218减20", "满288减30"],
                "promotion": ["跨店满减", "多买优惠"],
                "remarksNum": 6000,
                "skus": [
                    {
                        "id": 0,
                        "img": "/images/160x190.png",
                        "intro": "4.7英寸-深邃蓝",
                        "price": 28
                    }, {
                        "id": 1,
                        "img": "http://dummyimage.com/210x250",
                        "intro": "4.7英寸-星空黑",
                        "price": 29
                    }, {
                        "id": 2,
                        "img": "http://dummyimage.com/210x250",
                        "intro": "5.5英寸-香槟金",
                        "price": 28.5
                    }, {
                        "id": 3,
                        "img": "http://dummyimage.com/210x250",
                        "intro": "5.5英寸-玫瑰金",
                        "price": 32
                    }, {
                        "id": 4,
                        "img": "http://dummyimage.com/210x250",
                        "intro": "5.5英寸-深邃蓝",
                        "price": 32
                    }, {
                        "id": 5,
                        "img": "http://dummyimage.com/210x250",
                        "intro": "5.5英寸-星空黑",
                        "price": 35
                    }, {
                        "id": 6,
                        "img": "http://dummyimage.com/210x250",
                        "intro": "4.7英寸-香槟金",
                        "price": 26
                    }, {
                        "id": 7,
                        "img": "http://dummyimage.com/210x250",
                        "intro": "4.7英寸-玫瑰金",
                        "price": 25
                    }, {
                        "id": 8,
                        "img": "http://dummyimage.com/210x250",
                        "intro": "4.7英寸-中国红",
                        "price": 28
                    }],

                "hot": [{
                    "img": "/images/160x190.png",
                    "price": 28,
                    "sale": 165076
                }, {
                    "img": "/images/160x190.png",
                    "price": 36,
                    "sale": 135078
                }, {
                    "img": "/images/160x190.png",
                    "price": 38,
                    "sale": 105073
                }, {
                    "img": "/images/160x190.png",
                    "price": 39,
                    "sale": 95079
                }, {
                    "img": "/images/160x190.png",
                    "price": 25,
                    "sale": 5077
                }, {
                    "img": "/images/160x190.png",
                    "price": 20,
                    "sale": 3077
                }],
                "goodsDetail": [
                    "/images/160x190.png",
                    "/images/160x190.png",
                    "/images/160x190.png",
                    "/images/160x190.png",
                ],
                "param": [{"title": "商品名称", "content": "iPhone 7手机壳"}, {
                    "title": "商品编号",
                    "content": "10435663237"
                }, {"title": "店铺", "content": "Gavin Shop"}, {"title": "商品毛重", "content": "100.00g"}, {
                    "title": "商品产地",
                    "content": "中国大陆"
                }, {"title": "机型", "content": "iPhone 7"}, {"title": "材质", "content": "PC/塑料"}, {
                    "title": "款式",
                    "content": "软壳"
                }, {"title": "适用人群", "content": "通用"}],
                "remarks": {
                    "goodAnalyse": 90,
                    "remarksTags": ["颜色可人", "实惠优选", "严丝合缝", "极致轻薄", "质量没话说", "比定做还合适", "完美品质", "正品行货", "包装有档次", "不容易发热", "已经买第二个", "是全覆盖"],
                    "remarksNumDetail": [2000, 3000, 900, 1],
                    "detail": [{
                        "username": "p****1",
                        "values": 3,
                        "content": "颜色很好看，质量也不错！，还送了个指环，想不到哦！",
                        "goods": "4.7英寸-深邃蓝",
                        "create_at": "2018-05-15 09:20"
                    }, {
                        "username": "13****1",
                        "values": 5,
                        "content": "手感没的说，是硬壳，后背带有磨砂手感。很不错，很喜欢，还加送了钢化膜，支架环，物超所值，准备再买一个。很满意。物流很快。很愉快的一次购物！",
                        "goods": "5.5英寸-玫瑰金",
                        "create_at": "2018-05-13 15:23"
                    }, {
                        "username": "3****z",
                        "values": 4.5,
                        "content": "相当轻薄，店家还送了一大堆配件，*元非常值得！",
                        "goods": "4.7英寸-玫瑰金",
                        "create_at": "2018-05-05 12:25"
                    }, {
                        "username": "gd****c",
                        "values": 3.5,
                        "content": "就是我想要的手机壳，壳子很薄，手感不错，就像没装手机壳一样，想要裸机手感的赶快下手了。",
                        "goods": "4.7英寸-中国红",
                        "create_at": "2018-04-06 16:23"
                    }, {
                        "username": "r****b",
                        "values": 4.5,
                        "content": "壳子还不错，送的膜也可以，不过还是感觉膜小了那么一点，屏幕没法完全覆盖。对了，壳子稍微有点硬，可能会伤漆，所以不要频繁取壳就好。",
                        "goods": "4.7英寸-中国红",
                        "create_at": "2018-03-15 19:24"
                    }, {
                        "username": "d****e",
                        "values": 5,
                        "content": "磨砂的，相当漂亮，尺寸非常合适！精工细作！",
                        "goods": "5.5英寸-星空黑",
                        "create_at": "2018-03-10 10:13"
                    }]
                }
            }
            // let result = await mockItem(id)
            // if(result.code==200){
            //     this.item = result.data
            // }
        }
    }
})
