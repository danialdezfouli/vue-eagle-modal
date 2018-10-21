<template>
	<div :class="[['emodal',data.theme],{load,rtl:data.rtl}]" :style="{}" :dir="data.rtl ? 'rtl' : false">

        <header ref='header' class="default">
            <div class="title">{{ title }}</div>
            <div class="btns">
                <div class="btn-close" @click='$emit("close")' title="Close"><i class="flaticon-add"></i></div>
                <div></div>
                <div @click='$emit("reload")'><i class="flaticon-reload"></i></div>
            </div>
        </header>

        <div class="wrap" ref='wrap'>
        	<div class="loader"><div class="l">
        		<svg width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#000">
				    <g fill="none" fill-rule="evenodd" stroke-width="2">
				        <circle cx="22" cy="22" r="1">
				            <animate attributeName="r"
				                begin="0s" dur="1.8s"
				                values="1; 20"
				                calcMode="spline"
				                keyTimes="0; 1"
				                keySplines="0.165, 0.84, 0.44, 1"
				                repeatCount="indefinite" />
				            <animate attributeName="stroke-opacity"
				                begin="0s" dur="1.8s"
				                values="1; 0"
				                calcMode="spline"
				                keyTimes="0; 1"
				                keySplines="0.3, 0.61, 0.355, 1"
				                repeatCount="indefinite" />
				        </circle>
				        <circle cx="22" cy="22" r="1">
				            <animate attributeName="r"
				                begin="-0.9s" dur="1.8s"
				                values="1; 20"
				                calcMode="spline"
				                keyTimes="0; 1"
				                keySplines="0.165, 0.84, 0.44, 1"
				                repeatCount="indefinite" />
				            <animate attributeName="stroke-opacity"
				                begin="-0.9s" dur="1.8s"
				                values="1; 0"
				                calcMode="spline"
				                keyTimes="0; 1"
				                keySplines="0.3, 0.61, 0.355, 1"
				                repeatCount="indefinite" />
				        </circle>
				    </g>
				</svg>
        	</div></div>
            <div class="content" ref='content'>
                <!-- <p v-if='data.content'>{{ data.content }}</p> -->
                <FormBuilder v-if='data.items' :data="data.items" ref='form' @submited="$emit('submit')"></FormBuilder>
            </div>
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
	import FormBuilder from './FormBuilder';
	import Vue from 'vue';
	 
	export default{
		components: {FormBuilder},
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

			this.textSubmit = data.rtl ? 'ثبت' : 'Save'
			this.textCancel = data.rtl ? 'لغو' : 'Cancel'

			item.parent = this;
			this.$on('save',(e) => { // button
				this.$refs.form.$refs.submitBtn.click();
			});

			this.$on('submit',(e) => { // form
				if('beforeSave' in callbacks){
					if(!callbacks.beforeSave(this)) return;
				}
				item.run('save',this);
			});
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
			this.$on('reload',(data = {}) => {
				if('reload' in callbacks && callbacks.reload.length){
					return item.run('reload',this);
				}

				let {resolve,time = 250} = data;
				const {defaults} = item;
				item.load = true;
				setTimeout(() =>{
					item.data.items.forEach((i) => {
						if (i.name in defaults)
							i.value = defaults[i.name];
					});
					setTimeout(() => {
						if (resolve)
							resolve();
						else{}
						
						item.load = false;
					},time)
				},time / 10);
				// this.$modals.items = {...this.$modals.defaults};
			});
			if(this.use.scrollbar){
				let options = {
            		normalizeRTL:false
            	}
            	if(this.data.theme=='mojave'){
            		options.className = "os-theme-light";
            	}
            	this.scrollbar = OverlayScrollbars(this.$refs.wrap, options);
			}

			let keys = {};
            this.keyListener1 = ({keyCode})=>{
                keys[keyCode] = true;
                if(keys[17] && keys[13]){
                    this.$emit("save");
                }                
                if(keyCode === 27){
                	this.$emit("close");
                }
            }
            this.keyListener2 = ({keyCode})=>{
                delete keys[keyCode];
            }
			window.addEventListener('keydown',this.keyListener1);
            window.addEventListener('keyup',this.keyListener2);
		},
		methods:{
			submitHandle(){

			},
			closeHandle(){

			},
		},
        destroyed() {
            setTimeout(() => {
                if (this.scrollbar)
                    this.scrollbar.destroy();
            }, 1000)
            window.removeEventListener('keydown',this.keyListener1);
        	window.removeEventListener('keyup',this.keyListener2);
        }
	}
</script>

