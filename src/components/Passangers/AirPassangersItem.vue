<template>
  <div>
    <div class="b-pass__item">
      <div class="b-pass__user-block ">
        <div class="b-pass__user-img-container">
          <img class="b-pass__user-img" src="../../assets/icons/user.svg">
        </div>
        <div class="b-pass__info-block">
          <div class="b-pass__text">{{data.name}}</div>
        </div>
      </div>
      <div class="b-pass__data-container">
        <div class="b-pass__info-block">
          <div class="b-pass__title">Название компании: </div>
          <div class="b-pass__text">{{data.airline[0].name}}</div>
        </div>
        <div class="b-pass__info-block">
          <div class="b-pass__title">Страна:</div>
          <div class="b-pass__text">{{data.airline[0].country}}</div>
        </div>
        <div class="b-pass__info-block">
          <div class="b-pass__title">Слоган:</div>
          <div class="b-pass__text">{{data.airline[0].slogan}}</div>
        </div>
        <div class="b-pass__info-block">
          <div class="b-pass__title">Штаб-квартира:</div>
          <div class="b-pass__text">{{data.airline[0].head_quaters}}</div>
        </div>
        <div class="b-pass__info-block">
          <div class="b-pass__title">Сайт:</div>
          <div class="b-pass__text">{{data.airline[0].website}}</div>
        </div>
        <q-img class="b-pass__img" :src="data.airline[0].logo"></q-img>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { AirPassengers } from '../models'

class Props {
  readonly data!: AirPassengers;
  readonly active!: boolean;
}

export default class AirCompany extends Vue.with(Props) {
  clickCount = 0;
  loader = false

  // async updateAirList (val:number) {
  //   await this.$store.dispatch('air/updateAirCompanyAxios') //eslint-disable-line
  // }
}
</script>
<style lang="scss">
.b-pass{
  &__data-container{
    padding: 15px;
  }
  &__user-block{
    display: flex;
  }
  &__user-img-container{
    width: 180px;
    height: 180px
  }
  &__user-img{
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0px 0px 15px 5px #aa9595;
    background-color: #f0eee9;
    width: 150px;
    height: 180px;
    background-size: cover;
  }
  &__info-block{
    display: flex;
    padding: 6px 0;
  }
  &__title{
    margin: 5px 0;
    min-width: 250px;
    font: 700 20px/22px "Comfortaa",sans-serif;
  }
  &__text{
    margin: 5px 0;
    font: 300 18px/22px "Comfortaa",sans-serif;
  }
  &__img{
    height: 80px;
    overflow: hidden;
    background-size: cover;
    .q-img__container{
      display: flex;
      justify-content: flex-end;
    }
  }
  &__img .q-img__image{
    object-fit: contain!important;
    width: 30%!important;
  }
}
</style>
