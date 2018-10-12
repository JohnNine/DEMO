<template>
    <div class="contentX">
        
        <el-select v-model="selectedCategory" class="select_category" clearable placeholder="请选择" value-key="categoryId">
            <el-option v-for="(item, index) in categoryList" :key="`category${index}`" :label="item.categoryName" :value="item"></el-option>
        </el-select>
        <el-button @click="addCategory">添加</el-button>

        <div v-if="selectedTags.length > 0">
            <div v-for="(val, index) in backCategories" :key="`checkedCategory${index}`">

                <div class="selected_category">
                    {{val.categoryName}} <el-button type="danger" size="small" @click="deleteCategory(val.categoryId)">删除</el-button>
                </div>

                <el-checkbox-group class="checkbox_tag" v-model="selectedTags">
                    <el-checkbox v-for="item in backCategories[index].tags" :label="item.tagId" :key="item.tagId">
                        {{item.tagName}}
                    </el-checkbox>
                </el-checkbox-group>
            </div>
        </div>

        <div class="btn_save">
            <el-button  type="primary" @click="onSubmit">保存</el-button>
        </div>
        
    </div>
</template>

<script type="text/ecmascript-6">
import env from "@lib/env";
import * as service from "./api/service.js";

export default {
  data() {
    return {
      backCategories: [],
      selectedCategory: "",
      categoryList: [],
      selectedTags: [],
      backCategoryId: []
    };
  },
  mounted() {
    this.getBackCategories();
    this.getSelectedTags();
    // this.getAllTag()
  },
  props: ["brandId"],
  comments: {},
  methods: {
    onSubmit() {
      // if (this.selectedTags) {
      if (this.selectedTags.length !== 0) {
        this.save();
      } else {
        this.$alert("请选择标签", "警告", {
          confirmButtonText: "确定"
        });
      }
      // } else {
      //     this.$alert('请选择类目', '警告', {
      //         confirmButtonText: '确定',
      //     });
      // }
    },
    save() {
      service.invoke(
        service.ACTION_POST_BRAND_TAGS_UPDATA,
        {
          brandId: this.brandId,
          tagIds: this.selectedTags,
          tagType: 1
        },
        data => {
          this.$alert("上传成功", "", {
            confirmButtonText: "确定"
          });
        },
        (data, msg) => {
          alert(msg);
        }
      );
    },
    getBackCategories() {
      service.invoke(
        service.ACTION_GET_BACKCATEGORIES,
        {},
        data => {
          console.log(data);
          this.categoryList = data.backCategories;
        },
        (data, msg) => {
          alert(msg);
        }
      );
    },

    addCategory() {
      if (this.selectedCategory) {
        let canAdd = true;
        this.backCategories.map(val => {
          if (this.selectedCategory.categoryId === val.categoryId) {
            canAdd = false;
            return false;
          }
        });
        if (canAdd) {
          this.getCategoryTags(this.selectedCategory);
        }
      }
    },

    deleteCategory(categoryId) {
      this.backCategories.map((val, index) => {
        if (categoryId === val.categoryId) {
          // 移除选中tags
          let tags = this.backCategories[index].tags;
          tags.map(val => {
            let checkedIndex = this.selectedTags.indexOf(val.tagId);
            if (checkedIndex !== -1) {
              this.selectedTags.splice(checkedIndex, 1);
            }
          });
          // 移除显示选中分类
          this.backCategories.splice(index, 1);
          return false;
        }
      });
    },

    getSelectedTags() {
      service.invoke(
        service.ACTION_GET_BRAND_TAGS,
        {},
        data => {
          if (data) {
            console.log(data);
            this.backCategories = data.backCategories;
            this.selectedTags = data.selectedTags;
          }
        },
        (data, msg) => {
          alert(msg);
        }
      );
    },

    getCategoryTags(item) {
      let data = { backCategoryId: item.categoryId, tagType: 1 };
      service.invoke(
        service.ACTION_GET_BACKCATEGORY_TAGS,
        data,
        data => {
          item.tags = data.tags;
          this.backCategories.push(item);
        },
        (data, msg) => {
          alert(msg);
        }
      );
    },

    getAllTag() {
      service.invoke(
        service.ACTION_GET_BRAND_TAGS,
        {
          brandId: this.brandId,
          tagType: 1
        },
        data => {
          console.log(data);
          if (data) {
            this.back = data;
            // this.back.selectedTags = data.selectedTags;
            this.addShopProductAction;
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

<style lang="less" scoped>
.contentX {
  padding: 5px 25px;
  .btn_save {
    margin-top: 40px;
  }
  .select_category,
  .checkbox_tag {
    margin-top: 15px;
  }
  .selected_category {
    margin-top: 15px;
    font-size: 18px;
    .el-button {
      margin-left: 15px;
    }
  }
}
</style>
