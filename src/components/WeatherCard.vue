<template>
  <div  class="b-weather-backdrop"  :class="{_open:OpenCloseWeather}">
    <div  class="b-weather-card">
      <div class="b-weather-card__title-container title" >
        <div :key="item.id" v-for="item in PointWeather">
          <div class="b-weather-card__title title" @click="checkPoint(item.id)" :class="{_active:item.check}"> {{item.title}}</div>
        </div>
      </div>
      <div class="b-weather-card__data-container" v-if="DataWeather.timezone">
        <div class="b-weather-card__first-block">
          <div class="title b-weather-card__title">{{DateNow}}</div>
          <q-img :src="CurrentImg" class="b-weather-card__img"></q-img>
          <!-- <div class="b-weather-card__title"> {{DataWeather.current.weather[0].description}}</div> -->
          <div class="title b-weather-card__title"> {{Math.round(DataWeather.current.temp)}} &#176;С</div>
          <div class="title b-weather-card__title"> Ветер {{Math.round(DataWeather.current.wind_speed)}} м/с</div>
        </div>
        <div class="b-weather-card__second-block">
          <div class="title b-weather-card__title">Завтра</div>
            <q-img :src="CurrentImg" class="b-weather-card__img"></q-img>
            <!-- <div class="b-weather-card__title"> {{DataWeather.daily[1].weather[0].description}}</div> -->
            <div class="title b-weather-card__title"> от {{Math.round(DataWeather.daily[1].temp.min)}} &#176;С   до {{Math.round(DataWeather.daily[1].temp.max)}} &#176;С</div>
            <div class="title b-weather-card__title"> Ветер {{Math.round(DataWeather.daily[1].wind_speed)}} м/с</div>
            <!-- <div class="b-weather-card__title"> {{DataWeather.timezone}}</div> -->
          </div>
          <div class="b-weather-card__third-block">
          <div class="title b-weather-card__title">Послезавтра</div>
            <q-img :src="CurrentImg" class="b-weather-card__img"></q-img>
            <!-- <div class="b-weather-card__title"> {{DataWeather.daily[1].weather[0].description}}</div> -->
            <div class="title b-weather-card__title"> от {{Math.round(DataWeather.daily[2].temp.min)}} &#176;С  до {{Math.round(DataWeather.daily[2].temp.max)}} &#176;С</div>
            <div class="title b-weather-card__title"> Ветер {{Math.round(DataWeather.daily[2].wind_speed)}} м/с</div>
            <!-- <div class="b-weather-card__title"> {{DataWeather.timezone}}</div> -->
          </div>
         <loader v-if="loader" class="b-weather-card__loader"></loader>
      </div>
      <div class="array" @click="closeWeather"></div>

  </div>
 </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { DataWeather, PointWeather } from './models'
import Loader from './loader.vue'

class Props {
}

@Options({
  components: { Loader }
})

export default class WeatherCard extends Vue.with(Props) {
  point:Array<PointWeather> = []
  loader = false
  coords: Array<number> = []

  get DataWeather () : DataWeather {
    return this.$store.getters['weather/getDataWeather'] as DataWeather //eslint-disable-line
  }

  get PointWeather () : Array<PointWeather> {
    return this.$store.getters['weather/getPointWeather'] as Array<PointWeather> //eslint-disable-line
  }

  get OpenCloseWeather () : boolean {
    return this.$store.getters['weather/getOpenCloseWeather'] as boolean //eslint-disable-line
  }

  get DateNow () {
    const DateNow = new Date().toLocaleString('ru', {
      month: 'long',
      day: 'numeric'
    })
    return DateNow
  }

  get CurrentImg ():string {
    return 'http://openweathermap.org/img/wn/' + this.DataWeather.current.weather[0].icon + '@2x.png'
  }

  // get CurrentImgDaily ():string {
  //   return 'http://openweathermap.org/img/wn/' + this.DataWeather.daily[0].weather[0].icon + '@2x.png'//eslint-disable-line
  // }

  updatePointWeather (val: Array<PointWeather>) {
    this.$store.dispatch('weather/updatePointWeather',val) //eslint-disable-line
  }

  updateOpCloseWeather (val: boolean) {
    this.$store.dispatch('weather/updateOpenCloseWeather',val) //eslint-disable-line
  }

