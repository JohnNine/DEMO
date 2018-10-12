<template>
    <div>
        <el-form ref="product" :model="product" label-width="80px">
            <el-form-item label="*产品分类:">
                <el-select v-model="product.category" clearable @change="getSpuTag" placeholder="请选择">
                    <el-option v-for="item in homeSPUCategories" :key="item.spuType" :label="item.spuTypeName" :value="item.spuType">
                    </el-option>
                </el-select>
                如需添加分类请联系销售在线提问
            </el-form-item>
            <el-form-item label="*产品型号:">
                <el-input class="input" v-model="product.modelInfo">
                </el-input>
            </el-form-item>
            <el-form-item label="*产品品牌:">
                <el-input class="input" v-model="product.name">
                </el-input>
                最多30个字
            </el-form-item>
            <el-form-item label="*产品名称:">
                <el-input class="input" v-model="product.spuName">
                </el-input>
                尽量不要加品牌
            </el-form-item>
            <el-form-item label="*产品概述:">
                <el-input class="input" v-model="product.productSummary">
                </el-input>
                最多10个字
            </el-form-item>
            <el-form-item label="*产品亮点:">
                <el-input class="input" v-model="product.features[0]">
                </el-input>
                最多20个字
            </el-form-item>
            <el-form-item label="*产品亮点:">
                <el-input class="input" v-model="product.features[1]">
                </el-input>
                最多20个字
            </el-form-item>
            <el-form-item label="产品亮点:">
                <el-input class="input" v-model="product.features[2]">
                </el-input>
                最多20个字
            </el-form-item>
        </el-form>
        <div class="img">
            <div>
                <div class="head">*产品头图</div>
                <div class="des">图片至少上传1张，最多5张，图片大小1600*1200px，单张图片不要超过10M。</div>
            </div>
            <div class="imgList" v-for="photosUrl in product.headPicList">
                <img :src="photosUrl">
                <el-button type="text" @click.prevent="removeImg(product.headPicList,photosUrl)">删除</el-button>
            </div>
            <pic-uploader class="imgUp" upload-key="file" @uploaded="handleImagesUploaded">
            </pic-uploader>
            <div style="clear: both"></div>
        </div>

        <div class="img">
            <div>
                <div class="head">* 产品详情图</div>
                <div class="des">
                    图片至少上传3张，建议8张，最多20张。
                    <br> 图片740px
                    < 宽度 < 1024px，高度 < 2048px，单张图片不要超过10M。 </div>
                </div>
                <div class="imgList" v-for="photosUrl in product.descriptionPicList">
                    <img :src="photosUrl">
                    <el-button type="text" @click.prevent="removeImg(product.descriptionPicList,photosUrl)">删除</el-button>
                </div>
                <pic-uploader class="imgUp" upload-key="file" @uploaded="handleImagesUploaded2">
                </pic-uploader>
                <div style="clear: both"></div>
            </div>

            <el-form ref="product" :model="product" label-width="80px">
                <el-form-item label="产品现价:">
                    <el-input class="input" v-model="product.price">
                    </el-input>
                </el-form-item>
                <el-form-item label="产品原价:">
                    <el-input class="input" v-model="product.originPrice">
                    </el-input>
                </el-form-item>
                <div v-for="(val, index) in product.homeTemplateTags">
                    <div v-if='val.type == 500'>
                        <el-form-item :label="`${val.cnName}:`">
                            <el-select v-model="val.value" placeholder="请选择">
                                <el-option label="是" :value="true"></el-option>
                                <el-option label="否" :value="false"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div v-else>
                        <el-form-item :label="`${val.cnName}:`">
                            <el-input class="input" v-model="val.value">
                            </el-input>
                        </el-form-item>
                    </div>
                </div>
            </el-form>

            <div class="button">
                <el-button type="primary" @click="onSubmit('brandInfo')">保存</el-button>
                <el-button v-if='productId != 0' type="primary" @click="statusUp()">审核通过</el-button>
                <el-button v-if='productId != 0' type="primary" @click="statusDown()">审核不通过</el-button>
            </div>

        </div>
</template>

<script type="text/ecmascript-6">
import env from "@lib/env";
import * as service from "./api/service.js";
import picUploader from "@components/pic-uploader.vue";

