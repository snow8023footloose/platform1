<template>
  <div id="app">

    <div class="login" v-show="loginShow">
      <img class="loginPic" src="./logo.png" alt="">
      <el-form
        label-width="100px"
        :label-position="labelPosition"
        class="demo-ruleForm loginIn"
        @keydown="keyEvent($event)"
        :model="ruleForm2"
        status-icon
        :rules="rules2"
        ref="ruleForm2">
          <el-form-item label="账号" prop="username">
            <el-input
              autofocus="true"
              v-model="ruleForm2.username"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="ruleForm2.password"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item v-if="manager === true">
            <el-button type="primary" @click="submitFormManager('ruleForm2')">登录</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
            <el-button type="text" @click="clearLocalStorage">清除</el-button>
          </el-form-item>
          <el-form-item v-if="manager === false">
            <el-button type="primary" @click="submitFormManager('ruleForm2')">登录</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
            <el-button type="text" @click="clearLocalStorage">清除</el-button>
          </el-form-item>
      </el-form>
    </div>
    <el-row
      v-show="loginstate"
      class="main-content"
      id="main-content"
      ref="main-content"
      v-loading.fullscreen.lock="fullscreenLoading"
    >
      <i style="color: #ff525b" class="el-icon-circle-close person-close" @click="loginOut"></i>


      <el-col :span="5" v-show="owner">
        <img src="./logo.png" alt="">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">

          <router-link :to="{path:'/platform/xwfer/xwfcustom'}" class="vlink">
            <el-menu-item index="1">
              <i class="el-icon-tickets"></i>
              <span slot="title" class="title">我的客户</span>
            </el-menu-item>
          </router-link>
          <router-link :to="{path:'/platform/xwfer/coupon'}" class="vlink">
            <el-menu-item index="2">
              <i class="el-icon-star-off"></i>
              <span slot="title" class="title">公司卡券</span>
            </el-menu-item>
          </router-link>
          <!--<router-link :to="{path:'/platform/xwfer/xwffunction'}" class="vlink">-->
            <!--<el-menu-item index="3">-->
              <!--<i class="el-icon-setting"></i>-->
              <!--<span slot="title" class="title">系统功能</span>-->
            <!--</el-menu-item>-->
          <!--</router-link>-->

        </el-menu>
      </el-col>
      <el-col :span="19" >
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>
<script>

