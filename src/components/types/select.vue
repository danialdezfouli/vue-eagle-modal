<template>
	<div class="item-row">
		<label v-if='label' class="col label" :for='id'>{{ label }}</label>
		<div class="col-data">
			<select v-model='val' class="custom-select">
				<option 
				v-for='(option,index) in item.options' 
				:key="index" 
				:value="option.value || option.text || option">{{ option.text || option }}</option>
			</select>
		</div>
	</div>
</template>
<script>
  	import Parent from './Parent';
	export default {
		extends: Parent,
		mounted(){
		}
	}
</script>