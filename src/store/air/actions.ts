import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { AirInterface } from './state'
import Axios from 'axios'
import { AirCompanyList, AirPassengers, PasDelete, DataWeather, PointWeather } from '../../components/models'

const actions: ActionTree<AirInterface, StateInterface> = {
  updateAirCompany (context, payload: Array<AirCompanyList>): void {
    context.commit('changeAirList', payload)
  },
  updatePassengers (context, payload: Array<AirPassengers>): void {
    context.commit('changePassengers', payload)
  },
  updatePassengersActual (context, payload: Array<AirPassengers>): void {
    context.commit('changePassengersActual', payload)
  },
  updateOpenCloseCard (context, payload: boolean): void {
    context.commit('changeOpenCloseCard', payload)
  },
  updateOpenClosePopup (context, payload: boolean): void {
    context.commit('changeOpenClosePopup', payload)
  },
  updateOpenCloseWeather (context, payload: boolean): void {
    context.commit('changeOpenCloseWeather', payload)
  },
  updatePointWeather (context, payload: Array<PointWeather>): void {
    context.commit('changePointWeather', payload)
  },
  updatePassengersDeleteId (context, payload: string | null): void {
    context.commit('changePassengersDeleteId', payload)
  },
  updateActualPage (context, payload: number): void {
    context.commit('changeActualPage', payload)
  },
  updateDataDelete (context, payload: PasDelete): void {
    context.commit('changeDeleteData', payload)
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
  },

  async updatePassengersAxios (context, payload:number) {
    console.log('payload', payload)
    const $this: any = this // eslint-disable-line
    await Axios.get('https://api.instantwebtools.net/v1/passenger?page='+ payload +'&size=10')// eslint-disable-line
      .then(resp => {
        if (resp.status === 200) {
          context.dispatch('updatePassengers', resp.data.data)// eslint-disable-line
        } else {
          console.log('Ошибка получения данных')
        }
      })
  },

  async deletePassengersAxios (context, payload:number) {
    console.log('payload', payload)
    const $this: any = this // eslint-disable-line
    await Axios.delete('https://api.instantwebtools.net/v1/passenger/' + payload)// eslint-disable-line
      .then(resp => {
        if (resp.status === 200) {
          if (resp.data.message) {// eslint-disable-line
            console.log('HERE', resp.data)
            const DataDelete = {status: true, message: resp.data.message}// eslint-disable-line
            context.dispatch('updateDataDelete', DataDelete)// eslint-disable-line
          } else {
            console.log('Ошибка получения данных')
          }
        } else {
          const DataDelete = {status: false, message: resp.data.message}// eslint-disable-line
          context.dispatch('updateDataDelete', DataDelete)// eslint-disable-line
        }
      })
  }
}

export default actions
