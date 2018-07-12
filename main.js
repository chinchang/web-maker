/* eslint-disable sort-imports */
import Vue from 'vue'
import Vuex from 'vuex'

import { Version, SeqDiagram, Store } from 'vue-sequence'

import 'vue-sequence/dist/vue-sequence.css'

Vue.use(Vuex)
Vue.component('seq-diagram', SeqDiagram)

const store = new Vuex.Store({
  modules: {
    Store
  }
})

/* eslint-disable */
window.app = new Vue({
  el: '#demo',
  store
})

console.log('Use vue-sequence', Version)
