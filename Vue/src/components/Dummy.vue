<template>
    <button type="button" @click="getProfiler">Click Me!</button> 
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class Dummy extends Vue {
    private getProfiler() {
        axios.get('http://localhost:5000/api/values');
    }
}
</script>