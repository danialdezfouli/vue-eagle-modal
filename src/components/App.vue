<template>
  <div id="app">
    <!-- <List></List> -->
    
  </div>
</template>

<script>
import footer from './Footer';
import scrollbar from 'overlayscrollbars';
import {eModal} from '../Plugin'

export default {
  components: {eModal},
  name: 'app',
  data(){
    return {
    }
  },
  mounted(){
    // this.$refs.modal.open();
    // this.modal.items[0].value = new Date;

     // this.add();

  },
  methods:{
    
  }
}
</script>

<style lang='scss'>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.btn{
  padding: .75rem 1.5rem;
  margin: 0 3px;
  border: none;
  font-size: 18px;
  border-radius: 100px;
  color: #fff;
  background: #ad5beb;
  outline: none;
  transition: .2s;
  cursor: pointer;
  &:hover{
    box-shadow: 0 10px 20px rgba(62,69,78,.15);
    color: #ad5beb;
    background: #fff;    
  }
}
.btn2{
  background: #007bff;
  &:hover{
    color: #007bff;
  }
}

</style>
