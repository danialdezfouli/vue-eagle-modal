import {uniqueId} from '../../Helpers'
export default{
	props: ['value','item'],
	data(){
		return{
			id: null,
			val: null,
			label: '',
			name: '',
			type: '',
			attr: '',
		};
	},
	watch:{
		val(val){
			this.$emit('input',val)
		},
		value(val){
			this.val = val;
		}
	},
	computed:{
		
	},
	mounted(){
		this.val = this.value;
		// this.id = uniqueId('item');
		for(let k in this.item){
			if (k in this){
				this[k] = this.item[k]
			}
		}
	}
}