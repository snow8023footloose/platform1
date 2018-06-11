
<template>
    <div class="xwfcustom">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <!--餐厅信息表模块-->
        <el-tab-pane label="餐厅列表" name="first">
          <template>
            <!-- <span>{{msg}}</span> -->
            <el-table
              :data="restaurantDataTable"
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
                width="120"
              >
              </el-table-column>
              <el-table-column
                sortable
                prop="Tid"
                label="餐厅类型"
                width="100">
              </el-table-column>
              <el-table-column
                sortable
                width="80"
                prop="status"
                label="状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.status === 'disable'">不可用</span>
                  <span v-if="scope.row.status === 'enable'">可用</span>
                </template>
              </el-table-column>
              <el-table-column
                sortable
                width="120"
                prop="phone"
                label="电话号码">
              </el-table-column>
              <el-table-column
                sortable
                width="120"
                prop="backupPhone"
                label="备用电话号码">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="country"
                label="国别">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="province"
                label="省">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="city"
                label="市">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="area"
                label="区/县">
              </el-table-column>
              <el-table-column
                sortable
                width="150"
                prop="address"
                label="详细地址">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="pid"
                label="法人id">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="eid"
                label="业务员">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="eleId"
                label="饿了么">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="wifiName"
                label="Wifi名">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="wifiPassword"
                label="Wifi密码">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="brandName"
                label="品牌名称">
              </el-table-column>
              <el-table-column
                sortable
                width="150"
                prop="brandLogo"
                label="品牌logo">
                <template slot-scope="scope">
                    <img class="previewImg" :src="'https://order-online.oss-cn-shenzhen.aliyuncs.com' + scope.row.brandLogo" alt="点击查看原图">
                </template>
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="businessTime"
                label="营业时间">
              </el-table-column>
              <el-table-column
                sortable
                width="150"
                prop="businessPermitNum"
                label="营业执照号">
              </el-table-column>
              <el-table-column
                sortable
                width="150"
                prop="businessPermitImg"
                label="营业执照图">
                <template slot-scope="scope">
                  <img class="previewImg" :src="'https://order-online.oss-cn-shenzhen.aliyuncs.com' + scope.row.businessPermitImg" alt="点击查看原图">
                </template>
              </el-table-column>
              <el-table-column
                sortable
                width="150"
                prop="foodPermitNum"
                label="食品许可证号">
              </el-table-column>
              <el-table-column
                sortable
                width="150"
                prop="foodPermitImg"
                label="食品许可证图">
                <template slot-scope="scope">
                  <img class="previewImg" :src="'https://order-online.oss-cn-shenzhen.aliyuncs.com' + scope.row.foodPermitImg" alt="点击查看原图">
                </template>
              </el-table-column>
              <el-table-column
                sortable
                width="120"
                prop="logo"
                label="餐厅logo图">
                <template slot-scope="scope">
                  <img class="previewImg" :src="'https://order-online.oss-cn-shenzhen.aliyuncs.com' + scope.row.logo" alt="点击查看原图">
                </template>
              </el-table-column>
              <el-table-column
                sortable
                width="150"
                prop="Door_img"
                label="餐厅门头大图">
                <template slot-scope="scope">
                  <img class="previewImg" :src="'https://order-online.oss-cn-shenzhen.aliyuncs.com' + scope.row.doorImg" alt="点击查看原图">
                </template>
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="cashierDeskImg"
                label="收银台图">
                <template slot-scope="scope">
                  <img class="previewImg" :src="'https://order-online.oss-cn-shenzhen.aliyuncs.com' + scope.row.cashierDeskImg" alt="点击查看原图">
                </template>
              </el-table-column>
              <el-table-column
                sortable
                width="150"
                prop="sceneImgOne"
                label="店内场景图1">
                <template slot-scope="scope">
                  <img class="previewImg" :src="'https://order-online.oss-cn-shenzhen.aliyuncs.com' + scope.row.sceneImgOne" alt="点击查看原图">
                </template>
              </el-table-column>
              <el-table-column
                sortable
                width="150"
                prop="sceneImgTwo"
                label="店内场景图2">
                <template slot-scope="scope">
                  <img class="previewImg" :src="'https://order-online.oss-cn-shenzhen.aliyuncs.com' + scope.row.sceneImgTwo" alt="点击查看原图">
                </template>
              </el-table-column>
              <el-table-column
                sortable
                width="150"
                prop="sceneImgThree"
                label="店内场景图3">
                <template slot-scope="scope">
                  <img class="previewImg" :src="'https://order-online.oss-cn-shenzhen.aliyuncs.com' + scope.row.sceneImgThree" alt="点击查看原图">
                </template>
              </el-table-column>
              <el-table-column
                sortable
                width="500"
                prop="description"
                label="店铺介绍">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="remark"
                label="备注">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="longitude"
                label="店铺经度">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="latitude"
                label="店铺维度">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="creatTime"
                label="创建时间">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="upDate"
                label="修改时间">
              </el-table-column>
              <el-table-column
                sortable
                width="150"
                prop="expireTime"
                label="到期时间">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="expireDay"
                label="有效期">
              </el-table-column>
              <el-table-column
                sortable
                width="150"
                prop="serviceCharge"
                label="软件服务费">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="oid"
                label="操作者id">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="200">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="mini"
                    icon="el-icon-share"
                    round
                    @click="sendCoupon(scope.row,scope.$index)">
                    发放代金券
                  </el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    icon="el-icon-edit"
                    circle
                    @click="editRestaurant(scope.row,scope.$index); showFormMsg = true">
                  </el-button>
                  <el-button
                    type="danger"
                    size="mini"
                    icon="el-icon-delete"
                    circle
                    @click.native.prevent="deleteRestaurant(scope.row,scope.$index)">
                  </el-button>
                  <!--<el-button-group>-->
                    <!--<el-button size="mini" icon="el-icon-sort-up"></el-button>-->
                    <!--<el-button size="mini" icon="el-icon-sort-down"></el-button>-->
                  <!--</el-button-group>-->
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-tab-pane>
      </el-tabs>

      <!--发放优惠券弹框-->
      <el-dialog top="4vh" title="发放代金券" :visible.sync="showCouponDialog" ref="showCouponData">
        <el-form :model="couponForm" ref="confirmCouponData" :rules="rulesCouponData" :label-width="formLabelWidth">
          <el-form-item label="卡券名" >
            <el-input
              autofocus="true"
              v-model="couponForm.name"
              auto-complete="off"
              @keyup="onkeyup(e)"
              placeholder="请输入卡券名"></el-input>
          </el-form-item>
          <el-form-item label="折扣规则">
            <el-select
              style="display: inline-block;margin: 0px 2px"
              v-model="couponForm.tid"
              placeholder="请选择卡券类型">
              <el-option
                v-for="(item,index) in couponType"
                :key="index"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="价格" prop="price">
            <el-input autofocus="true" v-model.number="couponForm.price" auto-complete="off" placeholder="请输入数量"></el-input>
          </el-form-item>
          <el-form-item label="业务类型">
            <el-select
              style="display: inline-block;margin: 0px 2px"
              v-model="couponForm.buzType"
              placeholder="请选择业务类型">
              <el-option label="回头券" value="head-back"></el-option>
              <el-option label="新人券" value="new-give"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="限制类型">
            <el-select
              style="display: inline-block;margin: 0px 2px"
              v-model="couponForm.getLimitType"
              placeholder="请选择限制类型">
              <el-option label="启用" value="enable"></el-option>
              <el-option label="不启用" value="disable"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用下限">
            <el-input
              v-model.number="couponForm.minimumCharge"
              auto-complete="off"
              placeholder="请输入使用下限"></el-input>
          </el-form-item>
          <el-form-item label="获得下限">
            <el-input
              v-model.number="couponForm.minimumGiveCharge"
              auto-complete="off"
              placeholder="请输入获得下限"></el-input>
          </el-form-item>
          <el-form-item label="优惠金额">
            <el-input
              v-model.number="couponForm.discountAmount"
              auto-complete="off"
              placeholder="请输入优惠金额"></el-input>
          </el-form-item>
          <el-form-item label="发行数量">
            <el-input
              v-model.number="couponForm.publishNum"
              auto-complete="off"
              placeholder="请输入数量"></el-input>
          </el-form-item>
          <el-form-item label="获得数量">
            <el-input
              v-model.number="couponForm.canGetNum"
              auto-complete="off"
              placeholder="请输入次数"></el-input>
          </el-form-item>
          <el-form-item label="期限类型">
            <el-select
              style="display: inline-block;margin: 0px 2px"
              v-model="couponForm.validType"
              placeholder="选择使用期限类型">
              <el-option label="到期时间" value="time"></el-option>
              <el-option label="时间段" value="day"></el-option>
            </el-select>
            <el-input
              style="width: 220px;margin: 5px 0px"
              v-model="couponForm.validDay"
              placeholder="输入天"
              v-if="couponForm.validType === 'day'">
            </el-input>
            <el-date-picker
              style="width: 220px;margin: 5px 0px"
              v-model="couponForm.validTimeStr"
              type="date"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-if="couponForm.validType === 'time'"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="couponForm.description" auto-complete="off" placeholder="请输入描述"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select
              style="display: inline-block;margin: 0px 2px"
              v-model="couponForm.status"
              placeholder="请选择状态">
              <el-option label="可用" value="enable"></el-option>
              <el-option label="不可用" value="disable"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="总计">
            <el-input v-model="couponForm.publishNum*couponForm.price"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showCouponDialog = false">取 消</el-button>
          <el-button icon="el-icon-share" type="primary" @click="confirmCoupon('confirmCouponData','showCouponData')">确定发放</el-button>
        </div>
      </el-dialog>
      <!--餐厅信息弹框-->
      <el-dialog top="4vh" title="餐厅信息" :visible.sync="showFormMsg" ref="showRestaurantData">
        <el-form :model="restaurantData" ref="confirmRestaurantData" :rules="rulesRestaurantData">
          <el-form-item v-if="addNewPerson === 1" label="法人姓名" :label-width="formLabelWidth">
            <el-input autofocus="true" v-model="restaurantPerson.name" auto-complete="off" placeholder="请填写法人姓名"></el-input>
          </el-form-item>
          <el-form-item v-if="addNewRestaurant === 1" label="法人姓名" :label-width="formLabelWidth">
            <el-input v-model="restaurantPerson.name" auto-complete="off" placeholder="已注册用户，请完善法人姓名"></el-input>
          </el-form-item>
          <el-form-item v-if="addNewPerson === 1" label="性别" :label-width="formLabelWidth" prop="male" style="text-align: left">
            <el-select v-model="restaurantPerson.gender" placeholder="性别">
              <el-option label="男" value="male"></el-option>
              <el-option label="女" value="female"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="身份证" :label-width="formLabelWidth" prop="idcard">
            <el-input v-model:value="restaurantPerson.idcard" @change="confirmIdcard" auto-complete="off" placeholder="请填写法人身份证"></el-input>
          </el-form-item>
          <!--<el-form-item v-if="addNewPerson === 1" label="证件正面" :label-width="formLabelWidth">-->
            <!--<upload-->
              <!--v-on:ToUrl="legalPersonPicF"-->
              <!--:name="UID('/legalPerson/')"-->
              <!--:target="this.restaurantPerson.idcardFrontImg"></upload>-->
          <!--</el-form-item>-->
          <!--<el-form-item v-if="addNewPerson === 1" label="证件背面" :label-width="formLabelWidth">-->
            <!--<upload-->
              <!--v-on:ToUrl="legalPersonPicB"-->
              <!--:name="UID('/legalPerson/')"-->
              <!--:target="this.restaurantPerson.idcardBackImg"></upload>-->
          <!--</el-form-item>-->
          <el-form-item v-if="addNewPerson === 1" label="手机号" :label-width="formLabelWidth">
            <el-input v-model="restaurantPerson.phone" auto-complete="off" placeholder="请填写法人手机号"></el-input>
          </el-form-item>
          <span v-if="addNewRestaurant === 1">
          <el-form-item label="餐厅名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="restaurantData.name" auto-complete="off" placeholder="请填写餐厅名称"></el-input>
          </el-form-item>
          <el-form-item label="餐厅介绍" :label-width="formLabelWidth">
            <el-input v-model="restaurantData.description" auto-complete="off" placeholder="请填写简要餐厅介绍"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
            <el-input v-model="restaurantData.phone" auto-complete="off" placeholder="请填写餐厅常用电话"></el-input>
          </el-form-item>
          <el-form-item label="备用电话" :label-width="formLabelWidth" prop="backupPhone">
            <el-input v-model="restaurantData.backupPhone" auto-complete="off" placeholder="请填写餐厅固定电话"></el-input>
          </el-form-item>
          <el-form-item label="餐厅类型" :label-width="formLabelWidth" prop="tid" style="text-align: left">
            <el-select v-model.number="restaurantData.tid" placeholder="请选择餐厅类型">
              <el-option label="快餐店" value="1"></el-option>
              <el-option label="粉店" value="2"></el-option>
              <el-option label="餐馆" value="3"></el-option>
              <el-option label="早餐馆" value="4"></el-option>
              <el-option label="其他" value="5"></el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item label="餐厅状态" :label-width="formLabelWidth" prop="status" style="text-align: left">-->
            <!--<el-select v-model="restaurantData.status" placeholder="餐厅状态">-->
              <!--<el-option label="可用" value="enable"></el-option>-->
              <!--<el-option label="不可用" value="disable"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
          <el-form-item label="国家" :label-width="formLabelWidth">
            <el-input v-model="restaurantData.country" auto-complete="off" placeholder="请填写国家"></el-input>
          </el-form-item>
          <el-form-item label="省" :label-width="formLabelWidth">
            <el-input v-model="restaurantData.province" auto-complete="off" placeholder="请填写餐厅所在省"></el-input>
          </el-form-item>
          <el-form-item label="城市" :label-width="formLabelWidth">
            <el-input v-model="restaurantData.city" auto-complete="off" placeholder="请填写餐厅所在城市"></el-input>
          </el-form-item>
          <el-form-item label="县/区" :label-width="formLabelWidth">
            <el-input v-model="restaurantData.area" auto-complete="off" placeholder="请填写餐厅所在城市"></el-input>
          </el-form-item>
          <el-form-item label="详细地址" :label-width="formLabelWidth" prop="address">
            <el-input v-model="restaurantData.address" auto-complete="off" placeholder="请填写餐厅详细地址"></el-input>
          </el-form-item>

          <!--<el-form-item label="业务员" :label-width="formLabelWidth">-->
            <!--<el-input v-model.number="restaurantData.eid" auto-complete="off" placeholder="请填写业务员id"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="饿了么" :label-width="formLabelWidth">-->
            <!--<el-input v-model="restaurantData.eleId" auto-complete="off" placeholder="请填写饿了么id"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="Wifi名" :label-width="formLabelWidth">
            <el-input v-model="restaurantData.wifiName" auto-complete="off" placeholder="请填写Wifi名"></el-input>
          </el-form-item>
          <el-form-item label="Wifi密码" :label-width="formLabelWidth">
            <el-input v-model="restaurantData.wifiPassword" auto-complete="off" placeholder="请填写Wifi密码"></el-input>
          </el-form-item>
          <el-form-item label="品牌名称" :label-width="formLabelWidth">
            <el-input v-model="restaurantData.brandName" auto-complete="off" placeholder="请填写品牌名称"></el-input>
          </el-form-item>
          <el-form-item label="LOGO" :label-width="formLabelWidth">
            <upload
              v-on:ToUrl="listenUrl"
              :name="UID('/restaurant/')"
              :target="this.restaurantData.bannerLogo"></upload>
          </el-form-item>
          <el-form-item v-model="restaurantData.businessTime" label="时间段" :label-width="formLabelWidth">
            <el-time-picker
              style="width: 170px"
              v-model="startTime"
              :picker-options="{
                selectableRange: '00:00:00 - 23:59:59'
              }"
              :placeholder="startTimePre">
            </el-time-picker>
            <el-col class="line" style="text-align: center; display: inline-block; float: none" :span="2">-</el-col>
            <el-time-picker
              style="width: 170px"
              arrow-control
              v-model="endTime"
              @change="endTimeFun"
              :picker-options="{
                selectableRange: '00:00:00 - 23:59:59'
              }"
              :placeholder="endTimePre">
            </el-time-picker>
          </el-form-item>
          <el-form-item label="餐厅logo" :label-width="formLabelWidth">
            <upload
              v-on:ToUrl="listenUrlLogo"
              :name="UID('/restaurant/')"
              :target="this.restaurantData.logo"></upload>
          </el-form-item>
          <el-form-item label="执照号" :label-width="formLabelWidth" prop="businessPermitNum">
            <el-input v-model.number="restaurantData.businessPermitNum" auto-complete="off" placeholder="请填写餐厅执照号"></el-input>
          </el-form-item>
          <el-form-item label="执照图" :label-width="formLabelWidth">
            <upload
              v-on:ToUrl="listenUrl1"
              :name="UID('/restaurant/')"
              :target="this.restaurantData.businessPermitImg"></upload>
          </el-form-item>
          <el-form-item label="许可证号" :label-width="formLabelWidth" prop="foodPermitNum">
            <el-input v-model.number="restaurantData.foodPermitNum" auto-complete="off" placeholder="请填写食品许可证号"></el-input>
          </el-form-item>
          <el-form-item label="许可证图" :label-width="formLabelWidth">
            <upload
              v-on:ToUrl="listenUrl2"
              :name="UID('/restaurant/')"
              :target="this.restaurantData.foodPermitImg"></upload>
          </el-form-item>
          <el-form-item label="门头大图" :label-width="formLabelWidth">
            <upload
              v-on:ToUrl="listenUrlDoorImg"
              :name="UID('/restaurant/')"
              :target="this.restaurantData.doorImg"></upload>
          </el-form-item>
          <el-form-item label="收银台图" :label-width="formLabelWidth">
            <upload
              v-on:ToUrl="listenUrl3"
              :name="UID('/restaurant/')"
              :target="this.restaurantData.cashierDeskImg"></upload>
          </el-form-item>
          <el-form-item id="sencePic" label="场景图" :label-width="formLabelWidth">
            <upload
              v-on:ToUrl="listenUrl4"
              :name="UID('/restaurant/')"
              :target="this.restaurantData.sceneImgOne"></upload>
            <upload
              v-on:ToUrl="listenUrl5"
              :name="UID('/restaurant/')"
              :target="this.restaurantData.sceneImgTwo"></upload>
            <upload
              v-on:ToUrl="listenUrl6"
              :name="UID('/restaurant/')"
              :target="this.restaurantData.sceneImgThree"></upload>
          </el-form-item>
          <el-form-item label="服务费" :label-width="formLabelWidth">
            <el-input v-model.number="restaurantData.serviceCharge" auto-complete="off" placeholder="请填写软件服务费"></el-input>
          </el-form-item>
            <el-form-item label="经度" :label-width="formLabelWidth">
            <el-input v-model.number="restaurantData.longitude" auto-complete="off" placeholder="备注"></el-input>
          </el-form-item>
            <el-form-item label="纬度" :label-width="formLabelWidth">
            <el-input v-model.number="restaurantData.latitude" auto-complete="off" placeholder="备注"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="restaurantData.remark" auto-complete="off" placeholder="备注"></el-input>
          </el-form-item>
          </span>
        </el-form>
        <div slot="footer" class="dialog-footer" v-if="addNewPerson === 1">
          <el-button @click="showFormMsg = false" v-if="">取 消</el-button>
          <el-button type="primary" @click="addLegalPerson('confirmRestaurantData','showRestaurantData')">添加新法人</el-button>
        </div>
        <div slot="footer" class="dialog-footer" v-if="addOrEdit === 2">
          <el-button @click="showFormMsg = false">取 消</el-button>
          <el-button type="primary" @click="updateReataurant('confirmRestaurantData','showRestaurantData')">修改餐厅</el-button>
        </div>
        <div slot="footer" class="dialog-footer" v-if="addOrEdit === 1">
          <el-button @click="showFormMsg = false">取 消</el-button>
          <el-button type="primary" @click="addRestaurant('confirmRestaurantData','showRestaurantData')">保存餐厅</el-button>
        </div>
      </el-dialog>

      <!--添加餐厅按钮-->
      <div class="bnt-group">
        <el-button-group>
          <el-button size="large" type="primary" icon="el-icon-plus" @click="addRetaurantPre">新增餐厅</el-button>
        </el-button-group>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
  import upload from '@/components/upload/upload'


    export default {
      components:{
        upload
      },
      watch: {
        restaurantPerson:{
          handler:function(val,oldval){
            if(val.idcard.length === 18){
              let data1 = [
                {
                  feild:'idcard',
                  value: val.idcard,
                  joinType:'eq'
                }
              ]
              this.$request(this.url.legalPerson2,'json',data1).then((res)=>{
                let response = res.data.data
                if(response.length === 0){
                  this.addNewPerson = 1
                  this.addOrEdit = 0
                }else {
                  this.addNewRestaurant = 1
                  this.addOrEdit = 1
                  return
                }
              }).catch((err)=>{
                this.addNewPerson = 1

                this.addOrEdit = 0
              })
            }else{
                return
            }
          },
          deep:true//深度监听
        },
      },
      computed: {},
      data (){
        return{
          restaurantDatapid:0,
          couponType: [],
          picCollection: {
            brandLogo: 'restaurant/brandLogo/',
            businessPermitImg: 'restaurant/businessPermitImg/',
            foodPermitImg: 'restaurant/foodPermitImg/',
            logo: 'restaurant/logo/',
            doorImg: 'restaurant/doorImg/',
            cashierDeskImg: 'restaurant/cashierDeskImg/',
            sceneImgOne: 'restaurant/sceneImgOne/',
            sceneImgTwo: 'restaurant/sceneImgTwo/',
            sceneImgThree: 'restaurant/sceneImgThree/',
          },
          restaurantPerson:{
            name:'',
            idcard:'',
            phone:''
          },
          response:{},
          activeName: 'first',
          couponForm:{
            num:2,
            price:23
          },
          addOrEdit: 0,
          showForm: false,
          showFormMsg: false,
          showCouponDialog:false,
          showFormCeo: false,
          showFormBrief: false,
          showFormName: false,
          formLabelWidth: '80px',
          havePerson:false,
          startTime:'',
          endTime:'',
          eidForm: {},
          startTimePre:'',
          endTimePre:'',
          restaurantDataTable: [],
          addNewPerson: 0,
          addNewRestaurant:0,
          restaurantData: {
          },
          restaurantIndex: 0,
          options2: [{
            label: '江苏',
            cities: []
          }, {
            label: '浙江',
            cities: []
          }],
          props: {
            value: 'label',
            children: 'cities'
          },
          fileList: [{
            name: '1.jpg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }],
          rulesCouponData:{
            price: [
              {required: true, message:'请输入价格', trigger:'blur'},
            ],
            num: [
              {required: true, message:'请输入数量', trigger:'blur'},
            ],
          },
          rulesRestaurantData: {
            name: [
              {required: true, message:'请输入名', trigger:'blur'},
            ],
            name: [
              {required: true, message:'请输入身份证', trigger:'blur'},
            ],
            // tid: [
            //   {required: true, message:'请选择类型', trigger:'blur'},
            //   {type: 'number', required: true, message: '请输入数字', trigger: 'blur'}
            // ],
            // status: [
            //   {required: true, message:'请输入状态', trigger:'change'},
            // ],
            phone: [
              {required: true, message:'请输入电话号码', trigger:'blur'}
            ],
            // address: [
            //   {required: true, message:'请输入地址', trigger:'blur'},
            // ],
            // businessPermitNum: [
            //   {required: true, message:'请输入营业证号', trigger:'blur'},
            //   {type: 'number', required: true, message: '请输入数字', trigger: 'blur'}
            // ],
            // foodPermitNum: [
            //   {required: true, message:'请输入食品生产许可证', trigger:'blur'},
            //   {type: 'number', required: true, message: '请输入数字', trigger: 'blur'}
            // ],
          },
        }
      },
      created(){
        this._pullTable();
        this._pullCouponType()
      },
      methods: {
        _pullCouponType(){
          let data = [
            {
              feild:'status',
              value:'enable',
              joinType:'eq'
            }
          ]
          this.$request(this.url.couponType,'json',data).then((res)=>{
            this.couponType = res.data.data
            console.log(res.data.data,'1231324654');
          })
        },
        addRetaurantPre(){
          this.showFormMsg = true;
          this.addOrEdit = 0;
          this.addNewPerson = 0;
          this.restaurantPerson.idcard = ''
          this.addNewRestaurant = 0
          this.startTimePre = '请选择开始时间'
          this.endTimePre = '请选择结束时间'
        },
        endTimeFun(){
          this.restaurantData.businessTime = this.startTime.getHours()+
            ':'+this.startTime.getMinutes()+
            ':'+this.startTime.getSeconds()+
            '-'+this.endTime.getHours()+
            ':'+this.endTime.getMinutes()+
            ':'+this.endTime.getSeconds()
          console.log(this.restaurantData.businessTime);
        },
        UID(n){
          let name = n + this.getUID()
          // console.log(this.getUID(),'123456789ssssss');
          return name
        },

        listenUrl(data){
          this.restaurantData.brandLogo = data.name
        },
        listenUrl1(data){
          this.restaurantData.businessPermitImg = data.name
        },
        listenUrl2(data){
          this.restaurantData.foodPermitImg = data.name
        },
        listenUrl3(data){
          this.restaurantData.cashierDeskImg = data.name
        },
        listenUrl4(data){
          this.restaurantData.sceneImgOne = data.name
        },
        listenUrl5(data){
          this.restaurantData.sceneImgTwo = data.name
        },
        listenUrl6(data){
          this.restaurantData.sceneImgThree = data.name
        },
        listenUrlDoorImg(data){
          this.restaurantData.doorImg = data.name
        },
        listenUrlLogo(data){
          this.restaurantData.logo = data.name
        },
        legalPersonPicF(data){
          this.restaurantPerson.idcardFrontImg = data.name
        },
        legalPersonPicB(data){
          this.restaurantPerson.idcardBackImg = data.name
        },
        addLegalPerson(){
          let data2 = this.restaurantPerson
          // console.log(data2);
          this.$request(this.url.legalPerson1,'json',data2).then((res)=>{
            // console.log(res);
            this.addNewRestaurant = 1
            this.addNewPerson = 0
            this.addOrEdit = 1

          }).catch((err)=>{
            console.log(err);
          })
        },
        // 拉取列表
        _pullTable(){
          var Data =[
            {
              feild: 'time',
              value: '',
              joinType: 'time'
            }
          ]
          this.$request(this.url.restaurant2,'json',Data).then((res)=>{
            let response = res.data.data
            this.restaurantDataTable = response
            // console.log(response);
          }).catch((err)=>{
            console.log(err);
          })
        },
        //增加餐厅
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
        addRestaurant(formName1,formName2){
          let _this = this
          console.log(formName1);
          console.log(formName2);
          this.$refs[formName1].validate((valid) => {
            console.log(this.restaurantPerson.idcard)
            if (valid) {
              let data3 = [
                {
                  feild:'idcard',
                  value: this.restaurantPerson.idcard,
                  joinType:'eq'
                }
              ]

              this.$request(this.url.legalPerson2,'json',data3).then((res)=>{
                let response = res.data.data
                let data1 = _this.restaurantData
                console.log(data1,'最后提交的数据');
                _this.$request(_this.url.restaurant1,'json',_this.restaurantData).then((res)=>{

                  _this.restaurantDataTable.push(data1);
                  _this.showFormMsg = !_this.showFormMsg
                  _this.$message({
                    type: 'success',
                    message: '数据提交成功!'
                  });
                }).catch((err)=>{
                  console.log(err);
                })
                this.restaurantData.pid = response[0].id
                console.log(this.restaurantDatapid,'得到餐厅pid');
                //pid就是法人相关
              }).catch((err)=>{
                this.$message({
                  type: 'info',
                  message: '数据提交失败!'
                });
                console.log(err);
              })

            }else{
              this.$message.error(
                '信息不完整或者填写错误！!'
              );
              return false;
            }
          });
        },
        confirmIdcard(){
          console.log(this.restaurantPerson.idcard.length,'身份证长度',this.restaurantPerson.idcard,'身份证');
        },
        confirmCEO(){
          let data1 = [
            {
              feild:'idcard',
              value:this.restaurantPerson.idcard,
              joinType:'eq'
            }
          ]
          this.$request(this.url.legalPerson2,'json',data1).then((res)=>{
            console.log(res)
            let response = res.data.data
            this.restaurantPerson.id = res.data.data[0].id
            console.log(response);
            if(response.length >= 1){
              this.$message({
                type: 'success',
                message: '匹配到用户!'
              });
              this.havePerson = true
            }else {
              this.$request(this.url.legalPerson1,'json',this.restaurantPerson).then((res)=>{
                console.log(res,'添加新用户成功')
              }).catch((err)=>{
                console.log(err,'添加新用户失败')
              })
              this.$message({
                type: 'success',
                message: this.restaurantPerson.name +'先生，欢迎！新用户!'
              });
            }
            // this.restaurantPerson.phone = response[0].phone

          }).catch((err)=>{
            console.log(err,'添加餐厅丢出的错误');
            this.$message({
              type: 'info',
              message: '网络连接失败'
            });
          })

          // let data = this.restaurantPerson
          // console.log(data);
          // this.$request(this.url.legalPerson1,'json',data).then((res)=>{
          //   // let response = res.data.data
          //   console.log(res);
          // }).catch((err)=>{
          //   console.log(err);
          // })
        },
        //删除餐厅
        deleteRestaurant (row,index) {
          let data = {
            id:row.id
          }
          this.$confirm('是否删除该餐厅?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$request(this.url.restaurant3,'form',data).then((res)=>{
              this.$message({
                type: 'success',
                message: '数据提交成功!'
              });
              this.restaurantDataTable.splice(index,1)
            }).catch((err)=>{
              this.$message({
                type: 'info',
                message: '数据提交失败!'
              });
            })
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        sendCoupon(row,index){
          console.log(row, index);
          this.showCouponDialog = !this.showCouponDialog
          this.couponForm = {}
        },

        //修改餐厅
        editRestaurant (row,index) {
          this.restaurantData = Object.assign({},row);
          this.restaurantIndex = index;
          this.addNewRestaurant = 1
          this.addNewPerson = 0
          this.addOrEdit = 2;
          console.log('xiugai');
          console.log(this.addOrEdit);
          console.log(this.restaurantPerson);
          let data =[
            {
              feild: 'id',
              value: row.pid,
              joinType: 'eq'
            }
          ]
          this.$request(this.url.legalPerson2,'json',data).then((res)=>{
            this.restaurantPerson.idcard = res.data.data[0].idcard
            this.restaurantPerson.name = res.data.data[0].name
            this.addOrEdit = 2;
            console.log(this.addOrEdit);

          }).catch((err)=>{
            console.log(err);
          })

          if(row.businessTime){
            let start = row.businessTime.split('-')
            this.startTimePre = start[0]
            this.endTimePre = start[1]
          }
          this.addOrEdit = 2;
          // to  updateReataurant
        },
        updateReataurant(){
          // let row = this.restaurantData
          let updateObj = {
            id:this.restaurantData.id
          };
          for(let key in this.restaurantData){
            if(this.restaurantData[key] === this.restaurantDataTable[this.restaurantIndex][key]){
              continue;
            }
            updateObj[key] = this.restaurantData[key];
          }
          console.log(updateObj,'修改餐厅提交的数据');
          // let index = this.restaurantIndex
          this.$request(this.url.restaurant4,'json',updateObj).then((res)=>{
            this.$message({
              type: 'success',
              message: '数据提交成功!'
            });
            this.showFormMsg = !this.showFormMsg
            this._pullTable();
            // this.restaurantDataTable[this.restaurantIndex] = row
            // console.log(this.restaurantDataTable[this.restaurantIndex]);
          }).catch((err)=>{
            this.$message({
              type: 'info',
              message: '数据提交失败!'
            });
            console.log(err);
          })
        },


        handleClick(row) {
          console.log(row);
        },
        handleItemChange(val) {
          console.log('active item:', val);
          setTimeout(_ => {
            if (val.indexOf('江苏') > -1 && !this.options2[0].cities.length) {
              this.options2[0].cities = [{
                label: '南京'
              }];
            } else if (val.indexOf('浙江') > -1 && !this.options2[1].cities.length) {
              this.options2[1].cities = [{
                label: '杭州'
              }];
            }
          }, 300);
        },
      }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

  .previewImg
    height 40px
    width auto
    &:hover
      height 200px
      position absolute
      left -45%
      top -50%
      border-radius 5px
      border 2px solid white
      z-index 200

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

  .text
    font-size: 14px

  .item
    margin-bottom: 18px;


  .el-button
    margin 5px

  .clearfix:before, .clearfix:after
    display: table
    content: ""

  .clearfix:after
    clear: both

  .el-tab-pane
    display flex
    flex-wrap wrap
    .box-card
      width: 280px
      margin 15px
      &:hover
        border 1px solid #409EFF

  .el-upload__tip
    opacity 0.5

  .el-dialog
    margin-top 20px !important

  .el-upload
    margin 0 auto

  .el-table td, .el-table th
    padding 0px
    .el-button
      padding 6px !important
      margin 0px !important

  .el-button--mini, .el-button--mini.is-round
    padding 3px 8px

  #sencePic
    div
      display flex !important
</style>
