<template>
  <div id="app">
    
    <el-button :type="isPlay==='/'?'primary':''" @click="SwitchPages('/')" >累计确诊地图</el-button>
    <el-button :type="isPlay==='now'?'primary':''" @click="SwitchPages('now')" >现有确诊地图</el-button>
    <el-button :type="isPlay==='yesterday'?'primary':''" @click="SwitchPages('yesterday')" >昨日新增确诊地图</el-button>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return({
      isPlay:"/"
    })
     

  },
  created(){
    if(sessionStorage.getItem("isPlay")){
      this.isPlay=sessionStorage.getItem("isPlay")
    }
  },
  methods:{
    SwitchPages(name){
      this.$router.push(name)
      this.isPlay=name
      sessionStorage.setItem("isPlay",name)
    }
  }
}
</script>

<style>
#app {

}
</style>
