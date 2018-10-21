<template>
	<div :class="[['emodal alert',data.theme],{load,rtl:data.rtl}]" :style="{}" :dir="data.rtl ? 'rtl' : false">

        <header ref='header' class="default">
            <div class="title">{{ title }}</div>
            <div class="btns">
                <div class="btn-close" @click='$emit("close")' title="Close"><i></i></div>
            </div>
        </header>

        <div class="wrap" ref='wrap'>
            <div class="content" ref='content' v-html='data.text'></div>
        </div>
        <component
        v-if='use.footer'
        :is='use.footer'
        :item='item' 
        >        	
        </component>
        <footer v-else class="default">
            <button class="_btn save primary" @click='$emit("save")'>{{ textSubmit }}</button>
            <button class="_btn cancel light" @click='$emit("close")'>{{ textCancel }}</button>
        </footer>

    </div>
</template>
<script>
	import Vue from 'vue';
	 
	export default{
		props:['item'],
		data(){
			return {
				// title: ,
				textCancel: '',
				textSubmit: '',
			}
		},
		computed:{
			title(){
				if (this.load && this.data.loadTitle)
					return this.data.loadTitle;
				return this.data.title;
			},
			data(){
				return this.item.data;
			},
			load(){
				return this.item.load;
			},
			use(){
				return this.item.data.use;
			}
		},
		mounted(){
			const {item} = this;
			let {data} = this;
			const {callbacks} = item;
			
			this.textSubmit = data.rtl ? 'تایید' : 'Ok'
			this.textCancel = data.rtl ? 'لغو' : 'Cancel'

			item.parent = this;
		
			this.$on('open',() => {
				if('beforeOpen' in callbacks){
					if(!callbacks.beforeOpen(this)) return;
				}
				item.run('open',this);
			});
			this.$on('close',() => {
				if('beforeClose' in callbacks){
					if(!callbacks.beforeClose(this)) return;
				}
				item.close();
				item.run('close',this);
				
			});
			let keys = {};
            this.keyListener1 = ({keyCode})=>{
                if(keyCode === 27){
                	this.$emit("close");
                }
            }
			window.addEventListener('keydown',this.keyListener1);
		},
		methods:{
			submitHandle(){

			},
			closeHandle(){

			},
		},
        destroyed() {
            setTimeout(() => {
            }, 1000)
            window.removeEventListener('keydown',this.keyListener1);
        }
	}
</script>

