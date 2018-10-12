<template>
    <div class="pages">
        <el-button class="top" type="primary" @click="addDetail">新增产品</el-button>

        <el-form label-width="80px">
            <el-form-item label="产品状态:" >
                <el-select v-model="status" @change="changeStatus" placeholder="请选择">
                    <el-option 
                        v-for="item in options" 
                        :key="item.value" 
                        :label="item.label" 
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <div class="searchinfo">
            <el-table :data="products" border style="width: 100%">
                <el-table-column 
                    v-for="{ prop, label } in tableName" 
                    :key="prop" 
                    :prop="prop" 
                    :label="label">
                </el-table-column>
                <el-table-column label="审核" width='80' fixed="right">
                    <template scope="scope">
                        <!-- <a v-link="{ name: '产品信息', params: { deviceId: 123, dataId:456 }}" > -->
                        <el-button @click="goDetail(scope.row.productId)" type="text" size="small">审核</el-button>
                        <!-- </a> -->
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="search-pagination" :current-page="currentPage" :page-size="20" :pager-count="5" layout="prev, pager, next" :total="1000" @current-change="currentChange">
            </el-pagination>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import env from "@lib/env";
import * as service from "./api/service.js";

export default {
  data() {
    return {
      input: "",
      products: [],
      currentPage: 1,
      status: 0,
      options: [
        {
          value: 0,
          label: "所有"
        },
        {
          value: 1,
          label: "审核通过"
        },
        {
          value: 2,
          label: "审核拒绝"
        },
        {
          value: 3,
          label: "未审核"
        }
      ],
      tableName: [
        {
          prop: "productId",
          label: "产品ID"
        },
        {
          prop: "name",
          label: "产品名称"
        },
        {
          prop: "spuTypeName",
          label: "产品分类"
        },
        {
          prop: "addTime",
          label: "添加时间"
        },
        {
          prop: "updateTime",
          label: "更新时间"
        },
        {
          prop: "status",
          label: "状态"
        }
      ]
    };
  },
  props: ["brandId"],
  mounted() {
    this.getPorduct();
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    goDetail(productId) {
      console.log(productId);
      window.open(
        location.href.replace(
          `detail/${this.brandId}`,
          `productDetail/${productId}`
        )
      );
    },
    addDetail() {
      window.open(
        location.href.replace(`detail/${this.brandId}`, `productDetail/0`)
      );
    },
    getPorduct() {
      service.invoke(
        service.ACTION_GET_BRAND_PRODUCTS,
        {
          key: this.input,
          pageSize: 20,
          pageNo: 1
        },
        data => {
          console.log(data);
          if (data) {
            this.products = data.data2.products;
          }
        },
        (data, msg) => {
          alert(msg);
        }
      );
    },
    changeStatus() {
      service.invoke(
        service.ACTION_GET_BRAND_PRODUCTS,
        {
          key: this.input,
          status: this.status,
          pageSize: 20,
          pageNo: 1
        },
        data => {
          console.log(data);
          if (data) {
            this.products = data.data2.products;
          }
        },
        (data, msg) => {
          alert(msg);
        }
      );
    },
    currentChange(val) {
      this.currentPage = val;
      service.invoke(
        service.ACTION_GET_BRAND_PRODUCTS,
        {
          brandId: this.brandId,
          status: this.status,
          pageSize: 20,
          pageNo: (this.currentPage - 1) * 20 + 1
        },
        data => {
          console.log(data);
          if (data) {
            this.products = data.data2.products;
          }
        },
        (data, msg) => {
          alert(msg);
        }
      );
    }
  }
};
</script>

<style type="text/less" lang="less">
.pages {
  max-width: 950px;

  .search {
    font-size: 16px;
    margin-bottom: 20px;
    // background: #aaa;
    .search-input {
      width: 30%;
      margin-right: 5%;
    }
  }
  .searchinfo {
    .search-pagination {
      margin-top: 20px;
      margin-right: 2%;
    }
  }
}
.top {
  margin-bottom: 20px;
}
</style>