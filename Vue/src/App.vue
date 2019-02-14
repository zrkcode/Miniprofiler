<template>
  <div id="app">
    <MiniProfiler 
      :scriptSrc="scriptSrc"
      :dataPath="src"
      :cssSrc="cssSrc"/>
      <Dummy />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MiniProfiler from './components/MiniProfiler.vue';
import Dummy from './components/Dummy.vue';
import axios from 'axios';

@Component({
  components: {
    MiniProfiler,
    Dummy,
  },
})
export default class App extends Vue {
  private src: string = 'http://localhost:5000/mini-profiler-resources/';
  private scriptSrc: string = `${this.src}includes.min.js`;
  private cssSrc: string = `${this.src}includes.min.css`;
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
