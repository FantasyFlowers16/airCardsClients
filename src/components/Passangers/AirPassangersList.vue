<template>
  <div>
    <div class="b-pass__pages">{{ActualPage}} {{titlePage}}</div>
    <div class="b-pass" >
        <div v-for="item in FilteredPassangers" :key="item._id"  class="b-pass__item-card" @click="openItem(item)">
          <air-pass-item :data = "item" />
          <div class="b-pass__item-bg"></div>
        </div>
    </div>
    <div v-if="filterText" class="b-pass__filter-text">{{filterText}}</div>
    <loader v-if="loader" class="b-pass__load"></loader>
    <transition name="showCard">
      <air-pass-card :data ="this.PassengerActiveCard" v-if="OpenCloseCard"></air-pass-card>
    </transition>
    <transition name="showCard">
      <popup-card v-if="OpenClosePopup"></popup-card>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import AirPassItem from './AirPassangersItem.vue'
import AirPassCard from './AirPassCard.vue'
import Loader from '../loader.vue'
import PopupCard from '../Popap.vue'
import { AirCompanyList, AirPassengers, FilterPoint } from '../../components/models'

class Props {
  readonly title!: string;
  // readonly todos = prop<Todo[]>({ default: () => [] });
  readonly active!: boolean;
}

@Options({
  components: { AirPassItem, AirPassCard, Loader, PopupCard }
})

export default class AirCompanies extends Vue.with(Props) {
  loader = false
  openCard = false
  PassengersList: Array<AirPassengers> = []
  CompanyNames:Array<string> = []
  filterText = ''
  actualItem:AirPassengers|null = null

  get PassengersDeleteId () : string | null {
    return this.$store.getters['air/getPassengersDeleteId'] as string | null  //eslint-disable-line
  }

  get AirList () : Array<AirCompanyList> {
    return this.$store.getters['air/getAirList'] as Array<AirCompanyList>  //eslint-disable-line
  }

  get PassengerActiveCard () : AirPassengers {
    return this.$store.getters['air/getPassengerActiveCard'] as AirPassengers  //eslint-disable-line
  }

  get OpenClosePopup () {
    return this.$store.getters['air/getOpenClosePopup'] as boolean  //eslint-disable-line
  }

  get FilteredPoint () : FilterPoint {
    return this.$store.getters['filter/getFilteredPoint'] as FilterPoint//eslint-disable-line
  }

  get FilteredPassangers () : Array<AirPassengers> {
    this.loader = true
    let ActualPas: Array<AirPassengers> = JSON.parse(JSON.stringify(this.Passengers))//eslint-disable-line
    if (this.FilteredPoint.company !== '' || this.FilteredPoint.country !== '') {
      if (this.FilteredPoint.company !== '') {
        this.loader = true
        const NewAirPas: Array<AirPassengers> = []
        ActualPas.forEach(el => {
          if (el.airline[0].name === this.FilteredPoint.company) {
            NewAirPas.push(el)
          }
        })
        ActualPas = NewAirPas
        this.loader = false
      }
      if (this.FilteredPoint.country !== '') {
        this.loader = true
        const NewAirPas: Array<AirPassengers> = []
        ActualPas.forEach(el => {
          if (el.airline[0].country === this.FilteredPoint.country) {
            NewAirPas.push(el)
          }
        })
        ActualPas = NewAirPas
        this.loader = false
        if (!ActualPas.length && this.Passengers.length) {
          this.filterText = 'Нет подходящих вариантов для вашего поиска'
        } else {
          this.filterText = ''
        }
      }
      return ActualPas
    } else {
      this.loader = false
      return ActualPas
    }
  }

  get Passengers () : Array<AirPassengers> {
    return this.$store.getters['air/getPassengers'] as Array<AirPassengers>  //eslint-disable-line
  }

  get OpenCloseCard () {
    return this.$store.getters['air/getOpenCloseCard'] as boolean  //eslint-disable-line
  }

  get ActualPage () {
    return this.$store.getters['air/getActualPage'] as number  //eslint-disable-line
  }

