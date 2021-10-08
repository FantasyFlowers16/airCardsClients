/* eslint-disable @typescript-eslint/no-floating-promises */
<template>
  <div>
    <div class="drawing__title">Цвет пера</div>
    <div class="drawing__container">
      <div id="redPen" src="http://professorweb.ru/downloads/pen_red.gif" class="drawing__pen drawing__pen--red" alt="Красная кисть" @click="changeColor('rgb(212,21,29)')"></div>
      <div id="greenPen" src="http://professorweb.ru/downloads/pen_green.gif" class="drawing__pen drawing__pen--green" alt="Зеленая кисть" @click="changeColor('rgb(131,190,61)')"></div>
      <div id="bluePen" src="http://professorweb.ru/downloads/pen_blue.gif" class="drawing__pen drawing__pen--blue" alt="Синяя кисть" @click="changeColor('rgb(0,86,166)')"></div>
    </div>
        <input
            id="foto"
            style="max-width: 42px"
            @input="uploadFoto"
            class="b-registration-profile__photo"
            type="file"
            ref="inputFile"
          >    <!-- <div class="Toolbar">
        - Толщина -<br>
        <img src="http://professorweb.ru/downloads/pen_thin.gif" alt="Тонкая кисть" onclick="changeThickness(1, this)">
        <img src="http://professorweb.ru/downloads/pen_medium.gif" alt="Нормальная кисть" onclick="changeThickness(5, this)">
        <img src="http://professorweb.ru/downloads/pen_thick.gif" alt="Толстая кисть" onclick="changeThickness(10, this)">
    </div> -->
    <div class="CanvasContainer">
      <canvas id="drawingCanvas" width="1000" height="400"></canvas>
    </div>
     <img class="drawing__img--hide" id="image1" v-bind:src="foto"  ref="file"><br>
    <div class="drawing__container">
      <button @click="saveCanvas" class="button button--save">Сохранить Рисунок</button>
      <button @click="clearCanvas" class="button button--clear">Очистить Доску</button>
      <div id="savedCopyContainer">
        <img id="savedImageCopy" v-bind:src="imagePreview"  ref="file"><br>
        Щелкните правой кнопкой мыши для сохранения ...
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
// import {  } from '../components/models'

@Options({
  components: {}
})
export default class PageDraw extends Vue {
  coords:Array<number> = []
  ctx: CanvasRenderingContext2D | null = null
  canvas: HTMLCanvasElement | null = null
  isDrawing=false
  foto=''
  imagePreview=''

  declare $refs: {
    file: HTMLImageElement,
    inputFile:HTMLFormElement,
  }

  startDrawing (e:TouchEvent) {
    this.isDrawing = true
    if (this.ctx && this.canvas) {
      this.ctx.beginPath() //eslint-disable-line
      console.log(e.touches[0].pageX)
      this.ctx.moveTo(e.touches[0].pageX - this.canvas.offsetLeft, e.touches[0].pageY - this.canvas.offsetTop)
    }
  }

  AddImg () {
    this.clearCanvas()
    const img = document.getElementById('image1') as HTMLImageElement
    if (img && this.ctx && this.canvas) {
      console.log('AddImg2', img)
      this.ctx.drawImage(img, 0, 0, this.canvas?.width, this.canvas?.height)
    }
  }