  async updateDataWeatherAxios (val: Array<number>) {
    await this.$store.dispatch('weather/updateDataWeatherAxios', val) //eslint-disable-line
  }

  async mounted () {
    this.point = JSON.parse(JSON.stringify(this.PointWeather))//eslint-disable-line
    this.loader = true
    this.point.forEach(el => {
      console.log('forEach3')
      if (el.check) {
        console.log('el', el)
        this.coords = []
        this.coords.push(el.lat, el.lon)
        el.check = true
      }
    })
    await this.updateDataWeatherAxios(this.coords)
    this.loader = false
  }

  closeWeather () {
    this.updateOpCloseWeather(false)
    document.body.style.overflow = 'auto'
  }

  async updateDataWether () {
    this.loader = true
    await this.updateDataWeatherAxios(this.coords)
    this.loader = false
    console.log(this.DataWeather)
  }

  checkPoint (id:number) {
    console.log(id)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.point = JSON.parse(JSON.stringify(this.PointWeather))
    this.point.forEach(el => {
      el.check = false
      if (el.id === id) {
        this.coords = []
        console.log(el)
        this.coords.push(el.lat, el.lon)
        el.check = true
      }
    })
    //   this.PointWeather.map(el => {
    // const nextEl = {
    //   check: false,
    //   lat2: el.lat,
    //   lon2: el.lon
    // }

    // return nextEl
    this.updatePointWeather(this.point)
    this.updateDataWether()//eslint-disable-line
  }
}
</script>
<style lang="scss" >
// @import url('../css/quasar.variables.scss');

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes blink {
  from {
  left: 200%;
  }
  to {
  left: -200%;
  }
}
.b-weather-backdrop{
  position: fixed;
  top: -100%;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: .4s top ease;
  &._open{
    top: 0
  }
}
.b-weather-card{
  padding: 40px;
  position: relative;
  display: sticky;
  background-color: rgba(0, 0, 0, 0.3);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  &__img{
    animation: pulse 1.6s ease infinite;
    min-width: 100px;
    min-height: 100px;
    max-width: 150px;
    max-height: 150px;

    margin: 20px 0 40px 0;
  }
  &__loader{
    position: absolute;
    background-color: rgba(0, 0, 0, 0.3);
  }
  &__first-block,&__second-block, &__third-block{
    width: 33.3%;
    display: flex;
    justify-content: normal;
    align-items: center;
    flex-direction: column;
  }
  &__second-block{
    position: relative;
    background-color: $bgWhite;
    // &::after {
    //   content: "";
    //   position: absolute;
    //   left: 200%;
    //   top: -50%;
    //   width: 200%;
    //   height: 250%;
    //   background: linear-gradient(180deg,rgba(56, 56, 56, 0.2) 0,#505050 20%,#3c3a3a 45%,#3c3a3a 55%,#505050 80%,rgba(74, 74, 74, 0.2) 100%);
    //   transform: matrix(.47,-.97,.77,.53,0,0);
    //   animation: blink 3s infinite ease-in-out;
    // }
  }

  &__data-container {
    min-height: 474px;
    display: flex;
    margin-top: 30px;
    position: relative;
    border-radius: 20px;
    background-color: #292929eb;
  }
  &__title-container{
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    border: 1px solid $txtWhite;
  }
  &__title{
    margin: 10px;
    padding: 20px;
    cursor: pointer;
    color: $txtWhite;
    border-radius: 10px;
    transition: background-color .3s ease, color .3s ease;
    &:hover{
       background-color: rgba(255, 255, 255, 0.5);
      color: black;
    }
    &._active{
      background-color: $txtWhite;
      color: black;
    }
  }
  &__text{
    margin: 20px 0;
    color: $txtWhite;
    font: 700 28px/28px "Comfortaa",sans-serif;
  }
  &__close{
    cursor: pointer;
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background:$txtWhite;
    top: -40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    right: -40px;
    transition: transform .5s ease;
    &::before{
      content: '';
      background-image: url('assets/icons/cancel.svg');
      background-size: cover;
      width: 20px;
      height: 20px;
    }
    &:hover{
      transform: rotate(180deg);
    }
  }
}
</style>
