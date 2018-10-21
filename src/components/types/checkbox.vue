<template>
	<div class="item-row">
		<div class="col label"></div>
		<div class="col-data">
			<div class="custom-control custom-checkbox">
			  <input type="checkbox" class="custom-control-input" v-model='val' :id='id'>
			  <label class="custom-control-label" :for='id'>{{ label }}</label>
			</div>
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