export default {
  name: 'App',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'));
      } else {
        if (this.ruleForm2.password !== '') {
          this.$refs.ruleForm2.validateField('password');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {

      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value !== this.ruleForm2.username) {
        callback(new Error('密码不对'));
      } else {
        callback();
      }
    };
    return {
      value4: true,
      mydata:{},
      fullscreenLoading: false,
      value5:100,

      loginstate: false,
      loginShow: true,
      owner: false,
      manager: false,
      labelPosition: 'top',
      show2: true,
      footer: '新沃丰网络科技',
      ruleForm2: {
        username: '',
        password: '',
      },
      rules2: {
        username: [
          { validator: validatePass, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    submitFormManager(formName) {
      if(this.manager === true){
        this.owner = false
      }else{
        this.owner = true
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            username:this.ruleForm2.username,
            password:this.ruleForm2.password
          }
          this.$request(this.url.loginEmploy,'form',data).then((res)=>{
            console.log(res.data,'这是登录返回的信息');

            if(res.data.msg === 'username is not exist'){
              this.$message({
                duration: 1000,
                type: 'info',
                message: '用户名不存在'
              });
            }else if(res.data.msg === 'success'){

              this.loginstate = true
              this.loginShow = false
              this.$message({
                duration: 1000,
                type: 'success',
                message: '欢迎登录新沃丰系统'
              });
              this.$router.push({path:'/platform/xwfer/xwfcustom'})
            }else if(res.data.msg === "username is not exist or password is incorrect"){
              this.$message({
                duration: 1000,
                type: 'info',
                message: '用户不存在或者密码不正确'
              });
            }
          }).catch((err)=>{
            console.log(err);
          })
        } else {
          console.log('提交失败');
          return false;
        }
      });
    },
    clearLocalStorage(){
      localStorage.clear()
    },
    loginOut(){
      this.$confirm('即将退出系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loginstate = false
        this.loginShow = true
        this.$message({
          duration: 1500,
          type: 'success',
          message: '退出成功，感谢您的使用！'
        });

      }).catch(() => {
        this.$message({
          duration: 1500,
          type: 'info',
          message: '已取消'
        });
      });

    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    Height() {
      let mainHeigh = document.querySelector("#main-content")
      let appHeigh = document.querySelector("html").clientHeight;
      mainHeigh.style.top =(appHeigh/mainHeigh.clientHeight) + "%"

    },
    open11() {
      this.$notify({
        title: '滑动查看更多内容',
        message: '',
        offset: 100,
        duration: 2000
      });
    },

    //设置cookie

  },
  created() {
    this.ruleForm2.username = 17375636967
    this.ruleForm2.password = 17375636967
  },
  mounted() {
    this.Height();
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
body
  overflow hidden

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  width: 100%
  height: 100%
  overflow hidden
  background url("bg-scene.png")
  background-size 100%
  .main-content
    position relative
    height auto
    .el-col
      .el-menu
        .vlink
          text-decoration: none
          font-size: 2em
          color:black
          .el-menu-item
            padding-bottom 10px
            font-size:2em
            .title
              font-size 0.3em
        .router-link-exact-active
          .el-menu-item
            .title
              font-size 0.35em
      >img
        width 48%
        height auto
        margin 1em
  .login
    margin-top: 200px

.el-form-item__label
  float left !important
.loginPic
  display block
  width 135px
  margin 40px auto 10px
.loginIn
  margin 20px auto 40px
  width 250px

li
  list-style none

.person-close
  position absolute
  font-size 33px
  .transition-box
    margin-bottom: 10px
    width: 10.5em !important
    height: 7em !important
    border-radius: 4px
    text-align: center
    color: #fff
    padding: 10px 5px
    box-sizing: border-box
    margin-right: 20px
    font-size 12px
    p,span
      margin 2px 0
      font-size 10px
  top 18px
  right 47px
  z-index 3

td
  padding 5px 0px !important

.person-close1
  right 156px !important
  top -34px !important

.el-menu-item [class^=el-icon-]
  margin-right -5px

.cell
  text-align left

.finance,.goods,.setting,.coupon,.member,.order,.person,.purchase,.setting,.table,.test,.xwffunction,.xwfer,.xwfcustom
  margin:0 3% 0
  height:96%

.el-tabs__nav
  margin-left 10%

.el-tabs__content
  height 720px !important
  padding-right 15px

.el-select
  display block

.el-table--fit
  height 600px

.el-tabs__item
  font-size 19px

.el-tabs__nav-scroll
  margin-top 20px

.el-tab-pane[data-v-60204f04]
  width 50%


@media screen and (max-width: 1400px)
  .el-col
    .el-tabs__content
      height 530px
      padding 15px
      background white
      border-radius 10px
      box-shadow 1px 1px 25px rgba(0, 0, 0, 0.28)


@media screen and (max-width: 1200px)
  .el-table--fit
    height 510px !important

  .setting,.tables,.xwfcustom,.xwfer,.xwffunction,.coupon,.member
    >.el-tabs
      .el-tabs__content
        height 530px !important
        overflow-y scroll

  .login
    margin-top: 100px !important

  .table-container
    height: 20em


@media screen and (max-width: 900px)
  th
    padding 0px !important

  .filter
    display none

  .el-table--fit
    height 500px !important

  .setting,.tables,.xwfcustom,.xwfer,.xwffunction
    >.el-tabs
      .el-tabs__content
        height 500px !important
        overflow-y scroll

  .transition-box
    margin-bottom: 10px
    width: 12.5em !important
    height: 7em !important
    border-radius: 4px
    text-align: center
    box-sizing: border-box
    margin-right: 20px
    font-size 12px
    .box-header
      height 23% !important
    p,span
      margin 2px 0
      font-size 10px !important





  .el-tabs__item
    font-size 14px

  .el-tabs__nav-scroll
    margin-top 0px

  .el-tab-pane[data-v-60204f04]
    width 100%

  .person-close
    position absolute
    font-size 20px
    color #f6606f
    top 11px
    right 22px
    z-index 3

  .person-close1
    right 74px !important
    top 8px !important

  .login
    margin-top: 0px !important

  .goodse
    top: 15px !important
    left: 34px !important

  .tableButtonGroup1
    left: 34px !important
    bottom: 10px !important


@media screen and (max-width: 825px)
  .el-table--fit
    height 250px !important

  .setting,.tables,.xwfcustom,.xwfer,.xwffunction
    >.el-tabs
      .el-tabs__content
        height 250px !important
        overflow-y scroll



  .el-table td, .el-table th
    padding 5px !important

  .transition-box
    margin-bottom: 10px
    width: 12.5em !important
    height: 7em !important
    border-radius: 4px
    text-align: center
    box-sizing: border-box
    margin-right: 20px
    font-size 12px !important
    .box-header
      height 23% !important
    p,span
      margin 2px 0
      font-size 10px !important

  .goodse
    top: 15px !important
    left: 34px !important

  .tableButtonGroup1
    left: 34px !important
    bottom: 10px !important
@media screen and (max-width: 737px)
  .el-table--fit
    height 280px !important

  .setting,.tables,.xwfcustom,.xwfer,.xwffunction
    >.el-tabs
      .el-tabs__content
        height 280px !important
        overflow-y scroll

  .goodse
    top: 0px !important
    left: 0px !important

  .tableButtonGroup[data-v-19dca008]
    top 10px !important

  .tableButtonGroup1
    button[data-v-19dca008]
      margin-left: 2px !important
      position: fixed !important
      right: 280px !important
      bottom: 2px !important

  .singleContainer[data-v-19dca008]
    height auto

  .tables
    .tableButtonGroup1[data-v-19dca008]
      height auto !important

  .tableButtonGroup1
    left: 34px !important
    bottom: 2px !important

  .transition-box
    margin-bottom: 10px
    width: 12.5em !important
    height: 7em !important
    border-radius: 4px
    text-align: center
    box-sizing: border-box
    margin-right: 20px
    font-size 12px !important
    .box-header
      height 23% !important
    p,span
      margin 2px 0
      font-size 10px !important


  .title
    font-size 0.256em !important


@media screen and (max-width: 668px)
  .el-table--fit
    height 250px !important

  .setting,.tables,.xwfcustom,.xwfer,.xwffunction
    >.el-tabs
      .el-tabs__content
        height 250px !important
        overflow-y scroll


  .transition-box
    margin-bottom: 10px
    width: 10.5em !important
    height: 7em !important
    border-radius: 4px
    text-align: center
    color #f6606f
    box-sizing: border-box
    margin-right: 20px
    font-size 12px
    .box-header
      height 23% !important
    p,span
      margin 2px 0
      font-size 10px


  .el-menu-item [class^=el-icon-]
    margin-right -12px


  .el-table th>.cell
    text-align center !important

  .el-button.is-circle
    padding 7px

  .el-button-group
    &:first-child
      margin 0px auto !important

  .bnt-group
    width 100%
    position fixed
    bottom 2%
    z-index 15
    .el-button-group
      margin-bottom 3% !important
      margin-left 58% !important
    .block,.small-block
      width 73%


</style>