  get titlePage () {
    let titlePage = ''
    const string = this.ActualPage.toString()//eslint-disable-line
    const lastChar = string.charAt(string.length - 1)
    console.log('lastChar', lastChar)
    if (lastChar === '0' || lastChar === '5' || lastChar === '6' || lastChar === '7' || lastChar === '8' || lastChar === '9' || this.ActualPage === 11 || this.ActualPage === 12 || this.ActualPage === 13 || this.ActualPage === 14 || this.ActualPage === 15) {
      console.log('lastChar 123', lastChar)
      titlePage = 'страниц'
    } else if (lastChar === '1' && !(this.ActualPage === 11)) {
      titlePage = 'страница'
    } else {
      titlePage = 'страницы'
    }
    return titlePage
  }

  // created () {
  //   this.$watch('Passengers', () => {
  //     this.CountActualPassangers()
  //   })
  // }

  mounted () {
    console.log('start')
    window.addEventListener('scroll', this.loockScroll) //eslint-disable-line
  }

  async updatePassengersAxios (val: number) {
    await this.$store.dispatch('air/updatePassengersAxios', val) //eslint-disable-line
  }

  updatePassengersDeleteId (val: string|null) {
    this.$store.dispatch('air/updatePassengersDeleteId',val) //eslint-disable-line
  }

  updateActivePassenger (val: AirPassengers) {
    this.$store.dispatch('air/updateActivePassenger',val) //eslint-disable-line
  }

  updateActualPage (val: number) {
    this.$store.dispatch('air/updateActualPage', val) //eslint-disable-line
  }

  updateOpCloseCard (val: boolean) {
    this.$store.dispatch('air/updateOpenCloseCard',val) //eslint-disable-line
  }

  async loockScroll () {
    // const el = document.querySelector("#companies-container")
    if (document.documentElement.scrollHeight - document.documentElement.scrollTop === document.documentElement.clientHeight) {
      this.loader = true
      this.updateActualPage(this.ActualPage + 1)
      await this.updatePassengersAxios(this.ActualPage)//eslint-disable-line
      this.loader = false
      return true
    } else return false
  }

  openItem (AirPassengers:AirPassengers) {
    this.updateActivePassenger(AirPassengers)
    this.updateOpCloseCard(true)
  }
}
</script>
<style lang="scss">
// @import url('../css/quasar.variables.scss');

.showCard-enter-active {
  animation: showCard 0.8s;
}
.showCard-leave-active {
  animation: showCard 0.9s reverse;
}

.flip-list-move {
  transition: transform 0.8s ease;
}

@keyframes showCard {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
    opacity: .9
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

.b-pass{
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  position: relative;
  &__filter-text{
    margin-top: 60px;
    justify-content: center;
    font: 700 28px/28px "Comfortaa",sans-serif;
    display: flex;
    justify-content: center;
  }
  &__pages{
    position: sticky;
    font: 700 28px/28px "Comfortaa",sans-serif;
    width: 360px;
    align-items: center;
    justify-content: center;
    display: flex;
    height: 60px;
    z-index: 9;
    background-color: rgba(167, 164, 164, 0.8);
    top: 140px;
    border-radius: 10px;
    border: 1px solid gray;
    left: calc(50% - 180px);
    margin-right: 10px;
  }
  &__load{
    opacity: .5
  }
  &__btn{
    margin: 20px 0;
    border-radius: 10px ;
    padding: 5px 0;
    font: 700 28px/28px "Comfortaa",sans-serif;
    min-width: 150px;
  }
  &__btn-container{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__item-bg{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: -1;
    opacity: .4;
    height: 100%;
    background:url('assets/fon.jpg') ;
    transition: baclground-color .5s ease, opacity .5s ease;

  }
  &__item-card{
    position: relative;
    padding: 10px;
    border-radius: 10px;
    // background:url('assets/fon.jpg') ;
    margin: 9px;
    width: calc(33.3% - 18px);
    box-shadow: 10px 5px 5px rgb(148, 148, 148);
    cursor: pointer;
    &:hover{
      .b-pass__item-bg{
        background-color: black;
        opacity: .8
      }
    }
    // &:hover{
    //   box-shadow: 10px 5px 5px rgb(70, 70, 70);
    //   background: black;
    //   opacity: .2;
    //   transition: .3s box-shadow ease, 3s background ease,;
    // }
  }
}
</style>>
