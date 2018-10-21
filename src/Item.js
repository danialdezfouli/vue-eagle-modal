import Types from './components/types'
import Equals from './Equals'
import {uniqueId} from './Helpers'

function filterItem(i) {
	i.id = uniqueId('i');
	// if(i.type) 
	// 	i.type = 'eform-' + i.type;
	if(!('show' in i)) 
		i.show = true;

	i._type = i.type.toLowerCase();
	if (!(('eform-' + i.type) in Types)){
		for (let k in Equals){
			if (Equals[k].includes(i.type)){
				i._type = k;
				// t = 'eform-' + k;
				break;
			}
		}
	}
}
export default function (data = {}) {
	data = {
		loadTitle: data.rtl ? 'در حال بارگذاری ...' :'Loading ...',
		theme: 'osx',
		type: 'modal',
		...data
	}
	const callbacks = data.callbacks || {};
	if(data.callbacks) delete data.callbacks;
	data.use = data.use || {}
	// let use = {};
	for (let i in data.use){
		if(data.use[i].constructor.name == 'Object')
			data.use[i].name = "emodal-" + (data.use[i].name || i);
		// use['euse-'+i] = data.use[i];
	}
	// data.use = use;

	const obj = {
		id: uniqueId('modal'),
		data,
		callbacks,
		is_open: false,
		parent: false,
		defaults: {},
		load: false,
		init(){
			this.setItems(data.items);
		},
		// Bases
		open(callback){
			if (typeof callback == 'function'){
				this.onopen(callback);
			}
			if(this.is_open) return;
			this.is_open = true;
			setTimeout(() => {
				if(this.parent === false)
   					console.error(`[Vue Eagle Modal]: Parent Not found. ${this.data.title}`);
				else 
					this.parent.$emit('open');
			},0)
			return this;
		},
		close(){
			if(!this.is_open) return;
			this.is_open = false;
			setTimeout(() => {
				this.parent.$emit('close');
			},0)
			return this;
		},
		reload(time){
			return new Promise((resolve) => {
				setTimeout(() => {
					this.parent.$emit('reload',{resolve,time})
				},0)
			});
		},
		// Callbacks
		caller(k){
			console.log(k)
		},
		run(k){
			if(this.callbacks && this.callbacks[k] ){
				if(typeof this.callbacks[k] =='function'){
					this.callbacks[k](this);
				} else if(Array.isArray(this.callbacks[k])){
					this.callbacks[k].map((callback) => {
						callback(this);
					})
				}
			}
			
			return this;
		},
		addCallback(name,callback){
			if (!this.callbacks[name]){
				this.callbacks[name] = [];
			}
			this.callbacks[name].push(callback);
		},
		onopen(callback){
			return this.addCallback('open',callback);
		},
		onsave(callback){
			return this.addCallback('save',callback);
		},
		onclose(callback){
			return this.addCallback('close',callback);
		},
		onreload(callback){
			return this.addCallback('reload',callback);
		},

		// Get , Set

		title(title){
			this.data.title = title;
			return this;
		},
		set(key,value){
			this.data[key] = value;
			return this;
		},
		setItems(items){
			if (items) {
				items.forEach(i => {
					this.defaults[i.name] = i.value;
					return filterItem(i);
				})
			}
			else items = [];
			this.data.items = items;
			return this;
		},
		getItem(search,key='name'){
			if(this.data.items){
				return this.data.items.find(item => item[key] === search);
			}
			return false;
		},
		getItems(){
			return this.data.items;
		},
		setValue(search,value,key='name'){
			let finder = this.getItem(search,key);
			if(finder){
				finder.value = value;
			}
			return finder;			
		},
		// Visibility
		show(key){
			let finder = this.getItem(search,key);
			if(finder)
				finder.show = true;
			return finder;
		},
		hide(key){
			let finder = this.getItem(search,key);
			if(finder)
				finder.show = false;
			return finder;
		},
		toggle(key){
			let finder = this.getItem(search,key);
			if(finder)
				finder.show = !finder.show;
			return finder;
		},
		loading(){
			this.load = true;
			return this;
		},
		loaded(){
			this.load = false;
			return this;
		},
		// data
		formData(){
			let data = new FormData(this.parent.$refs.form.$el);
			for(let item of this.data.items){
				if(item.name !== undefined && data.get(item.name) === null){
					data.append(item.name,item.value)
				}
			}
			return data;
		}
	};
	obj.init();

	return obj;
}