<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container :class="{_scroll:OpenCloseWeather}">
      <router-view />
    </q-page-container>
  </q-layout>
  <loader v-if="loader"></loader>
</template>

<script lang="ts">

import { Vue, Options } from 'vue-class-component'
import Loader from '../components/loader.vue'

@Options({
  components: { Loader }
})
export default class MainLayout extends Vue {
  leftDrawerOpen = false;
  loader=true
  get OpenCloseWeather () : boolean {
    return this.$store.getters['air/getOpenCloseWeather'] as boolean //eslint-disable-line
  }

  async updatePassengersAxios (val: number) {
    await this.$store.dispatch('air/updatePassengersAxios', val) //eslint-disable-line
  }

  async mounted () {
    // this.$router.push({ query:{ page: '0', size: '10' }})//eslint-disable-line
    await this.updatePassengersAxios(0)
    this.loader = false
  }
}
</script>
<style lang="scss">
// @import url('../css/quasar.variables.scss');
.b-load{
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: $bgMain ;
  z-index: 10000;
}
.lds-ripple {
  display: inline-block;
  position: relative;
  width: 180px;
  height: 180px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 136px;
    left: 136px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 272px;
    height: 272px;
    opacity: 0;
  }
}

</style>
