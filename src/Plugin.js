/*
	Copyright © 2018 Vue Eagle Modal, All rights reserved. eagle-design.ir
*/

import Modals from './components/List';
import ParentFile from './components/types/Parent';

Modals.install = (Vue, options) => {
  Vue.prototype.$modals = new (Vue.extend(Modals))({ 
    propsData: options 
  })
  Vue.modals = Vue.prototype.$modals
}

// Auto-install when vue is found (eg. in browser via <script> tag)
// import Vue from 'vue';
// Vue.use(Modals);

export const EagleModal = Modals;
export const Parent = ParentFile;
