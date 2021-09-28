import { FilteCompanyItem, FilterPoint } from '../../components/models'

export interface FilterInterface {
  openCloseFilter:boolean,
  filterCompanies:Array<FilteCompanyItem>,
  filteredPoint:FilterPoint
}

function state (): FilterInterface {
  return {
    openCloseFilter: false,
    filterCompanies: [],
    filteredPoint: {
      company: '',
      namePas: ''
    }
  }
}

export default state
