import { FilteCompanyItem } from '../../components/models'

export interface FilterInterface {
  openCloseFilter:boolean,
  filterCompanies:Array<FilteCompanyItem>
}

function state (): FilterInterface {
  return {
    openCloseFilter: false,
    filterCompanies: []
  }
}

export default state
