import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft, faBroadcastTower, faMountain } from '@fortawesome/free-solid-svg-icons'

library.add(faChevronLeft, faBroadcastTower, faMountain)

export default function (Vue) {
    Vue.component('font-awesome', FontAwesomeIcon)
}