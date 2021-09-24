<template>
  <div  class="b-airlines-backdrop"  :class="{_open:OpenCloseCompanies}">
    <div  class="b-airlines-card">
      <div class="title b-airlines-card__title">  Авиакомпании</div>
      <div class="b-airlines__container-item" :class="{_full:ActiveListCompany.length<2 }">
        <div class="b-airlines__close-company-card" v-if="ActiveListCompany.length<2"  @click="closeBlock"></div>
        <div v-for="item in ActiveListCompany" :key="item.name" :class="{_openCard: openCard}" class="b-airlines__item"  @click="openBlock(item.id)">
          <filter-card-company :fullInfo="openCard" :data="item" ></filter-card-company>
        </div>
      </div>
      <div class="b-airlines__but-container">
        <q-btn v-if="ActiveListCompany.length>1" class="but" color="black" @click="addCompany">Eще</q-btn>
      </div>
    </div>
    <div class="array"  @click="closeCompanies"></div>
    <loader v-if="loader"></loader>
 </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { AirCompanyList } from './models'
import Loader from './loader.vue'
import FilterCardCompany from './AirlinesCardItem.vue'

class Props {
}

@Options({
  components: { Loader, FilterCardCompany }
})

export default class AirlinesCard extends Vue.with(Props) {
  loader = false
  lookCount = 0
  openCard = false
  activeId :string|null = null
  CompanyNames:Array<string> = []
  ActivCompany: Array<AirCompanyList> = []

  get AirList () : Array<AirCompanyList> {
    return this.$store.getters['air/getAirList'] as Array<AirCompanyList>  //eslint-disable-line
  }

  get ActiveListCompany () {
    if (this.openCard) {
      return this.AllCompanies.filter(el => el.id === this.activeId)
    } else {
      this.AllCompanies.forEach((element, ind) => {
        if (this.lookCount < ind && ind <= this.lookCount + 10) {
          this.ActivCompany.push(element)
        }
      })
      this.loader = false
      return this.ActivCompany
    }
  }

  get AllCompanies () {
    const CorrectCompany: Array<AirCompanyList> = []
    this.AirList.forEach(el => {
      if (this.CompanyNames.indexOf(el.name) === -1) {
        this.CompanyNames.push(el.name)
        CorrectCompany.push(el)
      }
    })
    // CorrectCompany.sort(function (a, b) {
    //   const nameA = a.name.toLowerCase()
    //   const nameB = b.name.toLowerCase()
    //   if (nameA < nameB) {
    //     return -1
    //   } else if (nameA > nameB) {
    //     return 1
    //   } else return 0 // Никакой сортировки
    // })
    return CorrectCompany
  }

  get OpenCloseCompanies () : boolean {
    return this.$store.getters['air/getOpenCloseCompanies'] as boolean //eslint-disable-line
  }

  // get CurrentImgDaily ():string {
  //   return 'http://openweathermap.org/img/wn/' + this.DataWeather.daily[0].weather[0].icon + '@2x.png'//eslint-disable-line
  // }

  updateOpCloseCompanies (val: boolean) {
    this.$store.dispatch('air/updateOpenCloseCompanies',val) //eslint-disable-line
  }

  async updateAirlinesAxios () {
    await this.$store.dispatch('air/updateAirlinesAxios') //eslint-disable-line
  }

  async mounted () {
    await this.updateAirlinesAxios()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  }

  addCompany () {
    this.loader = true
    this.lookCount = this.lookCount + 10
  }

  closeCompanies () {
    this.updateOpCloseCompanies(false)
    document.body.style.overflow = 'auto'
  }

  openBlock (id:string) {
    console.log('openBlock')
    this.openCard = true
    this.activeId = id
    console.log('openBlock')
  }

  closeBlock () {
    this.openCard = false
    this.activeId = null
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

@keyframes showCardClose {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
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
.b-airlines{
  &__container-item{
    overflow: auto;
    display: flex;
    position: relative;
    flex-wrap: wrap;
    transition: width .3s ease, height .3s ease;
    &._full{
      .b-airlines__item{
        cursor:initial;
        width: 100%;
        height: calc(100vh - 200px);
        transition: width .3s ease, height .3s ease;
        &:hover{
         opacity: .8;
        }
      }
    }
  }
  &__close-company-card{
    background-image: url('assets/icons/resize.svg');
    position: absolute;
    top: 10px;
    right:30px;
    animation: showCardClose 2.8s ease;
    width: 30px;
    height: 30px;
    background-size: cover;
    z-index: 1;
    cursor: pointer;
  }
  &__item{
    cursor: pointer;
    width: calc(33.3% - 20px);
    margin: 0px 18px 18px 0;
    display: flex;
    height:200px;
    flex-direction: column;
    align-items: center;
    background: $bgMain;
    border-radius: 10px;
    overflow: hidden;
    opacity: 0.8;
    padding: 30px;
    transition: opacity .4 ease;
    &:hover{
      opacity: .9;
      transition: opacity .3 ease;
    }
    &._openCard{
      align-items: flex-start;
    }
  }
  &__but-container{
    width: 100%;
    display: flex;
    align-items: center;
    // justify-content: center;
  }
  &__title{
    color: $txtWhite;
  }
  &__img{
    width: auto;
    background-size: cover ;
    max-height: 80px;
    max-width: 100%;
    margin: 40px 0 10px 0;
  }

}
.b-airlines-backdrop{
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
.b-airlines-card{
  padding: 40px;
  position: relative;
  overflow: auto;
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
    // &:hover{
    //   background-color: rgba(255, 255, 255, 0.5);
    //   color: black;
    // }
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
