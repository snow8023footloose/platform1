import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import Setting from '@/components/setting/setting'
import Xwfcustom from '@/components/xwfcustom/xwfcustom'
import upLoad from '@/components/upload/upload'
Vue.use(Router)
Vue.use(Resource)

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/manager/xwfs/setting',
      name:'Setting',
      component: Setting
    },
    {
      path:'/platform/xwfer/xwfcustom',
      name:'Xwfcustom',
      component: Xwfcustom
    },
    {
      path:'/up',
      name:'upLoad',
      component: upLoad
    }
  ]
})
