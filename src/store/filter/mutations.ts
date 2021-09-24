import { MutationTree } from 'vuex'
import { FilterInterface } from './state'
import { FilteCompanyItem } from '../../components/models'

const mutation: MutationTree<FilterInterface> = {

  changeOpenCloseFilter (state: FilterInterface, payload: boolean):void {
    state.openCloseFilter = payload
  },

  changeFilteCompanyItem (state: FilterInterface, payload: Array<FilteCompanyItem>):void {
    state.filterCompanies = payload
  }
}

export default mutation
