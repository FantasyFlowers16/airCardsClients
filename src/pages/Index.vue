<template>
  <q-page class="row items-center justify-evenly">
    <div class="b-weather" @click="openWether"></div>
    <div class="b-companies-img" @click="openCompanies"></div>
     <div class="b-filter-img" @click="openFilter"></div>
    <weather-card></weather-card>
    <airlines-card></airlines-card>
    <filter-card></filter-card>
    <air-pass
      title="Example title"
      active
    ></air-pass>
  </q-page>
</template>

<script lang="ts">
import AirPass from 'src/components/AirPass.vue'
import WeatherCard from 'src/components/WeatherCard.vue'
import FilterCard from 'src/components/FilterCard.vue'
import AirlinesCard from 'src/components/AirlinesCard.vue'
import { Vue, Options } from 'vue-class-component'
// import {  } from '../components/models'

@Options({
  components: { AirPass, WeatherCard, AirlinesCard, FilterCard }
})
export default class PageIndex extends Vue {
  coords:Array<number> = []

  updateOpCloseWeather (val: boolean) {
    this.$store.dispatch('weather/updateOpenCloseWeather',val) //eslint-disable-line
  }

  updateOpCloseCompanies (val: boolean) {
    this.$store.dispatch('air/updateOpenCloseCompanies',val) //eslint-disable-line
  }

  updateOpCloseFilter (val: boolean) {
    this.$store.dispatch('filter/updateOpenCloseFilter',val) //eslint-disable-line
  }

  openWether () {
    document.body.style.overflow = 'hidden'
    this.updateOpCloseWeather(true)
  }

  openCompanies () {
    document.body.style.overflow = 'hidden'
    this.updateOpCloseCompanies(true)
  }

  openFilter () {
    this.updateOpCloseFilter(true)
  }
}
</script>
<style lang="scss">

.showCardWeather-enter-active {
  animation: showCard 10.8s;
}
.showCardWeather-leave-active {
  animation: showCard 10.9s reverse;
}
@keyframes showCardWeather {
  0% {
    opacity: 0;
    margin-left: 100%;
  }
  100% {
    margin-left: 0%;
  }
}
.b-weather{
  position: sticky;
  width: 50px;
  height: 50px;
  cursor: pointer;
  left: 100%;
  margin-right: 10px;
  z-index: 10;
  border: 1px solid $imgBActive;
  border-radius: 10px;
  background: $imgActive;
  animation: weather 1.6s ease infinite;
  top: 60px;
  &::before{
    content: '';
    background-image: url('../assets/icons/hot.svg');
    width: 30px;
    height: 30px;
    position: absolute;
    top: 9px;
    left: 13px;
    background-size: cover;
  }
}
.b-companies-img{
  top: 50px;
  &::before{
    background-image: url('../assets/icons/company.svg')!important;
  }
}
.b-filter-img, .b-companies-img{
  position: sticky;
  width: 50px;
  height: 50px;
  cursor: pointer;
  border: 1px solid $imgBFilter;
  margin-right: 10px;
  z-index: 10;
  border-radius: 10px;
  background: $imgFilter;
  top: 60px;
  &::before{
    content: '';
    background-image: url('../assets/icons/filter.svg');
    min-width: 30px;
    min-height: 30px;
    padding: 3px;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0px;
    background-size: cover;
  }
}
@keyframes weather {
  0% {
    background-color: $imgActive;
  }
  50% {
    background-color: $imgNotActive;
  }
  100% {
    background-color: $imgActive;
  }
}
</style>
