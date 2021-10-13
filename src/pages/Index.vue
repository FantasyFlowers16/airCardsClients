<template>
  <q-page class="row items-center justify-evenly">
    <div class="b-widget-container">
      <div class="b-widget__item b-widget__item--weather" @click="openWether"></div>
      <div class="b-widget__item b-widget__item--companies"  @click="openCompanies"></div>
      <div class="b-widget__item b-widget__item--filter" @click="openFilter"></div>
    </div>
    <air-pass
      title="Passangers"
      active
    ></air-pass>
    <weather-card></weather-card>
    <filter-card></filter-card>
    <airlines-card></airlines-card>
  </q-page>
</template>

<script lang="ts">
import AirPass from 'src/components/Passangers/AirPassangersList.vue'
import WeatherCard from 'src/components/Weather/WeatherCard.vue'
import FilterCard from 'src/components/Filter/FilterCard.vue'
import AirlinesCard from 'src/components/Companies/AirlinesCard.vue'
import { Vue, Options } from 'vue-class-component'

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
    console.log('openWeather')
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

.b-companies-img{
  top: 50px;
  &::before{
    background-image: url('../assets/icons/company.svg')!important;
  }
}
.b-widget{
  &-container{
    width: 100%;
    height: 50%;
    top:0;
    z-index: 10;
    position: sticky;
    display: flex;
    margin-bottom: 20px;
  }
  &__item{
    position: relative;
    width: calc(33.3% - 9px);
    margin-left: 6px;
    height: 130px;
    cursor: pointer;
    z-index: 10;
    border-radius: 10px;
    &::before{
      content: '';
      background-image: url('../assets/icons/hot.svg');
      width: 30px;
      height: 30px;
      position: absolute;
      top: calc(50% - 15px);
      left: calc(50% - 15px);
      background-size: cover;
    }
    &--weather{
      border: 1px solid $brdGreen;
      border-radius: 10px;
      background: $bgGreen;
      opacity: 0.9;
      transition: opacity .3s ease;
      // animation: weather 1.6s ease infinite;
      &::before{
        content: '';
        background-image: url('../assets/icons/hot.svg');
        width: 40px;
        height: 40px;
        position: absolute;
        background-size: cover;
      }
      &:hover{
        opacity: 1;
      }
    }
    &--filter{
      border: 1px solid $brdBlue;
      background: $bgBlue;
      opacity: 0.9;
      transition: opacity .3s ease;
      &::before{
        content: '';
        width: 40px;
        height: 40px;
        background-image: url('../assets/icons/filter.svg');
      }
      &:hover{
        opacity: 1;
      }
    }
    &--companies{
      border: 1px solid $brdYellow;
      background: $bgYellow;
      transition: opacity .3s ease;
      opacity: 0.9;
      &::before{
        content: '';
        width: 40px;
        height: 40px;
        background-image: url('../assets/icons/company.svg')!important;
      }
      &:hover{
        opacity: 1;
      }
    }
  }
}
// .b-weather{
//   position: relative;
//   width: 50px;
//   height: 50px;
//   cursor: pointer;
//   left: 100%;
//   margin-right: 10px;
//   z-index: 10;
//   border: 1px solid $imgBActive;
//   border-radius: 10px;
//   background: $imgActive;
//   animation: weather 1.6s ease infinite;
//   top: 60px;
//   &::before{
//     content: '';
//     background-image: url('../assets/icons/hot.svg');
//     width: 30px;
//     height: 30px;
//     position: absolute;
//     top: 9px;
//     left: 13px;
//     background-size: cover;
//   }
// }
.b-filter-img, .b-companies-img{
  position: relative;
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
