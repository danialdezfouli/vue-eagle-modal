<template>
	<div class="item-row">
		<label v-if='label' class="col label" :for='id'>{{ label }}</label>
		<div class="col-data">
			<div class="custom-file">
			  <input type="file" class="custom-file-input" :id='id' ref='file' :name="name" @change='changeHandle' v-bind="attr">
			  <label class="custom-file-label" for="customFile"><div class="label-text">{{ fileLabel }}</div></label>
			  <div>{{ val }}</div>
			</div>
		</div>
	</div>
</template>
<script>
  	import Parent from './Parent';
	export default {
		extends: Parent,
		data(){
			return{
				names: false
			}
		},
		computed:{
			fileLabel(){
				return this.names || 'Choose file';
			}
		},
		methods:{
			changeHandle(e){
				let files = this.$refs.file && this.$refs.file.files;
				if(files && files.length){
					let names = [];
					for(let n = 0;n < files.length;n++){
						names.push(files[n].name);
					}
					this.names = names.join(' ,');
				} else 
					this.names = false;
			}
		},
		mounted(){
		}
	}
</script>