<template>
  <div  class="b-filter-backdrop" :class="{_open:OpenCloseFilter}" @click="whatIsClick">
    <div class="b-filter__item-comtainer">
    <div class="b-filter__item" >
      <div class="b-filter__title"> Выберите компанию:</div>
      <div class="b-filter__select-title" @click="openListCompanies">{{titleSelectCompany}}</div>
      <div class="b-filter__select-container" :class="{_open:openSelectCompany}">
        <div v-for="item in ActualFilterCountry.name" :key="item" class="b-filter__select-item">
          <div @click="checkCompany(item)" class="b-filter__select-item-link">{{item}}</div>
        </div>
      </div>
    </div>
    <div class="b-filter__item" >
      <div class="b-filter__title"> Выберите страну:</div>
      <div class="b-filter__select-title" @click="openListCountres">{{titleSelectCountry}}</div>
      <div class="b-filter__select-container" :class="{_open:openSelectCountry}">
        <div v-for="item in ActualFilterCountry.country" :key="item" class="b-filter__select-item">
          <div @click="checkCountry(item)" class="b-filter__select-item-link">{{item}}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="b-filter__but-container" >
    <q-btn class="but" color="black" @click="clearFilter">Сбросить фильтр</q-btn>
  </div>
    <div class="array" @click="closeFilter"></div>
 </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { AirPassengers, FilteCompanyItem, FilterPoint } from '../models'
import Loader from '../loader.vue'

class Props {
  readonly data!: AirPassengers;
}

@Options({
  components: { Loader }
})

export default class CompanyCard extends Vue.with(Props) {
  clickCount = 0;
  openSelectCompany = false
  openSelectCountry = false
  loader = true
  titleSelectCompany = 'Выберите компанию:'
  titleSelectCountry = 'Выберите страну'

  get OpenCloseFilter () : boolean {
    return this.$store.getters['filter/getOpenCloseFilter'] as boolean //eslint-disable-line
  }

  get Passengers () : Array<AirPassengers> {
    return this.$store.getters['air/getPassengers'] as Array<AirPassengers>  //eslint-disable-line
  }

  // get FilterCompanyItem () : FilteCompanyItem {
  //   return this.$store.getters['filter/getFilterCompanyItem'] as FilteCompanyItem  //eslint-disable-line
  // }

  get FilteredPoint () : FilterPoint {
    return this.$store.getters['filter/getFilteredPoint'] as FilterPoint//eslint-disable-line
  }

  get ActualFilterCountry () : FilteCompanyItem {
    const Filter:FilteCompanyItem = { name: [], country: [] }
    const CountresNames:Array<string> = []
    const CompanyNames:Array<string> = []
    this.Passengers.forEach(el => {
      if (CountresNames.indexOf(el.airline[0].country) === -1) {
        CountresNames.push(el.airline[0].country)
      }
      if (CompanyNames.indexOf(el.airline[0].name) === -1) {
        CompanyNames.push(el.airline[0].name)
      }
      Filter.name = CompanyNames
      Filter.country = CountresNames
    })
    return Filter
  }

  // created () {
  //   this.$watch('Passengers', () => {
  //     this.ActualFilterCountry()
  //   })
  // }

  updateOpCloseFilter (val: boolean) {
    this.$store.dispatch('filter/updateOpenCloseFilter',val) //eslint-disable-line
  }

  updateFilteredPoint (val: FilterPoint) {
    this.$store.dispatch('filter/updateFilteredPoint',val) //eslint-disable-line
  }

  whatIsClick (e: Event) {
    console.log(e.target)
  }

  openListCompanies () {
    this.openSelectCompany = !this.openSelectCompany
    console.log('openListCompanies')
  }

  openListCountres () {
    console.log('openListCountres')
    this.openSelectCountry = !this.openSelectCountry
  }

