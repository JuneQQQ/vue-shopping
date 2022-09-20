export namespace Index {
    export interface CategoryList {
        categoryChild: Array<CategoryList>
        categoryName: string
        categoryId: number
    }



    // 首页banner数据模型
    export interface BannerList {
        [index: number]: {
            id: number,
            imgUrl: string
        },
    }

    // 首页floor数据模型
    export interface FloorList {
        [index:number]:{
            title:string,
            goods: Array<{
                "id": string,
                "imgUrl":string,
                "describe":string,
                "price":number
            }>,
        }
    }

}