export default {
  data() {
    return {
      productId: "",

      product: {
        category: "",
        descriptionPicList: [],
        features: [],
        headPicList: [],
        homeTemplateTags: [
          {
            cnName: "",
            metaId: "",
            name: "",
            requred: "",
            type: "",
            value: ""
          }
        ]
      },
      hasSPUModilfPerrssion: true,
      productUrl: "",
      homeSPUCategories: [],
      tagJson: []
    };
  },
  components: {
    picUploader
  },
  mounted() {
    this.getProduct();
  },
  methods: {
    getProduct() {
      this.productId = this.$route.params.productId;
      service.invoke(
        service.ACTION_GET_BRAND_PRODUCT,
        {
          productId: this.productId
        },
        data => {
          // console.log(data)
          if (data) {
            this.product = data.data3.product;
            this.homeSPUCategories = data.data3.homeSPUCategories;
          }
        },
        (data, msg) => {
          alert(msg);
        }
      );
    },
    getSpuTag() {
      service.invoke(
        service.ACTION_GET_BRAND_PRODUCT_SPUTAG,
        {
          spuType: this.product.category
        },
        data => {
          console.log(data);
          if (data) {
            this.product.homeTemplateTags = data.homeTemplateTags;
            this.product.homeTemplateTags.forEach(val => {
              let value = {};
              value[val.metaId] = val.value;
              this.tagJson.push(value);
              // console.log(this.tagJson)
            });
          }
        },
        (data, msg) => {
          alert(msg);
        }
      );
    },
    isEmpty(v) {
      switch (typeof v) {
        case "undefined":
          return true;
        case "string":
          if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
            return true;
          break;
        case "boolean":
          if (!v) return true;
          break;
        case "number":
          if (0 === v || isNaN(v)) return true;
          break;
        case "object":
          if (null === v || v.length === 0) return true;
          for (var i in v) {
            return false;
          }
          return true;
      }
      return false;
    },
    onSubmit() {
      if (this.product.category == "") {
        this.$alert("请选择产品分类", "警告", {
          confirmButtonText: "确定"
        });
      }
      if (this.product.modelInfo == "") {
        this.$alert("请填写产品型号", "警告", {
          confirmButtonText: "确定"
        });
      }
      if (!this.product.name) {
        this.$alert("请填写产品品牌", "警告", {
          confirmButtonText: "确定"
        });
      }
      if (!this.product.spuName) {
        this.$alert("请填写产品名称", "警告", {
          confirmButtonText: "确定"
        });
      }
      if (!this.product.productSummary) {
        this.$alert("请填写产品概述", "警告", {
          confirmButtonText: "确定"
        });
      }
      if (this.product.features.length >= 2) {
        this.$alert("请填入大于一条亮点", "警告", {
          confirmButtonText: "确定"
        });
      }

      this.save();
    },
    save() {
      console.log(this.tagJson);
      const productUp = {
        spuType: this.product.spuType,
        productId: this.productId,
        productName: this.product.spuName,
        productSummary: this.product.productSummary,
        price: this.product.price,
        originPrice: this.product.originPrice,
        productFeatures: this.product.features,
        brandName: this.product.name,
        productModel: this.product.modelInfo,
        headPics: this.product.headPicList,
        detailPics: this.product.descriptionPicList,
        tagJson: this.tagJson
      };
      service.invoke(
        service.ACTION_POST_BRAND_PRODUCT_UPDATA,
        {
          product: productUp
        },
        data => {
          this.$alert("保存成功", "", {
            confirmButtonText: "确定"
          });
        },
        (data, msg) => {
          alert(msg);
        }
      );
    },
    removeImg(ind, item) {
      let index = ind.indexOf(item);
      if (index !== -1) {
        ind.splice(index, 1);
      }
    },
    handleImagesUploaded(data) {
      let newArr = data.images.map(keys => {
        this.product.headPicList.push(keys.key);
      });
    },
    handleImagesUploaded2(data) {
      let newArr = data.images.map(keys => {
        this.product.descriptionPicList.push(keys.key);
      });
    },
    statusUp() {
      service.invoke(
        service.ACTION_POST_BRAND_PRODUCT_AUDIT,
        {
          productId: this.productId,
          status: 1
        },
        data => {
          this.$alert("审核通过", "", {
            confirmButtonText: "确定"
          });
        },
        (data, msg) => {
          alert(msg);
        }
      );
    },
    statusDown() {
      service.invoke(
        service.ACTION_POST_BRAND_PRODUCT_AUDIT,
        {
          productId: this.productId,
          status: 2
        },
        data => {
          this.$alert("审核不通过", "", {
            confirmButtonText: "确定"
          });
        },
        (data, msg) => {
          alert(msg);
        }
      );
    }
  }
};
</script>

<style lang="less" scoped>
.input {
  width: 30%;
  margin-right: 10px;
}
.margin {
  margin-bottom: 20px;
}
.img {
  border-top: 2px solid #48576a;

  width: 950px;
  // height: 200px;
  margin-top: 20px;
  padding-top: 20px;
  margin-bottom: 20px;
  .imgList {
    float: left;
    width: 102px;
    height: 102px;
    margin-right: 10px;
    img {
      width: 100%;
      height: 80%;
    }
    button {
      margin: auto;
      text-align: center;
    }
  }
  .imgUp {
    float: left;
    width: 102px;
    height: 102px;
  }
}
.head {
  font-size: 14px;
  color: #48576a;
  font-weight: bold;
  margin-bottom: 10px;
}
.des {
  font-weight: bold;
  margin-bottom: 10px;
}
.hr {
  width: 100%;
  border: 1px solid #aaa;
}
</style>
<style>
.upload-button {
  margin-right: 0 !important;
}
</style>