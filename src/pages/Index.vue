<template>
  <q-page class="row items-center justify-evenly">
    <div class="b-weather" @click="openWether"></div>
    <weather-card></weather-card>
    <air-companies
      title="Example component"
      active
    ></air-companies>
  </q-page>
</template>

<script lang="ts">
import AirCompanies from 'src/components/AirCompanies.vue'
import WeatherCard from 'src/components/WeatherCard.vue'
import { Vue, Options } from 'vue-class-component'
import { DataWeather, PointWeather } from '../components/models'

@Options({
  components: { AirCompanies, WeatherCard }
})
export default class PageIndex extends Vue {
  point:Array<PointWeather> = []
  coords:Array<number> = []

  async mounted () {
    console.log('DataWeather1', this.DataWeather)
    this.point = JSON.parse(JSON.stringify(this.PointWeather))//eslint-disable-line
    this.point.map(el => {
      if (el.check) {
        console.log('el', el)
        this.coords = []
        this.coords.push(el.lat, el.lon)
        el.check = true
      }
      return el
    })
    await this.updateDataWeatherAxios(this.coords)
    console.log('DataWeather2', this.DataWeather)
  }

  get PointWeather () : Array<PointWeather> {
    return this.$store.getters['air/getPointWeather'] as Array<PointWeather> //eslint-disable-line
  }

  get DataWeather () : DataWeather {
    return this.$store.getters['air/getDataWeather'] as DataWeather //eslint-disable-line
  }

  async updateDataWeatherAxios (val: Array<number>) {
    await this.$store.dispatch('air/updateDataWeatherAxios', val) //eslint-disable-line
  }

  updateOpCloseWeather (val: boolean) {
    this.$store.dispatch('air/updateOpenCloseWeather',val) //eslint-disable-line
  }

  openWether () {
    this.updateOpCloseWeather(true)
    console.log('wetherOpen')
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
