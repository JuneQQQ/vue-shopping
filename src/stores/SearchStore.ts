import {defineStore, storeToRefs} from 'pinia'
import {mockSearch} from "@/assets/api/mock/mock-main";
import type {Search} from "@/assets/model/SearchDataModel";

export const useSearchStore = defineStore('search', {
    state: () => {
        type FilterConditions = {
            attrs?: Array<{
                attrId: number,
                attrName: string,
                attrValueId: number,
                attrValue: string
            }>,
            sort?: {
                field?: string,
                asc?: boolean
            }
        }
        return {
            searchParam: <Search.SearchParam>{},
            searchResult: <Search.SearchResult>{},

            // 本地搜索过滤，默认按综合（hotScore）降序排列
            filterConditions: <FilterConditions>{attrs: [], sort: {field: "hotScore", asc: false}},
        }
    },
    actions: {
        changeSortCondition(field: string) {
            // @ts-ignore
            console.log("old values:", this.filterConditions.sort)
            // reverse true代表需要颠倒顺序
            // @ts-ignore
            let curField = this.filterConditions.sort.field
            // @ts-ignore
            let curOrder = this.filterConditions.sort.asc
            if (curField == field)
                // 逆转
                this.filterConditions.sort = {
                    field,
                    // @ts-ignore
                    asc: !curOrder
                }
            else
                // 新切换到一个排序标签，初始为降序
                this.filterConditions.sort = {field, asc: false}

            let newOrder = this.filterConditions.sort.asc
            // 更改商品排序
            this.searchResult.goods.sort(function (a, b) {
                if (field == 'price')
                    return newOrder ? a.price - b.price : b.price - a.price  // 价格排序
                if (field == 'remarks')
                    return newOrder ? a.remarks - b.remarks : b.remarks - a.remarks  // 评论排序
                if (field == 'sales')
                    return newOrder ? a.sales - b.sales : b.sales - a.sales // 评论排序
                if (field == 'hotScore')
                    return newOrder ? a.hotScore - b.hotScore : b.hotScore - a.hotScore; // 综合排序
                console.log("never to here，字段未完全匹配")
                return b.hotScore - a.hotScore;
            })
        },
        addOrRemoveFilterAttr(attrId: number, attrValueId: number, attrValue: string, attrName: string, isAdd: boolean) {
            console.log("这是一次", isAdd ? "更新" : "删除", "操作")
            let flag = false
            if (this.filterConditions.attrs) {
                for (let i = 0; i < this.filterConditions.attrs.length; i++) {
                    console.log(this.filterConditions.attrs[i])
                    if (this.filterConditions.attrs[i].attrId == attrId) {
                        console.log("找到了，需要更新/删除")
                        if (isAdd) {
                            // 更新
                            this.filterConditions.attrs[i] = {attrId, attrValueId, attrValue, attrName}
                        } else {
                            // 删除
                            this.filterConditions.attrs.splice(i, 1) // 删除这个元素
                        }
                        flag = true  // 标记已更新/删除
                        break
                    }
                }
            }
            // 没有找到
            if (!flag && isAdd) {
                console.log("没有找到，需要添加元素")
                if (this.filterConditions.attrs == undefined) this.filterConditions.attrs = [] // 空指针判断
                this.filterConditions.attrs.push({attrId, attrValueId, attrValue, attrName})
            }
        },
        async getSearchResult() {
            // 初始化过滤条件
            this.filterConditions = {attrs: [], sort: {field: "hotScore", asc: false}}

            let result = await mockSearch(this.searchParam);
            console.log("search result：", result)
            if (result.code == 200) {
                this.searchResult = result.data
            }
        }
    }
})
