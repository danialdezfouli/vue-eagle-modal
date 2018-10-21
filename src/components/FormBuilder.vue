<template>
	<form action="" @submit.prevent='submitHandle' ref='form'>
		<component
    	v-for='item in data' 
    	v-if='item.show && haveType(item._type)' 
    	v-bind:key='item.id'
    	v-bind:is='"eform-" + item._type'
    	v-bind:item='item' 
    	v-model='item.value'
    	>
    	</component>
    	<input type="submit" ref="submitBtn" style="display:none;">
	</form>
</template>
<script>
	import Types from './types';
	import Vue from 'vue';

	export default {
		components: Types,
		props: ['data'],
		mounted(){
			this.$on('submit',() => {
				// this.submitHandle();
			})
		},
		methods:{
			getData(){
				let data = new FormData(this.$refs.form);
				return data;
			},
			submitHandle(e){
				this.$emit('submited')
			},
			haveType(type){
				let t = 'eform-' + type;
				if(t in Types)
					return true;
				console.error(`[Vue Eagle Modal]: Type "${type}" Not Found`);
			},
		}
	}
</script>