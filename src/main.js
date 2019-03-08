import DefaultLayout from '~/layouts/Default.vue'
import '../node_modules/bulma/css/bulma.min.css'
import '~/assets/styles.scss'
export default function (Vue) {
  Vue.component('Layout', DefaultLayout)
}