  uploadImg (input: HTMLInputElement): Promise<void> {
    return new Promise((resolve) => {
      const imag = document.getElementById('image1') as HTMLImageElement
      const { files } = input
      if (files) {
        const reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onload = (e: Event) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          /* @ts-ignore */
          imag.src = e.currentTarget.result//eslint-disable-line
          resolve()
          // void this.$nextTick(() => {
          //   this.AddImg()
          // })
          // eslint-disable-next-line @typescript-eslint/unbound-method
          // this.AddImg()
          // setTimeout(this.AddImg, 1000)
        }
      }
    })
  }

  async uploadFoto ({ target } :InputEvent) {
    const input = target as HTMLInputElement
    await this.uploadImg(input)
    this.AddImg()
  }

  draw (e:TouchEvent) {
    if (this.isDrawing && this.canvas && this.ctx) {
      const x = e.touches[0].pageX - this.canvas.offsetLeft
      const y = e.touches[0].pageY - this.canvas.offsetTop
      // Рисуем линию до новой координаты
      this.ctx.lineTo(x, y)
      this.ctx.stroke()
    }
  }

  stopDrawing () {
    this.isDrawing = false
  }

  changeColor (color:string) {
    if (this.ctx) {
      this.ctx.strokeStyle = color
    }
  }

  clearCanvas () {
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
  }

  saveCanvas () {
    // Находим элемент <img>
    const imageCopy = document.getElementById('savedImageCopy')
    if (this.canvas) {
      console.log(this.canvas.toDataURL())//eslint-disable-line
    }
    // Отображаем данные холста в элементе <img>
    if (imageCopy && this.canvas) { //eslint-disable-line
      (imageCopy as HTMLImageElement).src= this.canvas.toDataURL() //eslint-disable-line
    }
    // Показываем элемент <div>, делая изображение видимым
    // делая изображение видимым
    const imageContainer = document.getElementById('savedCopyContainer')
    if (imageContainer) {
      imageContainer.style.display = 'block'
    }
  }

  changeThickness () {
    console.log('changeThickness')
  }

  mounted () {
    this.canvas = <HTMLCanvasElement>document.getElementById('drawingCanvas')
    console.log('canvas:', this.canvas)
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d')
      if (this.ctx) {
        // this.canvas.onmousedown = this.startDrawing//eslint-disable-line
        this.canvas.addEventListener('touchstart', this.startDrawing, false)//eslint-disable-line
        this.canvas.addEventListener('touchmove', this.draw, false)//eslint-disable-line
        // this.canvas.onmousemove = this.draw//eslint-disable-line
        this.canvas.addEventListener('touchend', this.stopDrawing, false)//eslint-disable-line
        this.canvas.addEventListener('touchcancel', this.stopDrawing, false)//eslint-disable-line
        // this.canvas.onmouseup = this.stopDrawing//eslint-disable-line
        // this.canvas.onmouseout = this.stopDrawing//eslint-disable-line
        this.ctx.stroke() //eslint-disable-line
      }
    }
  }
}
</script>
<style lang="scss">
.drawing{
  &__container{
    display: flex;
    padding: 20px;
  }
  &__title{
    padding: 20px 20px 0px 20px;
    font-size:23px
  }
  &__img{
    &--hide{
      display: none;
    }
  }
  &__pen{
    cursor: pointer;
    width: 50px;
    height: 50px;
    margin: 20px 20px 20px 0;
    border-radius: 50%;
    opacity: .7;
    transition: opacity .3s ease;
    &:hover{
      opacity: 1;
    }
    &--red{
      background-color: red;
    }
    &--green{
      background-color: green;
    }
    &--blue{
      background-color: blue;
    }
  }
}
.Toolbar {
    float: left;
    font-family: 'Trebuchet MS';
    font-size: 14px;
    font-variant: small-caps;
    text-align: center;
    background: #F2F7FE;
    padding: 10px 15px 3px 10px;
    margin-bottom: 1px;
    margin-right: 1px;
    border: 1px solid #7B899B;
}
.button{
    padding: 6px;
    margin: 7px 10px;
    font-variant: normal;
    font-size: 20px;
    border: none;
    font-weight: 500;
    padding: 20px;
    border-radius: 10px;
    &--save{
      background-color: #7cdd80;
    }
    &--clear{
      background-color: #c95656;
    }
}

.CanvasContainer {
    clear: both;
}

canvas {
    border: 1px solid #7B899B;
}

img {
    cursor:pointer;
    padding: 2px;
    border: 2px solid #F2F7FE;
}

img:hover {
    border: 2px groove #E4F0FE;
    background: white;
}

img.Selected {
    border: 2px groove #E4F0FE;
}

#savedCopyContainer {
    display: none;
}

#savedCopyContainer img {
    width: 250px;
    height: 150px;
}
</style>
