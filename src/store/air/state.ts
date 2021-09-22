import { AirCompanyList, AirPassengers, PasDelete } from '../../components/models'

export interface AirInterface {
  airConpanyList: Array<AirCompanyList>;
  actualPage:number;
  openCloseCard:boolean;
  openClosePopup:boolean;
  passengers: Array<AirPassengers>,
  passengersActual: Array<AirPassengers>,
  passengersDeleteId:string | null,
  deleteData: PasDelete
}

function state (): AirInterface {
  return {
    airConpanyList: [
      {
        id: 25,
        name: 'string',
        country: 'string',
        logo: 'string',
        slogan: 'string',
        // eslint-disable-next-line camelcase
        head_quaters: 'string',
        website: 'string',
        established: 'string'
      }
    ],
    passengers: [],
    passengersActual: [],
    openCloseCard: false,
    openClosePopup: false,
    actualPage: 0,
    passengersDeleteId: null,
    deleteData: {
      status: null,
      message: ''
    }
  }
}

export default state
