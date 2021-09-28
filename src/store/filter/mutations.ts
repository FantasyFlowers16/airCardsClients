import { MutationTree } from 'vuex'
import { FilterInterface } from './state'
import { FilteCompanyItem, FilterPoint } from '../../components/models'

const mutation: MutationTree<FilterInterface> = {

  changeOpenCloseFilter (state: FilterInterface, payload: boolean):void {
    state.openCloseFilter = payload
  },

  changeFilteCompanyItem (state: FilterInterface, payload: Array<FilteCompanyItem>):void {
    state.filterCompanies = payload
  },
  changeFilteredPoint (state: FilterInterface, payload: FilterPoint):void {
    state.filteredPoint = payload
  }
}

export default mutation