  // ActualFilterCountry () {
  //   console.log('ActualFilterCountry666')
  //   const Filter:FilteCompanyItem = { name: [], country: [] }
  //   const CountresNames:Array<string> = []
  //   const CompanyNames:Array<string> = []
  //   this.Passengers.forEach(el => {
  //     if (CountresNames.indexOf(el.airline[0].country) === -1) {
  //       CountresNames.push(el.airline[0].country)
  //     }
  //     if (CompanyNames.indexOf(el.airline[0].name) === -1) {
  //       CompanyNames.push(el.airline[0].name)
  //     }
  //     Filter.name = CompanyNames
  //     Filter.country = CountresNames
  //   })
  //   console.log(Filter)
  //   this.updateFilteCompanyItem(Filter)
  // }

  checkCountry (name:string) {
    this.titleSelectCountry = name
    this.openSelectCountry = false
    const FilterPoint = {
      company: this.FilteredPoint.company,
      namePas: this.FilteredPoint.namePas,
      country: this.titleSelectCountry
    }
    this.updateFilteredPoint(FilterPoint)
  }

  checkCompany (name:string) {
    this.titleSelectCompany = name
    this.openSelectCompany = false
    const FilterPoint = {
      company: this.titleSelectCompany,
      namePas: this.FilteredPoint.namePas,
      country: this.FilteredPoint.country
    }
    this.updateFilteredPoint(FilterPoint)
  }

  closeFilter () {
    this.updateOpCloseFilter(false)
  }

  clearFilter () {
    this.titleSelectCompany = 'Выберите компанию:'
    this.titleSelectCountry = 'Выберите страну'
    const FilterPoint = {
      company: '',
      namePas: this.FilteredPoint.namePas,
      country: ''
    }
    this.updateFilteredPoint(FilterPoint)
  }
}
</script>
<style lang="scss">
.b-filter-backdrop{
  display: flex;
  flex-direction: column;
  position: fixed;
  top: -100%;
  left: 0;
  width: 100%;
  min-height: 200px;
  z-index: 10;
  height: 50%;
  transition: .4s top ease;
  background-color: rgba(22, 22, 22, 0.9);
  display: flex;
  padding: 40px 20px;
  // justify-content: center;
  // align-items: center;
  &._open{
    top: 0
  }
}
.b-filter{
  width: 60%;
  padding: 20px;
  box-shadow: 10px 5px 25px rgb(8, 8, 8);
  height: calc(100vh - 200px);
  background: rgb(187, 187, 187);
  position: relative;
  // overflow-y: auto;
  // overflow-x: hidden;
  &__item-comtainer{
    display: flex;
  }
  &__item{
    margin-right: 30px;
  }
  &__title{
    font: 700 28px/28px "Comfortaa",sans-serif;
    color: $txtWhite;
  }
  &__select-item-link{
    padding: 15px;
  }
  &__select-container{
    max-height: 0;
    max-width: 350px;
    border-radius: 0px 0px 20px 20px;
    overflow: hidden;
    transition: max-height .3s ease;
    &._open{
      max-height: 230px;
      overflow: auto;
      transition: max-height .2s ease;
    }
  }
  &__but-container{
    margin-top: 50px;
    max-width: 500px;
  }
  &__select-title{
    margin: 20px 0 0 0 ;
    max-width: 350px;
    padding: 15px;
    border-radius:  10px 10px 0px 0px;
    cursor: pointer;
    background-color: $bgMain;
    transition: opacity .3s ease;
    opacity: .8;
    font: 400 20px/22px "Comfortaa",sans-serif;
    &:hover{
      transition: opacity .2s ease;
      opacity: 1;
    }
  }
  &__select-item{
    cursor: pointer;
    width: 100%;
    font: 400 15px/22px "Comfortaa",sans-serif;
    background-color: $bgMain;
    transition: background-color .3s ease;
    &:hover{
      background-color: #7299c1;
      transition: background-color .2s ease;
    }
  }
}
</style>
