<template>
	<div class="item-row">
		<label v-if='label' class="col label" :for='id'>{{ label }}</label>
		<div class="col-data">
			{{ item.text }}
			<div v-if='item.html' v-html='item.html'></div>
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