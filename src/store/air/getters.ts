import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { AirInterface } from './state'
import { AirCompanyList, AirPassengers, PasDelete, DataWeather, PointWeather } from '../../components/models'

const getters: GetterTree<AirInterface, StateInterface> = {
  getAirList (context) : Array<AirCompanyList> {
    return context.airConpanyList
  },
  getPassengersActual (context) : Array<AirPassengers> {
    return context.passengersActual
  },
  getPassengers (context) : Array<AirPassengers> {
    return context.passengers
  },
  getPointWeather (context) : Array<PointWeather> {
    return context.pointWeather
  },
  getDataWeather (context) : DataWeather {
    return context.dataWeather
  },
  getPassengersDeleteId (context) : string | null {
    return context.passengersDeleteId
  },
  getOpenCloseCard (context) : boolean {
    return context.openCloseCard
  },
  getOpenClosePopup (context) : boolean {
    return context.openClosePopup
  },
  getOpenCloseWeather (context) : boolean {
    return context.openCloseWeather
  },
  getActualPage (context) : number {
    return context.actualPage
  },
  getPasDelete (context) : PasDelete {
    return context.deleteData
  }
}

export default getters
