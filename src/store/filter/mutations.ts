import { MutationTree } from 'vuex'
import { FilterInterface } from './state'
import { FilterPoint } from '../../components/models'

const mutation: MutationTree<FilterInterface> = {

  changeOpenCloseFilter (state: FilterInterface, payload: boolean):void {
    state.openCloseFilter = payload
  },
  changeFilteredPoint (state: FilterInterface, payload: FilterPoint):void {
    state.filteredPoint = payload
  }
}

export default mutation
