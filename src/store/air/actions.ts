import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { AirInterface } from './state'
import Axios from 'axios'
import { AirCompanyList, AirPassengers, PasDelete } from '../../components/models'

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
  updatePassengersDeleteId (context, payload: string | null): void {
    context.commit('changePassengersDeleteId', payload)
  },
  updateActualPage (context, payload: number): void {
    context.commit('changeActualPage', payload)
  },
  updateDataDelete (context, payload: PasDelete): void {
    context.commit('changeDeleteData', payload)
  },

  async updatePassengersAxios (context, payload:number) {
    console.log('payload', payload)
    const $this: any = this // eslint-disable-line
    await Axios.get('https://api.instantwebtools.net/v1/passenger?page='+ payload +'&size=10')// eslint-disable-line
      .then(resp => {
        if (resp.status === 200) {
          console.log('HERE', resp.data)
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
