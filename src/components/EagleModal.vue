<template><div></div></template>
<script>
	import Item from '../Item';
	export default{
		props: ['value'],
		data(){
			return {
				item: {},
			}
		},
		mounted(){
			this.item = new Item(this.value);
			this.$modals.add(this.item,true);
			
		},
		methods:{
			open(){
				return this.item.open();
			},
			close(){
				return this.item.close();
			},
			reload(){
				return this.item.reload();
			},
		},
		watch:{
			'value.items'(v){
				this.item.setItems(v);
			},
			'value.title'(v){
				this.item.data.title = v;
			},
			'value.theme'(v){
				this.item.data.theme = v;
			},
			'value.loadTitle'(v){
				this.item.data.loadTitle = v;
			},
		},
	}
</script>