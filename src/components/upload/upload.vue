<template>
  <div class="upLoad">
    <div class="file" :id="name">
      <el-button  plain style="opacity: 0.5" size="small" icon="el-icon-upload" circle></el-button>
      <input type="file" :accept="typeArr" @change="upload($event)">
      {{target}}
    </div>
  </div>
</template>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .file
    position: relative
    left: .26rem
    top: .2rem
    display: inline-block
    background: rgba(68, 138, 255, 0.11)
    border: 1px solid #99D3F5
    border-radius: 4px
    padding: 4px 12px
    overflow: hidden
    text-decoration: none
    text-indent: 0
    line-height: 20px
    color black
    margin-bottom 5px
    input
      position: absolute
      font-size: 100px
      right: 0
      top: 0
      opacity: 0
    #el-butt
      color black
      text-align center
      font-size 16px
      i
        font-size 16px
</style>

<script>
  export default{
    props: ['typeArr', 'size', 'name', 'target'],
    data(){
      return {
        client: '',
        fileSize: 5000000,
        imgUrl: window.url
      }
    },
    created() {

    },
    methods: {
      upload(event){
        var _this = this
        console.log(this.name,'得出的name');
        var name = this.name
        var file = event.target.files[0];                                         //得到文件
        var type = file.name.split('.')[1];
        var storeAs = this.name;
        if (this.size) {
          this.fileSize = this.size;
        }     //命名
        let data = {
          name: 'zhangsan'                                                        //传送id，请求密钥
        }
        console.log(this.target,'12312345646');
        console.log('1');


        this.$request(this.url.ali,'form',data).then((res)=>{
          console.log(res,'0000000000');
          var res = res.data
          this.$message({
            type: 'success',
            message: '数据提交成功!'
          });
          this.client = new OSS.Wrapper({
            accessKeyId: res.data.accessKeyId,
            accessKeySecret: res.data.accessKeySecret,
            stsToken: res.data.securityToken,
            endpoint: res.data.endpoint,
            bucket: res.data.bucket
          });                                                                     //得到密钥
          this.client.multipartUpload(storeAs, file).then(function (result) {
            // console.log(result,'成功555555555')                                             //至此就拿到了返回的路径
            var curUrl = result.res.requestUrls[0];
            var arrUrl = curUrl.split('?');
            const finalUrl = arrUrl[0];
            // this.picReceive = finalUrl
            // 处理闭包，通过window得到finalUrl
            //更新到dom
            _this.$emit('ToUrl',{finalUrl,name})
            var oDiv = document.getElementById(name)
            oDiv.style.background = 'url('+ finalUrl +') no-repeat center center'
            oDiv.style.backgroundSize = '100% auto'
            // oDiv.style.verticalAlign = 'middle'

          }).catch(function (err) {
            console.log(err);                                                     //没有上传到ali
          });
          // console.log(this.client);
        }).catch((err)=>{
          this.$message({
            type: 'info',
            message: '数据提交失败!'                                                 //没有请求到密钥
          });
          console.log(err);
        });
      }
    }
  }
</script>
