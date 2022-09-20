import {defineStore} from 'pinia'
import {mockBanner, mockCategoryList, mockFloorList} from "@/assets/api/mock/mock-main";
import type {Index} from "@/assets/model/HomeDataModel";
import {ElMessage} from "element-plus";

export const useIndexStore = defineStore('index', {
    state: () => {
        return {
            categoryList: <Index.CategoryList[]>[],
            bannerList: <Index.BannerList>[],
            floorList: <Index.FloorList>[],
        }
    },
    actions: {
        getBannerList() {
            // let result = await mockBanner();
            // console.log("from store req mockBanner", result)
            // if(result.code==200){
            //     this.bannerList = result.data
            // }else{
            //     ElMessage.error("请求失败，请重试")
            // }
            this.bannerList = [
                {id: 1, imgUrl: '/images/720x460.png'}, {id: 2, imgUrl: '/images/720x460.png'},
                {id: 3, imgUrl: '/images/720x460.png'}, {id: 4, imgUrl: '/images/720x460.png'}
            ]


        },
        async getCategoryList() {
            let result = await mockCategoryList();
            console.log("from store req reqCategoryList", result)
            if (result.code == 200) {
                this.categoryList = result.data
            } else {
                ElMessage.error("请求失败，请重试")
            }
        },
        async getFloorList() {
            let result = await mockFloorList();
            console.log("from store req mockFloorList", result)
            if (result.code == 200) {
                this.floorList = result.data
            } else {
                ElMessage.error("请求失败，请重试")
            }
        }
    },
})
