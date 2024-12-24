<template>
  <div class="article-detail p15">
    <nav-bar title="文章详情"></nav-bar>
    <div class="font16 font-wb">{{ formData.title }}</div>
    <div class="font14 color-grey m5-t m15-b">
      <div>作者：{{ formData.author }}</div>
      <div style="margin-top: 3px">时间：{{ formData.create_time_desc }}</div>
    </div>
<!--    <div class="u-content m15-t">
      <quill-editor v-model="formData.content"  class="hidden-cursor" :editable="false" :readonly="true"  @focus="focus($event)"
                    :options="{modules:{toolbar:false}}"/>
    </div>-->
    <div class="ql-container  ">
      <div class="ql-editor" v-html="formData.content">
      </div>
    </div>

  </div>
</template>

<script>
import {articleDetail} from "@/api/home";

export default {
  name: "articleDetail",
  data(){
    return{
      formData:{}
    }
  },
  mounted() {
    if(this.$route.query && this.$route.query.article_id){
      articleDetail({article_id:this.$route.query.article_id}).then(res =>{
        this.formData=res.data
      })
    }

  },
  methods:{
    focus(event){
      event.enable(false) //不可编辑
    }
  }
}
</script>

<style scoped lang="less">
.article-detail{
  background: #ffffff;
  min-height: 100%;
  box-sizing: border-box;
  ::v-deep .ql-container.ql-snow{
    border:none;
    .ql-editor{
      padding: 0;
    }
  }
}
::v-deep .hidden-cursor .ql-editor {
  caret-color: transparent;
  outline: none;
}
.ql-editor{
  padding: 0;
}
</style>