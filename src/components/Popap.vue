<template>
  <div  class="b-popup-backdrop">
    <div class="b-popup" v-if="PasDelete.message.length">
      <img v-if="PasDelete.status" src="../assets/icons/success.svg" class="b-popup__img">
      <img v-else src="../assets/icons/cancel-popup.svg" class="b-popup__img">
      <div class="b-popup__text">{{PasDelete.message}}</div>
      <div class="b-popup__close" @click="closePopup"></div>
    </div>
</div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { PasDelete } from './models'
// declare global {
//     interface Window {
//         FB:any;
//     }
// }
// let FB = window.FB; // ok now
class Props {
}

@Options({
  components: { }
})

export default class Popup extends Vue.with(Props) {
  get PasDelete () : PasDelete {
    return this.$store.getters['air/getPasDelete'] as PasDelete  //eslint-disable-line
  }

  updateOpenClosePopup (val: boolean) {
    this.$store.dispatch('air/updateOpenClosePopup',val) //eslint-disable-line
  }

  closePopup () {
    this.updateOpenClosePopup(false)
  }
}
</script>
<style lang="scss" >
// @import url('../css/quasar.variables.scss');
.b-popup-backdrop{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}
.b-popup{
  padding: 40px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 50%;
  background: white;
  border-radius: 20px;
  &__img{
    width: 100px;
    height: 100px;
    margin: 20px 0 40px 0;
  }
  &__text{
    margin: 20px 0;
    font: 700 28px/28px "Comfortaa",sans-serif;
  }
  &__close{
    cursor: pointer;
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background:white;
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
