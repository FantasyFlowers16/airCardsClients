import { FilterPoint } from '../../components/models'

export interface FilterInterface {
  openCloseFilter:boolean,
  filteredPoint:FilterPoint,
}

function state (): FilterInterface {
  return {
    openCloseFilter: false,
    filteredPoint: {
      company: '',
      namePas: '',
      country: ''
    }
  }
}

export default state
