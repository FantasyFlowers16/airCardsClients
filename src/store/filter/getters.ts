import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { FilterInterface } from './state'
import { FilteCompanyItem } from '../../components/models'

const getters: GetterTree<FilterInterface, StateInterface> = {
  getOpenCloseFilter (context) : boolean {
    return context.openCloseFilter
  },

  getFilteCompanyItem (context) : Array<FilteCompanyItem> {
    return context.filterCompanies
  }
}
export default getters
