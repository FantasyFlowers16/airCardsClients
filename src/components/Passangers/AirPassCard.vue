<template>
  <div class="b-pass-card-backdrop">
    <div class="b-pass-card">
      <div class="b-pass-card__item">
          <q-img class="b-pass-card__img" :src="data.airline[0].logo"></q-img>
          <div class="b-pass-card__data-container">
            <div class="b-pass-card__info-block" >
              <div class="b-pass-card__title">Имя пассажира: </div>
              <div class="b-pass-card__text"  :class="{_load:loader}">{{data.name}}</div>
              <div class="b-pass-card__redact-name" v-if="!changeName" @click="redactName"></div>
              <div class="b-pass-card__succsess-name" v-if="ChangeName" @click="redactName"></div>
            </div>
            <div class="b-pass__info-block" v-if="changeName && !ChangeName">
              <q-input class="b-pass-card__input input" color="black" v-model="name" />
              <q-btn class="but b-pass-card__but " @click="changePasName">Изменить</q-btn>
            </div>
            <div class="b-pass-card__info-block" >
              <div class="b-pass-card__title">Поездки: </div>
              <div class="b-pass-card__text"  :class="{_load:loader}">{{data.trips}}</div>
            </div>
            <!-- <div class="b-pass__info-block" v-if="changeTrips && !ChangeName">
              <q-input class="b-pass-card__input input" color="black" v-model="tripsCount" />
              <q-btn class="but b-pass-card__but " @click="changePasName">Изменить</q-btn>
             </div> -->
            <div class="b-pass__info-block">
              <div class="b-pass-card__title">Название компании: </div>
              <div class="b-pass-card__text" :class="{_load:loader}">{{data.airline[0].name}}</div>
            </div>
            <div class="b-pass-card__info-block">
              <div class="b-pass-card__title">Страна:</div>
              <div class="b-pass-card__text" :class="{_load:loader}">{{data.airline[0].country}}</div>
            </div>
            <div class="b-pass-card__info-block">
              <div class="b-pass-card__title">Слоган:</div>
              <div class="b-pass-card__text" :class="{_load:loader}">{{data.airline[0].slogan}}</div>
            </div>
            <div class="b-pass-card__info-block">
              <div class="b-pass-card__title">Штаб-квартира:</div>
              <div class="b-pass-card__text" :class="{_load:loader}">{{data.airline[0].head_quaters}}</div>
            </div>
            <div class="b-pass-card__info-block">
              <div class="b-pass-card__title">Сайт:</div>
              <div class="b-pass-card__text" :class="{_load:loader}">{{data.airline[0].website}}</div>
            </div>
          </div>
      </div>
      <div class="b-pass-card__delete-but-container">
        <q-btn class="but" color="black" @click="deletePas"> Удалить</q-btn>
      </div>
      <div class="b-pass-card__fon"></div>
      <div class="b-pass-card__close" @click="closeCard"></div>
    </div>
    <loader v-if="loader" class="b-pass-card__load"></loader>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { AirPassengers, NameChange } from '../models'
import Loader from '../loader.vue'

class Props {
  readonly data!: AirPassengers;
}

@Options({
  components: { Loader }
})

export default class CompanyCard extends Vue.with(Props) {
  clickCount = 0;
  loader = true
  name = this.data.name
  tripsCount = this.data.trips
  changeName = false
  changeTrips = false

  get Passengers () : Array<AirPassengers> {
    return this.$store.getters['air/getPassengers'] as Array<AirPassengers>  //eslint-disable-line
  }

  get PassengerActiveCard () : AirPassengers {
    return this.$store.getters['air/getPassengerActiveCard'] as AirPassengers  //eslint-disable-line
  }

  get ChangeName () : boolean {
    return this.$store.getters['air/getChangeName'] as boolean //eslint-disable-line
  }

  updateOpClosenCard (val: boolean) {
    this.$store.dispatch('air/updateOpenCloseCard',val) //eslint-disable-line
  }

  updateOpenClosePopup (val: boolean) {
    this.$store.dispatch('air/updateOpenClosePopup',val) //eslint-disable-line
  }

  updatePassengersFull (val: Array<AirPassengers>) {
    this.$store.dispatch('air/updatePassengersFull',val) //eslint-disable-line
  }

  updatePassengersDeleteId (val: string|null) {
    this.$store.dispatch('air/updatePassengersDeleteId',val) //eslint-disable-line
  }

  updatePassengerName (val: NameChange) {
    this.$store.dispatch('air/updatePassengerName',val) //eslint-disable-line
  }

