import mymock from "@/assets/mock-request";
import type {GoodsDetail} from "@/assets/model/GoodsDetailDataModel";
import type {Search} from "@/assets/model/SearchDataModel";
import type {Index} from "@/assets/model/HomeDataModel";
import type {ShoppingCart} from "@/assets/model/ShoppingCartDataModel";
import type {Order} from "@/assets/model/OrderDataModel";
import type {User} from "@/assets/model/UseDataModel";

export const mockCategoryList = () => {
    // 返回的数据格式可以和服务端约定
    return mymock.get<Array<Index.CategoryList>>('/categories');
}

export const mockBanner = () => {
    return mymock.get<Index.BannerList>('/banner');
}

export const mockFloorList = () => {
    return mymock.get<Index.FloorList>('/floor');
}

export const mockSearch = (params: Search.SearchParam) => {
    // 返回的数据格式可以和服务端约定
    return mymock.post<Search.SearchResult>('/search', params);
}

export const mockItem = (params: number) => {
    // 返回的数据格式可以和服务端约定
    return mymock.post<GoodsDetail.GoodsInfo>('/detail', params);
}


export const mockAddToCart = (params: GoodsDetail.AddToCartParams) => {
    // 返回的数据格式可以和服务端约定
    return mymock.post<boolean>('/addToCart', params);
}

export const mockCartInfo = (params: number) => {
    // 返回的数据格式可以和服务端约定
    return mymock.post<ShoppingCart.ShoppingCartInfo>('/shoppingCartInfo', params);
}


export const mockOrderConfirmInfo = (params: Order.CreateOrderParams) => {
    // 返回的数据格式可以和服务端约定
    return mymock.post<Order.OrderConfirmInfo>('/orderInfo', params);
}

export const mockLogin = (params: User.LoginByPassword|User.LoginByPhone) => {
    // 返回的数据格式可以和服务端约定
    return mymock.post<User.UserInfo>('/login', params);
}

export const mockCode = (params: number) => {
    // 返回的数据格式可以和服务端约定
    return mymock.post<boolean>('/sendCode', params);
}

export const mockVerifyPhone = (params: number) => {
    // 返回的数据格式可以和服务端约定
    return mymock.post<boolean>('/register/verifyPhone', params);
}

export const mockChangeAddressInfo = (params: User.AddressInfo) => {
    // 返回的数据格式可以和服务端约定
    return mymock.post<boolean>('/changeAddressInfo', params);
}









