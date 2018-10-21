<template>
  <div id="app">
    <!-- <List></List> -->
    <button @click="add">Add</button>
  </div>
</template>

<script>
import footer from './Footer';
import scrollbar from 'overlayscrollbars';

export default {
  name: 'app',
  data(){
    return {
      show2: true,
    }
  },
  mounted(){
     // this.add();
     console.log(this.$modals)
      let a = this.$modals.alert({
        title: 'Alert Title',
        theme: 'osx',
        theme: 'mojave',
        text: 'the text',
      });
      a.open();
  },
  methods:{
    add(){
      let m = this.$modals.add({
        title: 'Edit User',
        theme: 'osx',
        items: [],
        use:{
          footer,
          scrollbar
        }
      });
      // m.onclose((m) => m.load = false);

      const getData = () => {
        m.loading();
        fetch('http://localhost/test/json.php').then(async (data) => {
          data = await data.json();
          m.loaded().setItems(data);
        });
      }
      m.open(getData);
      m.onreload(getData);
      
      m.onsave(async (m) => {
        m.loading();
        let response = await fetch('http://localhost/test/post.php',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
          },
          body: m.formData()
        });
        response = await response.json();      
        console.log(response)
        setTimeout(() => {
          m.loaded();
        },250)

      });
            
    }
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

</style>