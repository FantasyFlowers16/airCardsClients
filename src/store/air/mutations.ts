import { MutationTree } from 'vuex'
import { AirInterface } from './state'
import { AirCompanyList, AirPassengers, PasDelete, NameChange } from '../../components/models'

const mutation: MutationTree<AirInterface> = {
  changeAirList (state: AirInterface, payload: Array<AirCompanyList>):void {
    state.airConpanyList = payload
  },
  changePassengers (state: AirInterface, payload: Array<AirPassengers>):void {
    state.passengers = payload
  },
  changePassengerName (state: AirInterface, payload: NameChange):void {
    state.updatingName = payload
  },
  changesuccsesseName  (state: AirInterface, payload: boolean):void {
    state.succsessChangeName = payload
  },
  changePassengersActual (state: AirInterface, payload: Array<AirPassengers>):void {
    state.passengersActual = payload
  },
  changePassengersDeleteId (state: AirInterface, payload: string | null) :void {
    state.passengersDeleteId = payload
  },
  changeOpenCloseCard (state: AirInterface, payload: boolean):void {
    state.openCloseCard = payload
  },
  changeOpenCloseCompanies (state: AirInterface, payload: boolean):void {
    state.openCloseCompanies = payload
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
