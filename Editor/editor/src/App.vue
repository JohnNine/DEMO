<template>
  <div id="app">
		<button @click="click">输出</button>
    <!-- 工具栏容器 -->
    <div id="toolbar-container"></div>

    <!-- 编辑器容器 -->
    <div id="editor">
      <p>This is the initial editor content.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh-cn";
import CKEditor from "@ckeditor/ckeditor5-build-decoupled-document";
// import EssentialsPlugin from "@ckeditor/ckeditor5-essentials/src/essentials";
// import BoldPlugin from "@ckeditor/ckeditor5-basic-styles/src/bold";
// import ItalicPlugin from "@ckeditor/ckeditor5-basic-styles/src/italic";
// import LinkPlugin from "@ckeditor/ckeditor5-link/src/link";
// import ParagraphPlugin from "@ckeditor/ckeditor5-paragraph/src/paragraph";

export default {
  data() {
    return {
      editor: null, //编辑器实例
      // editorData: "<p>Content of the editor.</p>",
      // editorConfig: {
      //   plugins: [
      //     EssentialsPlugin,
      //     BoldPlugin,
      //     ItalicPlugin,
      //     LinkPlugin,
      //     ParagraphPlugin
      //   ],

      //   toolbar: {
      //     items: ["bold", "italic", "link", "undo", "redo"]
      //   }
      // }
    };
  },
  mounted() {
    this.initCKEditor();
    //  console.log(this.editor.getData())
  },
  methods: {
    initCKEditor() {
      CKEditor.create(document.querySelector("#editor"), {
        language: "zh-cn",
        ckfinder: {
          uploadUrl: "/admin/Upload/uploadUrl"
          //后端处理上传逻辑返回json数据,包括uploaded(选项true/false)和url两个字段
        }
      })
        .then(editor => {
          // const trackChanges = editor.plugins.get("TrackChanges");
          const toolbarContainer = document.querySelector("#toolbar-container");
          toolbarContainer.appendChild(editor.ui.view.toolbar.element);
          this.editor = editor; //将编辑器保存起来，用来随时获取编辑器中的内容等，执行一些操作
          // console.log(trackChanges);
        })
        .catch(error => {
          console.error(error);
        });
		},
		click() {
			axios({
				url: 'http://localhost:3000/md',
				method: 'post',
				data: {
					firstName: 'Fred',
					lastName: 'Flintstone',
					data: this.editor.getData()
				},
				transformRequest: [function (data) {
					// Do whatever you want to transform the data
					let ret = ''
					for (let it in data) {
						ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
					}
					return ret
				}],
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			})
		}
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#editor {
  height: 80vh;
}
</style>
