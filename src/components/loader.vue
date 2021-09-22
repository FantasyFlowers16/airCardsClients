<template>
  <div class="b-load">
    <div class="lds-ripple">
      <div>
      </div>
      <div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

.b-load{
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: $bgMain;
  z-index: 10000;
}
.lds-ripple {
  display: inline-block;
  position: relative;
  width: 180px;
  height: 180px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 136px;
    left: 136px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 272px;
    height: 272px;
    opacity: 0;
  }
}
</style>
