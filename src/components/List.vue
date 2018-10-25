<template>
	<div>
		<transition name='fade' class='modal-list'>
	        <div class="modals" v-if='openItems.length > 0' ref='modals'>
	            <div class="bg" @dblclick='closeAll'></div>
	            
	            <div v-for='item in openItems' :key="item.id">
					<Modal v-if='item.data.type == "modal"' :item="item"></Modal>
					<Alert v-else-if='item.data.type == "alert"' :item="item"></Alert>
	            </div>
			</div>
		</transition>
	</div>
</template>
<script>
	import '../assets/style.scss';
	import Item from '../Item';
	import Modal from './Modal';
	import Alert from './Alert';
	import Types from './types';
	import Vue from 'vue';

	export default{
		components:{Modal,Alert},
		data(){
			return {
				items: [],
				// defaults: {},
			}
		},
		computed:{
			openItems(){
				return this.items.filter(i => i.is_open)
			}
		},
		mounted(){
			this.items = [];
			// Vue.prototype.$modals = this;
		  	// Vue.modals = Vue.prototype.$modals
		},
		methods:{
			closeAll(){
				this.items = [];
			},
			open(data){
				let item = this.add(data);
				item.open();
			},
			add(data,is_modal=false){
				if (!this.$parent) {
			    	this.$mount()
			        document.body.appendChild(this.$el)
		      	}
		      	if(is_modal){
		      		this.items.push(data);
		      	}

				let item = new Item(data);
				this.items.push(item);
				return item;
			},
			alert(data){
				data.type = 'alert';
				return this.add(data)
			},
			setComponent(type,value){
				Types['eform-' + type.toLowerCase()] = value;
			}
		}
	}
</script>