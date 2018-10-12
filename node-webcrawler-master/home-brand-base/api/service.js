/**
 * @fileOverview 家装品牌库
 * @author 孙子文
 */

import serviceFactory from '@lib/service-factory'
// import {HOST_E} from '@lib/path'

const urlPrefix = 'house.admin.test.sankuai.com'

export const ACTION_GET_BRANDS = 'ACTION_GET_BRANDS';
export const ACTION_GET_BRAND_INFO = 'ACTION_GET_BRAND_INFO';
export const ACTION_POST_BRAND_UPDATA = 'ACTION_POST_BRAND_UPDATA';
export const ACTION_GET_BACKCATEGORIES = 'ACTION_GET_BACKCATEGORIES';
export const ACTION_GET_BACKCATEGORY_TAGS = 'ACTION_GET_BACKCATEGORY_TAGS';
export const ACTION_GET_BRAND_TAGS = 'ACTION_GET_BRAND_TAGS';
export const ACTION_POST_BRAND_TAGS_UPDATA = 'ACTION_POST_BRAND_TAGS_UPDATA';
export const ACTION_GET_BRAND_PRODUCTS = 'ACTION_GET_BRAND_PRODUCTS';
export const ACTION_GET_BRAND_PRODUCT = 'ACTION_GET_BRAND_PRODUCT';
export const ACTION_GET_BRAND_PRODUCT_SPUTAG = 'ACTION_GET_BRAND_PRODUCT_SPUTAG';
export const ACTION_POST_BRAND_PRODUCT_UPDATA = 'ACTION_POST_BRAND_PRODUCT_UPDATA';
export const ACTION_POST_BRAND_PRODUCT_AUDIT = 'ACTION_POST_BRAND_PRODUCT_AUDIT';

const API_URL = {
    ACTION_GET_BRANDS: urlPrefix + '/ajax/home/brands',
    ACTION_GET_BRAND_INFO: urlPrefix + '/ajax/home/brand/info',
    ACTION_POST_BRAND_UPDATA: urlPrefix + '/ajax/home/brand/info/save',
    ACTION_GET_BACKCATEGORIES: urlPrefix + '/ajax/home/backCategories',
    ACTION_GET_BACKCATEGORY_TAGS: urlPrefix + '/ajax/home/backCategory/tags',
    ACTION_GET_BRAND_TAGS: urlPrefix + '/ajax/home/brand/tags',
    ACTION_POST_BRAND_TAGS_UPDATA: urlPrefix + '/ajax/home/brand/tags/save',
    ACTION_GET_BRAND_PRODUCTS: urlPrefix + '/ajax/home/brand/products',
    ACTION_GET_BRAND_PRODUCT: urlPrefix + '/ajax/home/brand/product',
    ACTION_GET_BRAND_PRODUCT_SPUTAG: urlPrefix + '/ajax/home/brand/product/spuTagTemplates',
    ACTION_POST_BRAND_PRODUCT_UPDATA: urlPrefix + '/ajax/home/brand/product/save',
    ACTION_POST_BRAND_PRODUCT_AUDIT: urlPrefix + '/ajax/home/brand/product/audit',
};

const ACTION_ALIS = {
    ACTION_GET_BRANDS: "查询品牌列表&搜索品牌",
    ACTION_GET_BRAND_INFO: "查询单个品牌",
    ACTION_POST_BRAND_UPDATA: "更新品牌",
    ACTION_GET_BACKCATEGORIES: "查询家装所有后台类目",
    ACTION_GET_BACKCATEGORY_TAGS: "查询某个后台类目的标签",
    ACTION_GET_BRAND_TAGS: "查询品牌标签",
    ACTION_POST_BRAND_TAGS_UPDATA: "保存品牌标签",
    ACTION_GET_BRAND_PRODUCTS: "查询品牌产品列表",
    ACTION_GET_BRAND_PRODUCT: "查询单个产品",
    ACTION_GET_BRAND_PRODUCT_SPUTAG: "查询某个产品分类对应的个性化模板",
    ACTION_POST_BRAND_PRODUCT_UPDATA: "新增/更新某个产品",
    ACTION_POST_BRAND_PRODUCT_AUDIT: "产品审核",
};

const data = {
    pageSize: 20,
    pageNo: 1,
    brands: [
        {
            brandId: 1,
            brandName: "东陶",
            nameCN: "",
            nameEN: "TOTO",
            brandAlias: "TOTO",
            foundDate: "1967.03"
        },
        {
            brandId: 2,
            brandName: "东陶",
            nameCN: "",
            nameEN: "TOTO",
            brandAlias: "TOTO",
            foundDate: "1967.03"
        },
        {
            brandId: 3,
            brandName: "东陶",
            nameCN: "",
            nameEN: "TOTO",
            brandAlias: "TOTO",
            foundDate: "1967.03"
        },
        {
            brandId: 4,
            brandName: "东陶",
            nameCN: "",
            nameEN: "TOTO",
            brandAlias: "TOTO",
            foundDate: "1967.03"
        },
    ],
}
const data2 = {
    "products": [{
        "productId": 1,
        "name": "TOTO",
        "spuType": 123,
        "spuTypeName": "马桶",
        "addTime": "2018-08-02 09:09:09",
        "updateTime": "2018-08-02 09:09:09",
        "status": 0
    }],
    "pageNo": 1,
    "pageSize": 20,
    "pageCount": 6
}
const brand = {
        "brandId": 1,
        "brandName": "TOTO",
        "nameCN": "东陶",
        "nameEN": "TOTO",
        "brandAlias": "TOTO",
        "country": "日本",
        "desc": "TOTO公司...",
        "foundDate": "1967",
        "listInfo": {
            "listed": '', // 是否上市
            "listRecords": [{
                "place": "上海",
                "date": "2017.08.09",
                "code": "AH876...",
            }]
        },
        "honors": {
            "honored": true,
            "honors": [{
                "name": "红点设计奖",
                "org": "德国红点委员会",
                "date": "2017.08.09",
                "certificates": [] //证书url
            }]
        },
        "mouthPieces": {
            "has": true,
            "mouthPieces": [{
                "name": "韩路宾",
                "photos": [] // 代言图片
            }]
        },
        "patents": {
            "has": true,
            "agents": [{
                "name": "一种具有多锁舌..",
                "code": "ZL786..", // 专利编码
                "type": "发明专利", // 专利类型
                "date": "2015.07.18"
            }]
        }
}

