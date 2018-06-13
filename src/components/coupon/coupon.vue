<template>
    <div class="coupon">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >

        <el-tab-pane label="餐厅列表" name="first">
          <el-row>
            <!--餐厅信息表模块-->
            <el-col :span="8">
              <template>
                <!-- <span>{{msg}}</span> -->
                <el-table
                  :data="couponDataTable"
                  style="width: 100%"
                  height="600"
                  :fit="true"
                  size="small"
                  :summary-method="getSummaries"
                  show-summary

                >
                  <el-table-column
                    sortable
                    fixed="left"
                    prop="name"
                    label="餐厅名"
                    width="150"
                  >
                  </el-table-column>
                  <el-table-column
                    sortable
                    width="90"
                    prop="status"
                    label="操作">
                    <template slot-scope="scope">
                      <el-button size="small" type="primary" plain @click="lookCouponMsg(scope.row.id)">查看</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-col>
            <el-col :span="14">
              <template>
                <el-table
                  :data="discountCoupon"
                  style="width: 100%;border: 2px solid #ccc;border-radius: 10px;margin-left: 10px"
                  height="600"
                  :fit="true"
                  size="small"
                  :summary-method="getSummaries"
                  show-summary
                >
                  <el-table-column
                    sortable
                    fixed="left"
                    prop="name"
                    label="卡券名称"
                    width="100"
                  >
                  </el-table-column>
                  <el-table-column
                    sortable
                    prop="price"
                    label="价格"
                    width="80"
                  >
                  </el-table-column>
                  <el-table-column
                    sortable
                    prop="type"
                    label="类型"
                    width="120">
                    <template slot-scope="scope">
                      <span v-if="scope.row.type === 'coupon'">优惠券</span>
                      <span v-if="scope.row.type === 'voucher'">代金券</span>
                      <span style="color: #409EFF" v-if="scope.row.type === 'platform-voucher'">平台代金券</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    sortable
                    prop="stock"
                    label="剩余数"
                    width="80">
                  </el-table-column>
                  <el-table-column
                    sortable
                    prop="publishNum"
                    label="发行数"
                    width="80">
                  </el-table-column>
                  <el-table-column
                    sortable
                    width="100"
                    prop="minimumCharge"
                    label="使用下限">
                  </el-table-column>
                  <el-table-column
                    sortable
                    width="100"
                    prop="minimumGiveCharge"
                    label="获得下限">
                  </el-table-column>
                  <el-table-column
                    sortable
                    width="100"
                    prop="canGetNum"
                    label="获得数量">
                  </el-table-column>
                  <el-table-column
                    sortable
                    width="150"
                    prop="description"
                    label="描述/介绍">
                  </el-table-column>
                  <el-table-column
                    sortable
                    width="100"
                    prop="validDay"
                    label="有效时段">
                    <template slot-scope="scope">
                      <span v-if="scope.row.validDay">{{scope.row.validDay}} 天</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    sortable
                    width="100"
                    prop="validTime"
                    label="有效日期">
                  </el-table-column>
                </el-table>
              </template>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <!--新增卡券弹框-->
      <el-dialog top="4vh" title="新增卡券" :visible.sync="showCouponDialog" ref="showCouponData">
        <el-form :model="couponForm" ref="confirmCouponData" :rules="rulesCouponData">
          <el-form-item label="选择" :label-width="formLabelWidth">
            <el-select v-model="couponForm.type" placeholder="请选择优惠券">
              <el-option label="优惠券2" value="male"></el-option>
              <el-option label="优惠券1" value="female"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数量" :label-width="formLabelWidth" prop="num">
            <el-input autofocus="true" v-model.number="couponForm.num" auto-complete="off" placeholder="请输入数量"></el-input>
          </el-form-item>
          <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
            <el-input autofocus="true" v-model.number="couponForm.price" auto-complete="off" placeholder="请输入数量"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" v-if="addOrEdit === 1">
          <el-button @click="showCouponDialog = false">取 消</el-button>
          <el-button type="primary" @click="confirmCouponEdit('confirmCouponData','showCouponData')">修改</el-button>
        </div>
        <div slot="footer" class="dialog-footer" v-if="addOrEdit === 2">
          <el-button @click="showCouponDialog = false">取 消</el-button>
          <el-button type="primary" @click="confirmCoupon('confirmCouponData','showCouponData')">确定添加</el-button>
        </div>
      </el-dialog>

      <!--添加卡券按钮-->
      <div class="bnt-group">
        <el-button-group>
          <el-button size="large" type="primary" icon="el-icon-plus" @click="addCouponPre">新增卡券</el-button>
        </el-button-group>
      </div>
    </div>
</template>

<script>
  export default {
    name: "coupon",
    data () {
      return{
        activeName: 'first',
        couponDataTable:[],
        discountCoupon:[],
        addOrEdit: 0,
        showCouponDialog:false,
        couponForm:{},
        formLabelWidth:'80px',
        rulesCouponData:{
          price: [
            {required: true, message:'请输入价格', trigger:'blur'},
          ],
          num: [
            {required: true, message:'请输入数量', trigger:'blur'},
          ],
        },
      }
    },
    created(){
      this._pullCoupon()
    },
    methods:{
      lookCouponMsg(id){
        console.log(id);
        let data = [
          {
            feild:'rid',
            value:id,
            joinType:'eq'
          }
        ]
        this.$request(this.url.discountCouponComplexPageQuery,'json',data).then((res)=>{
          this.discountCoupon = res.data.data
          console.log(res.data.data);
        })
      },
      _pullCoupon(){
        let data = [
          {
            feild:'',
            value:'',
            joinType:''
          }
        ]
        this.$request(this.url.couponComplexPageQuery,'json',data).then((res)=>{

          console.log(res);
          this.couponDataTable = res.data.data
        }).catch((err)=>{
          console.log(err);
        })
      },
      handleClick(row) {
        console.log(row);
      },
      addCouponPre(){
        this.addOrEdit = 2
        this.showCouponDialog = !this.showCouponDialog
      },
      confirmCoupon(){
        let data = this.couponForm
        this.$request(this.url.couponAdd,'json',data).then((res)=>{
          console.log(res);
          this._pullCoupon()
          this.showCouponDialog = !this.showCouponDialog
        }).catch((err)=>{
          console.log(err);
        })

      },
      deleteCoupon(row,index){
        this.$request(this.url.couponDelete,'json',{
          id:row.id
        }).then((res)=>{
          console.log(res);
          this.couponDataTable = res.data.data
        }).catch((err)=>{
          console.log(err);
        })
      },
      editCoupon(row,index){
        this.couponForm = row
        this.addOrEdit = 1
      },
      confirmCouponEdit(){
        let data = this.couponForm
        this.$request(this.url.couponUpdate,'json',data).then((res)=>{
          console.log(res);
          this._pullCoupon()
          this.showCouponDialog = !this.showCouponDialog
        }).catch((err)=>{
          console.log(err);
        })
      },
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        let num = 0
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总计';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (index === 1) {
            sums[index] = data.length + '条';
            return;
          }
          if (1 < index) {
            sums[index] = '';
            return;
          }
        });
        return sums;
      },
    }


  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

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
