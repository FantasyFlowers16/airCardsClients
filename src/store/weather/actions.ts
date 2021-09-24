import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { WeatherInterface } from './state'
import Axios from 'axios'
import { PointWeather, DataWeather } from '../../components/models'

const actions: ActionTree<WeatherInterface, StateInterface> = {
  updateOpenCloseWeather (context, payload: boolean): void {
    context.commit('changeOpenCloseWeather', payload)
  },
  updatePointWeather (context, payload: Array<PointWeather>): void {
    context.commit('changePointWeather', payload)
  },
  updateDataWeather (context, payload: DataWeather): void {
    context.commit('changeDataWeather', payload)
  },

  async updateDataWeatherAxios (context, coords:Array<number>) {
    const $this: any = this // eslint-disable-line
      await Axios.get('https://api.openweathermap.org/data/2.5/onecall?lat='+ coords[0] +'&lon='+ coords[1] + '&appid=c0b78f4f0936527b5d6f07300d210a7c&units=metric')// eslint-disable-line
    // await Axios.get('https://api.openweathermap.org/data/2.5/weather?q='+ payload + ',ru&APPID=c0b78f4f0936527b5d6f07300d210a7c')// eslint-disable-line
      .then(resp => {
        if (resp.status === 200) {
          console.log('DataWeather', resp.data)
          context.dispatch('updateDataWeather', resp.data)// eslint-disable-line
        } else {
          console.log('Ошибка получения данных')
        }
      })
  }
}

export default actions
