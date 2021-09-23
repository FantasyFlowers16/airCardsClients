<template>
  <div  class="b-weather-backdrop"  :class="{_open:OpenCloseWeather}">
    <div  class="b-weather-card">
      <div class="b-weather-card__title-container" >
        <div :key="item.id" v-for="item in PointWeather">
          <div class="b-weather-card__title" @click="checkPoint(item.id)" :class="{_active:item.check}"> {{item.title}}</div>
        </div>
      </div>
      <div class="b-weather-card__data-container" v-if="DataWeather.timezone">
        <div class="b-weather-card__first-block">
          <div class="b-weather-card__title">{{DateNow}}</div>
          <q-img :src="CurrentImg" class="b-weather-card__img"></q-img>
          <!-- <div class="b-weather-card__title"> {{DataWeather.current.weather[0].description}}</div> -->
          <div class="b-weather-card__title"> {{DataWeather.current.temp}} ℃</div>
          <div class="b-weather-card__title"> Ветер {{DataWeather.current.wind_speed}} м/с</div>
        </div>
        <div class="b-weather-card__second-block">
          <div class="b-weather-card__title">Завтра</div>
            <q-img :src="CurrentImg" class="b-weather-card__img"></q-img>
            <!-- <div class="b-weather-card__title"> {{DataWeather.daily[1].weather[0].description}}</div> -->
            <div class="b-weather-card__title"> {{DataWeather.daily[1].temp.min}} ℃  - {{DataWeather.daily[1].temp.max}}</div>
            <div class="b-weather-card__title"> Ветер {{DataWeather.daily[1].wind_speed}} м/с</div>
            <!-- <div class="b-weather-card__title"> {{DataWeather.timezone}}</div> -->
          </div>
          <div class="b-weather-card__third-block">
          <div class="b-weather-card__title">Послезавтра</div>
            <q-img :src="CurrentImg" class="b-weather-card__img"></q-img>
            <!-- <div class="b-weather-card__title"> {{DataWeather.daily[1].weather[0].description}}</div> -->
            <div class="b-weather-card__title"> {{DataWeather.daily[2].temp.min}} ℃  - {{DataWeather.daily[2].temp.max}}</div>
            <div class="b-weather-card__title"> Ветер {{DataWeather.daily[2].wind_speed}} м/с</div>
            <!-- <div class="b-weather-card__title"> {{DataWeather.timezone}}</div> -->
          </div>
         <loader v-if="loader" class="b-weather-card__loader"></loader>
         <div class="b-weather-card__data-container-array" @click="closeWeather"></div>
      </div>

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
    return this.$store.getters['air/getDataWeather'] as DataWeather //eslint-disable-line
  }

  get PointWeather () : Array<PointWeather> {
    return this.$store.getters['air/getPointWeather'] as Array<PointWeather> //eslint-disable-line
  }

  get OpenCloseWeather () : boolean {
    return this.$store.getters['air/getOpenCloseWeather'] as boolean //eslint-disable-line
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
    this.$store.dispatch('air/updatePointWeather',val) //eslint-disable-line
  }

  updateOpCloseWeather (val: boolean) {
    this.$store.dispatch('air/updateOpenCloseWeather',val) //eslint-disable-line
  }

  async updateDataWeatherAxios (val: Array<number>) {
    await this.$store.dispatch('air/updateDataWeatherAxios', val) //eslint-disable-line
  }

  mounted () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  }

  closeWeather () {
    this.updateOpCloseWeather(false)
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
    this.point.map(el => {
      el.check = false
      if (el.id === id) {
        this.coords = []
        console.log(el)
        this.coords.push(el.lat, el.lon)
        el.check = true
      }
      return el
    })
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
  &__data-container-array{
    position: absolute;
    bottom: -30px ;
    width: 100px;
    left: calc(50% - 50px);
    height: 30px;
    background-color: #292929eb;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius:10px;
    cursor: pointer;
    transition: background .3s ease;
    &:hover{
      opacity: .3;
      background-color: $txtWhite;
      &:before{
        border-left: 1px solid black;
        border-bottom: 1px solid black;
      }
    }
    &:before{
      content:'';
      width: 10px;
      height: 10px;
      left: calc(50% - 5px);
      transform: rotate(-45deg);
      position: absolute;
      top: 8px;
      border-left: 1px solid $txtWhite;
      border-bottom: 1px solid $txtWhite;
      &:hover{
        border-left: 1px solid black;
        border-bottom: 1px solid black;
      }
    }
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
    border-radius: 10% ;
    transition: background-color .3s ease, color .3s ease;
    font: 700 28px/28px "Comfortaa",sans-serif;
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
