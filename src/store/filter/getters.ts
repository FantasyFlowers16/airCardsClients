import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { FilterInterface } from './state'
import { FilterPoint } from '../../components/models'

const getters: GetterTree<FilterInterface, StateInterface> = {
  getOpenCloseFilter (context) : boolean {
    return context.openCloseFilter
  },

  getFilteredPoint (context) : FilterPoint {
    return context.filteredPoint
  }
}
export default getters
