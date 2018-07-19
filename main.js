/* eslint-disable sort-imports */
import Vue from 'vue'
import Vuex from 'vuex'

import { Version, SeqDiagram, Store } from 'vue-sequence'
import 'vue-sequence/dist/vue-sequence.css'

import domtoimage from 'dom-to-image'
import saveAs from 'file-saver'

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

window.domtoimage = domtoimage
window.saveAs = saveAs.saveAs

function downloadPng() {
	var node = document.getElementById('diagram')
	domtoimage.toBlob(document.getElementById('diagram'))
		.then(function (blob) {
			window.saveAs(blob, 'zenuml.png');
		});
}
window.downloadPng = downloadPng
console.log('Using vue-sequence', Version)

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('btnDownloadPng').addEventListener('click', downloadPng);
});
