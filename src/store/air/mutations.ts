import { MutationTree } from 'vuex'
import { AirInterface } from './state'
import { AirCompanyList, AirPassengers, PasDelete, DataWeather, PointWeather } from '../../components/models'

const mutation: MutationTree<AirInterface> = {
  changeAirList (state: AirInterface, payload: Array<AirCompanyList>):void {
    state.airConpanyList = payload
  },
  changePassengers (state: AirInterface, payload: Array<AirPassengers>):void {
    state.passengers = payload
  },
  changePassengersActual (state: AirInterface, payload: Array<AirPassengers>):void {
    state.passengersActual = payload
  },
  changeDataWeather (state: AirInterface, payload: DataWeather):void {
    state.dataWeather = payload
  },
  changePointWeather (state: AirInterface, payload: Array<PointWeather>):void {
    state.pointWeather = payload
  },
  changePassengersDeleteId (state: AirInterface, payload: string | null) :void {
    state.passengersDeleteId = payload
  },
  changeOpenCloseCard (state: AirInterface, payload: boolean):void {
    state.openCloseCard = payload
  },
  changeOpenCloseWeather (state: AirInterface, payload: boolean):void {
    state.openCloseWeather = payload
  },
  changeOpenClosePopup (state: AirInterface, payload: boolean):void {
    state.openClosePopup = payload
  },
  changeActualPage (state: AirInterface, payload: number):void {
    state.actualPage = payload
  },
  changeDeleteData (state: AirInterface, payload: PasDelete):void {
    state.deleteData = payload
  }
}

export default mutation
