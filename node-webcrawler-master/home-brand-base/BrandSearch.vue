<template>
    <div class="pages">
        <div class="search">
            品牌名称/品牌ID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-input class="search-input" v-model="input" placeholder="请输入内容" @keydown.enter.native="submit" clearable>
            </el-input>
            <el-button class="" @click="submit">搜索</el-button>
        </div>
        <div class="searchinfo">
            <el-table 
                :data="tableData" 
                border 
                style="width: 100%"
                >
                <el-table-column 
                    v-for="{ prop, label } in tableName" 
                    :key="prop" 
                    :prop="prop" 
                    :label="label">
                </el-table-column>
                <el-table-column label="修改" width='80' fixed="right">
                    <template scope="scope">
                        <el-button @click="goDetail(scope.row.brandId)" type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="search-pagination"
                :current-page="currentPage"
                :page-size="20"
                :pager-count="5"
                layout="prev, pager, next"
                :total="1000"
                @current-change="currentChange">
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
      tableData: [],
      currentPage: 1,
      tableName: [
        {
          prop: "brandId",
          label: "品牌ID"
        },
        {
          prop: "brandName",
          label: "常用品牌名"
        },
        {
          prop: "nameCN",
          label: "品牌中文名"
        },
        {
          prop: "nameEN",
          label: "品牌英文名称"
        },
        {
          prop: "brandAlias",
          label: "品牌别名"
        },
        {
          prop: "foundDate",
          label: "品牌成立时间"
        }
      ]
    };
  },
  mounted() {},
  methods: {
    handleClick(row) {
      console.log(row);
    },
    goDetail(brandId) {
      console.log(brandId);
      window.open(location.href.replace("BrandInfo", `detail/${brandId}`));
    },
    submit() {
      service.invoke(
        service.ACTION_GET_BRANDS,
        {
          key: this.input,
          pageSize: 20,
          pageNo: 1
        },
        data => {
          // console.log(data.data.brands)
          if (data) {
            this.tableData = data.data.brands;
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
        service.ACTION_GET_BRANDS,
        {
          key: this.input,
          pageSize: 20,
          pageNo: (this.currentPage - 1) * 20 + 1
        },
        data => {
          // console.log(data.data.brands)
          if (data) {
            this.tableData = data.data.brands;
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
</style>