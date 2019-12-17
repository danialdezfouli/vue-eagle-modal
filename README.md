# vue-eagle-modal

[Document](https://eagle-design.ir/vue-eagle-modal)
<br>
[Demos](https://eagle-design.ir/vue-eagle-modal/demo.html)

## Project setup
```
npm install vue-eagle-modal
```
Register Plugin
```
import {EagleModal} from 'vue-eagle-modal'
Vue.use(EagleModal);
```

### Usage
```
let m = this.$modals.add({
    title: 'Title',
    theme: 'osx', // || mojave
    items: [
    	{
    		label: 'Username',
    		name: 'username',
    		type: 'text',
    		value: 'Daniel',
    	},
    	{
    		label: 'Bio',
    		name: 'bio',
    		type: 'textarea',
    		value: 'web developer',
    	}
    ],
  });
  m.open();
  
  m.onsave( (m) => {
  	m.loading();
  	setTimeout(() => {
	  	console.log(m.formData())
	  	console.log(m.getItems())
  		m.loaded()
	},500)
  })

  m.onreload( () => {
  	console.log('Reloaded')
  })

```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```


> You can use this package in your projects : )
<br>

Design and Developed by Danial Dezfouli

`Email` [eagledesign.ir@gmail.com](mailto:eagledesign.ir@gmail.com)