const backCategories = [{
    "categoryName": "地板",
    "categoryId": 2276
}, {
    "categoryName": "家居",
    "categoryId": 2275,
}, {
    "categoryName": "墙面",
    "categoryId": 2274,
}]

const homeTemplateTags =  [
    {
        "cnName": "颜色",
        "metaId": 741,
        "name": "color",
        "requred": false,
        "type": 500,
        "value": null
    },
    {
        "cnName": "test",
        "metaId": 742,
        "name": "color",
        "requred": false,
        "type": 50,
        "value": null
    },
    {
        "cnName": "demo",
        "metaId": 743,
        "name": "color",
        "requred": false,
        "type": 50,
        "value": null
    },
]

const back = {
    backCategories: [
        {
            "categoryName": "地板",
            "categoryId": 2276,
            "tags": [{
                "tagId": 2055,
                "tagName": "实木地板"
            }, {
                "tagId": 2056,
                "tagName": "橡木地板"
            }]
        },
        {
            "categoryName": "家居",
            "categoryId": 2275,
            "tags": [{
                "tagId": 1900,
                "tagName": "沙发"
            }, {
                "tagId": 1901,
                "tagName": "椅子"
            }]
        },
    ],
    selectedTags: [1900, 2055] 
}
const tags = [
    {
        "tagId": 3000,
        "tagName": "实木地板"
    },
    {
        "tagId": 3001,
        "tagName": "实木地板1"
    },
    {
        "tagId": 3002,
        "tagName": "实木地板2"
    },
]

const data3 = {
    "product": {
        "category": "微晶石",
        "descriptionPicList": [
            "http://p0.meituan.net/dpgroup/406d4877679fe68c45947bd7193fadb150512.jpg"
        ],
        "features": ["微晶石1", "微晶石2", "微晶石3"],
        "headPicList": [
            "http://p1.meituan.net/dpgroup/b04185fa3131248b226818875e14f170894721.jpg",
        ],
        "homeTemplateTags": [{
            "cnName": "颜色",
            "metaId": 741,
            "name": "color",
            "requred": false,
            "type": 500,
            "value": null
        }],
        "id": 802004,
        "modelInfo": "微晶石",
        "name": "品牌",
        "originPrice": 123,
        "price": 12,
        "productSummary": "微晶石",
        "spuName": "微晶石",
        "spuType": 574
    },
    "hasSPUModilfPerrssion": true,
    "productUrl": "/shop/17661020/material/product/802004",
    "homeSPUCategories": [
        {
            "parentId": 100003,
            "spuType": 571,
            "spuTypeName": "仿古砖1"
        },
        {
            "parentId": 100003,
            "spuType": 572,
            "spuTypeName": "仿古砖2"
        },
        {
            "parentId": 100003,
            "spuType": 573,
            "spuTypeName": "仿古砖3"
        },
        {
            "parentId": 100003,
            "spuType": 574,
            "spuTypeName": "仿古砖4"
        },
        {
            "parentId": 100003,
            "spuType": 575,
            "spuTypeName": "仿古砖5"
        },
        {
            "parentId": 100003,
            "spuType": 576,
            "spuTypeName": "仿古砖6"
        },

    ]
}
function mockHandle(
    action, 
    success
) {
    if (action === ACTION_GET_BRANDS) {
        return success({
            data,
        })
    }
    if (action === ACTION_GET_BRAND_INFO) {
        return success({
            brand,
        })
    }
    if (action === ACTION_GET_BACKCATEGORIES) {
        return success({
            backCategories
        })
    }
    if (action === ACTION_GET_BACKCATEGORY_TAGS) {
        return success({
            tags
        })
    }
    if (action === ACTION_GET_BRAND_TAGS) {
        return success(back)
    }
    if (action === ACTION_GET_BRAND_PRODUCTS) {
        return success({
            data2,
        })
    }
    if (action === ACTION_GET_BRAND_PRODUCT) {
        return success({
            data3,
        })
    }
    if (action === ACTION_GET_BRAND_PRODUCT_SPUTAG) {
        return success({
            homeTemplateTags,
        })
    }
    
    success({

    })
}


function successHandle(
    action, 
    res, 
    handle
) {
    console.log(res)
    let data = res.data;

    if (action === ACTION_GET_BRANDS) {
        console.log(data)
        return handle(data)
    }

    return handle(data);
}


export const invoke = serviceFactory.getInvokeFn(
    API_URL, 
    successHandle, 
    mockHandle
);