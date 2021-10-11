<template>
      <div class="b-airline__title title" :class="{_full:fullInfo}">{{data.name}}</div>
      <img v-if="data.logo && !fullInfo" class="b-airline__img" :src="data.logo">
      <div class="b-airline__text-container"  v-if="fullInfo">
        <div class="b-airline__text">Логотип:</div>
        <img v-if="data.logo" class="b-airline__img" :class="{_full:fullInfo}"  :src="data.logo">
      </div>
      <div class="b-airline__text-container"  v-if="fullInfo">
        <div class="b-airline__text">Основана:</div>
        <div class="b-airline__text-answer">{{data.established}}</div>
      </div>
      <div class="b-airline__text-container"  v-if="fullInfo">
        <div class="b-airline__text">Слоган:</div>
        <div class="b-airline__text-answer">{{data.slogan}}</div>
      </div>
      <div class="b-airline__text-container"  v-if="fullInfo">
        <div class="b-airline__text">Сайт:</div>
        <div class="b-airline__text-answer">{{data.website}}</div>
      </div>
      <div class="b-airline__text-container"  v-if="fullInfo">
        <div class="b-airline__text">Местоположение:</div>
        <div class="b-airline__text-answer">{{data.country}}</div>
      </div>
      <div class="b-airline__text-container"  v-if="fullInfo">
        <div class="b-airline__text">Главный офис:</div>
        <div class="b-airline__text-answer">{{data.head_quaters}}</div>
      </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { AirCompanyList } from '../models'
import Loader from '../loader.vue'

class Props {
  readonly data!: AirCompanyList;
  readonly fullInfo!: boolean;
}

@Options({
  components: { Loader }
})

export default class FilterCard extends Vue.with(Props) {
  loader = false
  lookCount = 0
  openCard = false
  CompanyNames:Array<string> = []
  ActivCompany: Array<AirCompanyList> = []

  openBlock () {
    this.openCard = true
    console.log('openBlock')
  }
  // get CurrentImgDaily ():string {
  //   return 'http://openweathermap.org/img/wn/' + this.DataWeather.daily[0].weather[0].icon + '@2x.png'//eslint-disable-line
  // }
}
</script>
<style lang="scss" >
// @import url('../css/quasar.variables.scss');

.b-airline{
  &__title{
    color: $txtWhite;
    margin: 10px 0 35px 0;
    &._full{
      font-size: 40px;
      color: $txtDark;
    }
  }
  &__text-container{
    display: flex;
  }
  &__text{
    color: $txtBlack;
    min-width: 230px;
    font: 700 24px/24px "Comfortaa",sans-serif;
  }
   &__text-answer{
    color: $txtWhite;
    margin-left: 40px;
    font: 400 24px/24px "Comfortaa",sans-serif;
  }
  &__text-answer, &__text{
    margin-top: 30px;
    margin-bottom: 30px;
  }
  &__img{
    background-size: cover;
    max-height: 84px;
    background-position: 50% 50%;
    &._full{
      margin-left: 40px;
    }
  }
  &__img-title{
    &._full{
      display: flex;
    }
  }
}
</style>
