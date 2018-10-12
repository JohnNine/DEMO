<template>
    <el-form ref="brandInfo" :model="brandInfo" label-width="130px">
        <el-form-item label="常用品牌名：" prop="brandName">
            {{brandInfo.brandName}}
        </el-form-item>
        <el-form-item label="中文名称：" prop="nameCN">
            {{brandInfo.nameCN}}
        </el-form-item>
        <el-form-item label="英文名称：" prop="nameEN">
            {{brandInfo.nameEN}}
        </el-form-item>
        <el-form-item label="发源地国别：" prop="country">
            {{brandInfo.country}}
        </el-form-item>
        <el-form-item label="品牌介绍：" prop="desc">
            {{brandInfo.desc}}
        </el-form-item>
        <el-form-item label="品牌成立时间：" prop="foundDate">
            {{brandInfo.foundDate}}
        </el-form-item>
        <el-form-item label="品牌是否上市：" :rules="{required: true}" prop="listInfo.listed">
            <el-select v-model="brandInfo.listInfo.listed" placeholder="请选择是否上市">
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
            </el-select>
            <el-form :model="brandInfo" label-width="100px">
                <el-form-item class="upList" v-if="brandInfo.listInfo.listed" label="上市地点：" :rules="{required: true}">
                    <div v-for="(listRecords, index) in brandInfo.listInfo.listRecords">
                        <el-input placeholder="上市城市" class="listRecords" v-model="listRecords.place">
                        </el-input>
                        <el-input class="listRecords" placeholder="上市时间" v-model="listRecords.date">
                        </el-input>
                        <el-input class="listRecords" placeholder="上市代码" v-model="listRecords.code">
                        </el-input>
                        <el-button @click.prevent="addDomain(brandInfo.listInfo.listRecords)">增加</el-button>
                        <el-button @click.prevent="removeDomain(brandInfo.listInfo.listRecords, listRecords)">删除</el-button>
                    </div>
                    <el-button @click.prevent="addDomain(brandInfo.listInfo.listRecords)">增加</el-button>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="获得荣誉：" :rules="{required: true}" prop="honors.honored">
            <el-select v-model="brandInfo.honors.honored" placeholder="请选择是否获得荣誉">
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
            </el-select>
            <el-form :model="brandInfo" label-width="100px">
                <el-form-item class="upList" v-if="brandInfo.honors.honored" label="荣誉：" :rules="{required: true}">
                    <div v-for="(honors, index) in brandInfo.honors.honors">
                        <el-input placeholder="获奖名称" class="listRecords" v-model="honors.name">
                        </el-input>
                        <el-input class="listRecords" placeholder="颁奖机构" v-model="honors.org">
                        </el-input>
                        <el-input class="listRecords" placeholder="获奖时间" v-model="honors.date">
                        </el-input>
                        <el-button @click.prevent="addDomain(brandInfo.honors.honors)">增加</el-button>
                        <el-button @click.prevent="removeDomain(brandInfo.honors.honors, honors)">删除</el-button>

                        <div class="honorsImg">
                            <div class="imgList" v-for="honorsUrl in honors.certificates">
                                <img :src="honorsUrl">
                                <el-button type="text" @click.prevent="removeImg(index,honorsUrl)">删除</el-button>
                            </div>
                            <pic-uploader class="imgUp" :upload-key="index" @uploaded="handleImagesUploaded">
                            </pic-uploader>
                        </div>
                    </div>
                    <el-button @click.prevent="addDomain(brandInfo.honors.honors)">增加</el-button>
                </el-form-item>
            </el-form>
        </el-form-item>

        <el-form-item label="品牌代言人：" :rules="{required: true}" prop="mouthPieces.has">
            <el-select v-model="brandInfo.mouthPieces.has" placeholder="请选择是否有品牌代言人">
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
            </el-select>
            <el-form :model="brandInfo" label-width="130px">
                <el-form-item class="upList" v-if="brandInfo.mouthPieces.has" label="代言人信息：" :rules="{required: true}">
                    <div v-for="(mouthPieces, index) in brandInfo.mouthPieces.mouthPieces">
                        <div>
                            <el-input placeholder="代言人信息" class="listRecords" v-model="mouthPieces.name"></el-input>
                            <el-button @click.prevent="addDomain(brandInfo.mouthPieces.mouthPieces)">增加</el-button>
                            <el-button @click.prevent="removeDomain(brandInfo.mouthPieces.mouthPieces, mouthPieces)">删除</el-button>
                        </div>
                        <div class="honorsImg">
                            <div class="imgList" v-for="photosUrl in mouthPieces.photos">
                                <img :src="photosUrl">
                                <el-button type="text" @click.prevent="removeImg2(index,photosUrl)">删除</el-button>
                            </div>
                            <pic-uploader class="imgUp" :upload-key="index" @uploaded="handleImagesUploaded2">
                            </pic-uploader>
                        </div>
                    </div>
                    <el-button @click.prevent="addDomain(brandInfo.mouthPieces.mouthPieces)">增加</el-button>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="获得专利：" :rules="{required: true}" prop="patents.has">
            <el-select v-model="brandInfo.patents.has" placeholder="请选择是否有专利">
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
            </el-select>
            <el-form :model="brandInfo" :rules="{required: true}" label-width="100px">
                <el-form-item class="upList" v-if="brandInfo.patents.has" label="专利：" :rules="{required: true}">
                    <div v-for="(agents, index) in brandInfo.patents.agents">
                        <el-input class="listRecords" placeholder="专利名称" v-model="agents.name">
                        </el-input>
                        <el-input class="listRecords" placeholder="专利编号" v-model="agents.code">
                        </el-input>
                        <el-input class="listRecords" placeholder="专利类型" v-model="agents.type">
                        </el-input>
                        <el-input class="listRecords" placeholder="专利获得时间" v-model="agents.date">
                        </el-input>
                        <el-button @click.prevent="addDomain(brandInfo.patents.agents)">增加</el-button>
                        <el-button @click.prevent="removeDomain(brandInfo.patents.agents, agents)">删除</el-button>
                    </div>
                    <el-button @click.prevent="addDomain(brandInfo.patents.agents)">增加</el-button>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit('brandInfo')">保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script type="text/ecmascript-6">
    import env from '@lib/env'
    import * as service from './api/service.js'
    import picUploader from '@components/pic-uploader.vue'
    import picList from '@components/pic-list.vue'

    export default {
        data() {
            return {
                brandInfo: {
                    listInfo: {
                        listed: '',
                        listRecords: [
                            {

                            }
                        ],
                    },
                    honors: {
                        honored: true,
                        honors: [{
                            name: "",
                            org: "",
                            date: "",
                            certificates: [],
                        }],
                    },
                    mouthPieces: {
                        has: '',
                        mouthPieces: [],
                    },
                    patents: {
                        has: '',
                        agents: [],
                    },
                },
            }
        },
        components: {
            picUploader,
            picList,
        },
        props: ['brandId'],
        mounted(){
            this.getBrandInfo();
        },
        methods: {
            onSubmit(formName) {
                console.log(this.brandInfo)
                if(
                    this.brandInfo.listInfo 
                    && this.brandInfo.honors 
                    && this.brandInfo.mouthPieces 
                    && this.brandInfo.patents
                ){
                    if(this.brandInfo.listInfo.listed){
                        if(this.brandInfo.listInfo.listRecords.length <= 0){
                            this.$alert('请检查上市信息', '警告', {
                                confirmButtonText: '确定',
                            });
                            return
                        } else {
                            this.brandInfo.listInfo.listRecords.forEach(
                                (val, index) => {
                                    if(val.date && val.code && val.place){
                                        console.log(val)
                                    } else {
                                        this.$alert('请检查上市信息', '警告', {
                                            confirmButtonText: '确定',
                                        });
                                        throw new Error("Something went badly wrong!");
                                    }
                                }
                            ); 
                        }
                        
                    } else {
                        if(this.brandInfo.listInfo.listed === false){
                            this.brandInfo.listInfo.listRecords = [];
                        } else {
                            this.$alert('请检查上市信息', '警告', {
                                confirmButtonText: '确定',
                            });
                            return;
                        }
                    }

                    if(this.brandInfo.honors.honored){
                        if(this.brandInfo.honors.honors.length <= 0){
                            console.log(1,this.brandInfo.honors.honors)
                            this.$alert('请检查荣誉信息', '警告', {
                                confirmButtonText: '确定',
                            });
                            return;
                        } else {
                            // console.log(1,this.brandInfo.honors.honors)
                            this.brandInfo.honors.honors.forEach(
                                (val, index) => {
                                    if(val.name && val.org && (val.certificates.length > 0) && val.date){
                                        console.log(val.certificates)
                                    } else {
                                        console.log(123123);
                                        this.$alert('请检查荣誉信息', '警告', {
                                            confirmButtonText: '确定',
                                        });
                                        throw new Error("Something went badly wrong!");
                                    }
                                }
                            );
                        }
                    } else {
                        if(this.brandInfo.honors.honored === false){
                            this.brandInfo.honors.honors = [];
                        } else {
                            this.$alert('请检查荣誉信息', '警告', {
                                confirmButtonText: '确定',
                            });
                            return;
                        }
                        
                    }
                    
                    if(this.brandInfo.mouthPieces.has){
                        if(this.brandInfo.mouthPieces.mouthPieces.length <= 0){
                            this.$alert('请检查代言人信息', '警告', {
                                confirmButtonText: '确定',
                            });
                            return;
                        } else {
                            this.brandInfo.mouthPieces.mouthPieces.forEach(
                                (val, index) => {
                                    if(val.name && (val.photos.length > 0)){
                                        console.log(val.photos)
                                    } else {
                                        this.$alert('请检查代言人信息', '警告', {
                                            confirmButtonText: '确定',
                                        });
                                        throw new Error("Something went badly wrong!");
                                    }
                                }
                            );
                        }
                    } else {
                        if(this.brandInfo.honors.honored === false){
                            this.brandInfo.mouthPieces.mouthPieces = [];
                        } else {
                            this.$alert('请检查代言人信息', '警告', {
                                confirmButtonText: '确定',
                            });
                            return;
                        }
                    }

                    if(this.brandInfo.patents.has){
                        if(this.brandInfo.patents.agents.length <= 0){
                            this.$alert('请检查专利信息', '警告', {
                                confirmButtonText: '确定',
                            });
                            return;
                        } else {
                            this.brandInfo.patents.agents.forEach(
                                (val, index) => {
                                    if(val.name && val.code && val.type && val.date){
                                        console.log(val.agents)
                                    } else {
                                        this.$alert('请检查专利信息', '警告', {
                                            confirmButtonText: '确定',
                                        });
                                        throw new Error("Something went badly wrong!");
                                    }
                                }
                            );
                        }
                    } else {
                        if(this.brandInfo.patents.has === false){
                            this.brandInfo.patents.agents = [];
                        } else {
                            this.$alert('请检查专利信息', '警告', {
                                confirmButtonText: '确定',
                            });
                            return;
                        }
                    }
                
                    this.save();
                } else {
                    this.$alert('请填写必填项', '警告', {
                        confirmButtonText: '确定',
                    });
                }
            },
            save(){
               service.invoke(
                    service.ACTION_POST_BRAND_UPDATA,
                    {
                        brand: this.brandInfo,
                    },
                    data => {
                        this.$alert('上传成功', '', {
                            confirmButtonText: '确定',
                        });
                    },
                    (data, msg) => {
                        alert(msg);
                    }
                ); 
            },
            getBrandInfo() {
                console.log(this.brandId)
                service.invoke(
                    service.ACTION_GET_BRAND_INFO,
                    {
                        key: this.brandId,
                    },
                    data => {
                        // console.log(data.data.brands)
                        if (data) {
                            this.brandInfo = data.brand;
                            console.log(this.brandInfo.honors.honored)
                        }
                    },
                    (data, msg) => {
                        alert(msg);
                    }
                );
            },
            
            removeDomain(key,item) {
                let index = key.indexOf(item)
                if (index !== -1) {
                    key.splice(index, 1)
                }
            },
            addDomain(key) {
                key.push({
                    value: '',
                    key: Date.now()
                });
            },
            removeImg(ind,item) {
                let index = this.brandInfo.honors.honors[ind].certificates.indexOf(item)
                if (index !== -1) {
                    this.brandInfo.honors.honors[ind].certificates.splice(index, 1)
                }
            },
            removeImg2(ind,item) {
                let index = this.brandInfo.mouthPieces.mouthPieces[ind].photos.indexOf(item)
                if (index !== -1) {
                    this.brandInfo.mouthPieces.mouthPieces[ind].photos.splice(index, 1)
                }
            },
            handleImagesUploaded(data){
                if(!this.brandInfo.honors.honors[data.key].certificates){
                    this.$set(this.brandInfo.honors.honors[data.key], 'certificates', [])
                }
                let newArr = data.images.map(keys => {
                    this.brandInfo.honors.honors[data.key].certificates.push(keys.key)
                });
            },
            handleImagesUploaded2(data){
                if(!this.brandInfo.mouthPieces.mouthPieces[data.key].photos){
                    this.$set(this.brandInfo.mouthPieces.mouthPieces[data.key], 'photos', [])
                }
                let newArr = data.images.map(keys => {
                    this.brandInfo.mouthPieces.mouthPieces[data.key].photos.push(keys.key)
                });
            },
        },
        
    }
</script>

<style lang="less" scoped>
.upList {
  margin-top: 20px;
  .listRecords {
    width: 25%;
    margin-bottom: 20px;
  }
}

.honorsImg {
  position: relative;
  width: 100%;
  height: 102px;
  display: block;
  margin-bottom: 20px;
  .imgList {
    float: left;
    width: 102px;
    height: 102px;
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
</style>
<style>
.upload-button {
  margin-right: 0 !important;
}
</style>
