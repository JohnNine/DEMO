<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="品牌信息" name="addBrand">
            <addBrand :brandId="brandId">
            </addBrand>
        </el-tab-pane>
        <el-tab-pane label="品牌标签" name="addTag">
            <add-tag :brandId="brandId">
            </add-tag>
        </el-tab-pane>
        <el-tab-pane label="经营范围" name="addArea">
            <add-area :brandId="brandId">
            </add-area>
        </el-tab-pane>
        <el-tab-pane label="品牌产品" name="addProduct">
            <add-product :brandId="brandId">
            </add-product>
        </el-tab-pane>
    </el-tabs>
</template>

<script type="text/ecmascript-6">
import env from "@lib/env";
import * as service from "./api/service.js";
import addBrand from "./addBrand.vue";
import addTag from "./addTag.vue";
import addProduct from "./addProduct.vue";
import addArea from "./addArea.vue";

export default {
  data() {
    return {
      brandId: this.$route.params.brandId,
      activeName: "addBrand"
    };
  },
  components: {
    addBrand,
    addTag,
    addProduct,
    addArea
  },
  mounted() {
    // console.log(this.brandId)
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event, this.activeName);
    }
  }
};
</script>