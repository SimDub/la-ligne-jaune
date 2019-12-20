import Vue from 'vue'
import Router from 'vue-router'
import Test from '@/components/Test'
import Toilettes from '@/components/Toilettes'
import HereMap from '@/components/HereMap'
import Leaflet from '@/components/Leaflet'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Test',
      component: Test
    },
    {
      path: '/toilettes',
      name: 'Toilette',
      component: Toilettes
    },
    {
      path: '/heremap',
      name: 'heremap',
      component: HereMap
    },
    {
      path: '/leaflet',
      name: 'leaflet',
      component: Leaflet
    }
  ]
})
