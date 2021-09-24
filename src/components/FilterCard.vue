<template>
  <div  class="b-filter-backdrop" :class="{_open:OpenCloseFilter}" >
    <div class="b-filter__title"> Выберите компанию:</div>
    <div class="b-filter__select-title" @click="openListCompanies">{{titleSelectCompany}}</div>
    <div class="b-filter__select-container" :class="{_open:openSelectCompany}">
      <div v-for="item in FilteCompanyItem" :key="item.id" class="b-filter__select-item">
        <div @click="checkCompany(item.name)">{{item.name}}</div>
      </div>
    </div>

    <div class="array" @click="closeFilter"></div>
 </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { AirPassengers, FilteCompanyItem } from '../components/models'
import Loader from './loader.vue'

class Props {
  readonly data!: AirPassengers;
}

@Options({
  components: { Loader }
})

export default class CompanyCard extends Vue.with(Props) {
  clickCount = 0;
  openSelectCompany = false
  loader = true
  titleSelectCompany = 'Выберите компанию:'

  get OpenCloseFilter () : boolean {
    return this.$store.getters['filter/getOpenCloseFilter'] as boolean //eslint-disable-line
  }

  get FilteCompanyItem () : Array<FilteCompanyItem> {
    return this.$store.getters['filter/getFilteCompanyItem'] as Array<FilteCompanyItem>  //eslint-disable-line
  }

  updateOpCloseFilter (val: boolean) {
    this.$store.dispatch('filter/updateOpenCloseFilter',val) //eslint-disable-line
  }

  openListCompanies () {
    this.openSelectCompany = !this.openSelectCompany
    console.log('openListCompanies')
  }

  checkCompany (name:string) {
    this.titleSelectCompany = name
    this.openSelectCompany = false
  }

  closeFilter () {
    this.updateOpCloseFilter(false)
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
  &__title{
    font: 700 28px/28px "Comfortaa",sans-serif;
    color: $txtWhite;
  }
  &__select-container{
    max-height: 0;
    max-width: 350px;
    border-radius: 0px 0px 20px 20px;
    overflow: hidden;
    transition: max-height .3s ease;
    &._open{
      max-height: 500px;
      transition: max-height .2s ease;
    }
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
    padding: 15px;
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
