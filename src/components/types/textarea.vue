<template>
	<div class="item-row">
		<label v-if='label' class="col label" :for='id'>{{ label }}</label>
		<div class="col-data">
			<textarea class="form-control" :id='id' v-bind="attr" v-model='val'></textarea>
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