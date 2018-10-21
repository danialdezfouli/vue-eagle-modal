<template>
	<div class="item-row">
		<div v-if='label' class="col label" :for='id'>{{ label }}</div>
		<div class="col-data flex">
			<div
				class="custom-control custom-radio flex1"
				v-for='(option,index) in item.options' 
				:key="index" >
			  <input type="radio" :id="id+option.value" class="custom-control-input" 
			  :value="option.value" v-model='item.value'>
			  <label v-if='option.text' class="custom-control-label" :for="id+option.value" >{{ option.text }}</label>
			</div>
		</div>
	</div>
</template>
<script>
  	import Parent from './Parent';
	export default {
		extends: Parent,
		mounted(){
			// console.log(this.item);
		}
	}
</script>