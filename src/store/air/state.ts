import { AirCompanyList, AirPassengers, PasDelete, NameChange } from '../../components/models'

export interface AirInterface {
  airConpanyList: Array<AirCompanyList>;
  actualPage:number;
  openCloseCard:boolean;
  openClosePopup:boolean;
  openCloseCompanies:boolean
  passengers: Array<AirPassengers>,
  passengerActiveCard: AirPassengers,
  passengersDeleteId:string | null,
  deleteData: PasDelete,
  updatingName:NameChange,
  succsessChangeName: boolean
}

function state (): AirInterface {
  return {
    airConpanyList: [
      {
        id: '25',
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
    passengerActiveCard: {
      _id: '',
      name: '',
      trips: 0,
      airline: []
    },
    passengers: [],
    openCloseCard: false,
    openCloseCompanies: false,
    openClosePopup: false,
    actualPage: 0,
    updatingName: {
      id: '0',
      name: ''
    },
    succsessChangeName: false,
    passengersDeleteId: null,
    deleteData: {
      status: null,
      message: ''
    }
  }
}

export default state