  updateChangeName (val: boolean) {
    this.$store.dispatch('air/updateChangeName',val) //eslint-disable-line
  }

  async deletePassengersAxios (val: string) {
    await this.$store.dispatch('air/deletePassengersAxios',val) //eslint-disable-line
  }

  updatePassengerNameAxios (val: NameChange) {
    this.$store.dispatch('air/updatePassengerNameAxios',val) //eslint-disable-line
  }

  updateActivePassenger (val: AirPassengers) {
    this.$store.dispatch('air/updateActivePassenger',val) //eslint-disable-line
  }

  mounted () {
    this.loader = true
    setTimeout(() => {
      this.loader = false
    }, 1100)
  }

  redactTrips () {
    this.changeTrips = true
  }

  redactName () {
    this.changeName = true
  }

  async deletePas () {
    this.loader = true
    await this.deletePassengersAxios(this.data._id)//eslint-disable-line
    this.loader = false
    this.closeCard()
    this.updateOpenClosePopup(true)
    this.updatePassengersDeleteId(this.data._id)
    // this.updatePassengers(this.Passengers.filter(el => el._id !== this.data._id))
  }

  changePasName () {
    this.updatePassengerNameAxios({ id: this.data._id, name: this.name })
    let Passengers:Array<AirPassengers> = JSON.parse(JSON.stringify(this.Passengers))//eslint-disable-line
    Passengers.forEach((el:AirPassengers) => {
      if (el._id === this.data._id) {
        el.name = this.name
      }
    })
    this.updatePassengersFull(Passengers)
    console.log('Passengers', Passengers)
    console.log('this.Passengers', this.Passengers)
    const AtivePassenger:AirPassengers = JSON.parse(JSON.stringify(this.PassengerActiveCard))//eslint-disable-line
    AtivePassenger.name = this.name
    this.updateActivePassenger(AtivePassenger)
  }

  closeCard () {
    this.updateOpClosenCard(false)
    this.updateChangeName(false)
  }
}
</script>
<style lang="scss">
.b-pass-card-backdrop{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  z-index: 10;
  align-items: center;
}
.b-pass-card{
  width: 60%;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 10px 5px 25px rgb(8, 8, 8);
  height: calc(100vh - 200px);
  background: rgb(187, 187, 187);
  position: relative;
  // overflow-y: auto;
  // overflow-x: hidden;
  &__but{
    margin: 0 20px
  }
  &__redact-name{
    width: 30px;
    height: 30px;
    background:url('assets/icons/edit.svg');
    z-index: 10000;
    z-index: 10000;
    background-size: cover;
    margin-left: 24px;
  }
  &__succsess-name{
    width: 25px;
    height: 30px;
    background:url('assets/icons/succsess.svg');
    z-index: 10000;
    z-index: 10000;
    background-size: cover;
    margin-left: 24px;
  }
  &__item{
    position: relative;
    z-index: 2;
    padding-bottom: 100px;
  }
  &__delete-but-container{
    width: 100%;
    position: absolute;
    bottom: 23px;
    left: 21px;
  }
  &__fon{
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top:0;
    border-radius: 20px;
    left:0;
    opacity: .7;
    z-index: 1;
    background:url('assets/fon.jpg') ;
  }
  &__data-container{
    margin-top: 20px;
  }
  &__info-block{
    display: flex;
    padding: 16px 0;
    position: relative;
  }
  &__title{
    margin: 5px 0;
    min-width: 350px;
    font: 700 26px/26px "Comfortaa",sans-serif;
  }
  &__text{
    margin: 5px 0;
    font: 300 24px/24px "Comfortaa",sans-serif;
    position: relative;
    &._load{
      &:before{
        content: '';
        width: 100%;
        height: calc(100% + 5px);
        position: absolute;
        animation: load 3s ease infinite;
        background: linear-gradient(-45deg, #020202, #c2c2c2, #202020, #c2c2c2);
        background-size: 400% 400%;
      }
    }
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
  &__close{
    cursor: pointer;
    font-size: 30px;
    position: absolute;
    top: -30px;
    width: 40px;
    height: 40px;
    // background-image: url('assets/icons/cancel.svg');
    background-size: cover;
    border-radius: 20px ;
    right: -45px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(187, 187, 187);
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
  &__load{
    opacity: .5;
  }
}

@keyframes load {
  0% {
    background-position: 0% 50%
  }
  50% {
    background-position: 100% 50%
  }
  100% {
    background-position: 0% 50%
  }
}
</style>
