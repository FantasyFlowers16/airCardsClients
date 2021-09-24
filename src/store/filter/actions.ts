import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { FilterInterface } from './state'
// import Axios from 'axios'
import { FilteCompanyItem } from '../../components/models'

const actions: ActionTree<FilterInterface, StateInterface> = {
  updateOpenCloseFilter (context, payload: boolean): void {
    context.commit('changeOpenCloseFilter', payload)
  },

  updateFilteCompanyItem  (context, payload: Array<FilteCompanyItem>): void {
    context.commit('changeFilteCompanyItem', payload)
  }
}

export default actions
