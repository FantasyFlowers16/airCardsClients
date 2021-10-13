import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { FilterInterface } from './state'
// import Axios from 'axios'
import { FilterPoint } from '../../components/models'

const actions: ActionTree<FilterInterface, StateInterface> = {
  updateOpenCloseFilter (context, payload: boolean): void {
    context.commit('changeOpenCloseFilter', payload)
  },

  updateFilteredPoint   (context, payload: FilterPoint): void {
    context.commit('changeFilteredPoint', payload)
  }
}

export default actions
