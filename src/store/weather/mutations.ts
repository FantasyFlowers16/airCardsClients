import { MutationTree } from 'vuex'
import { WeatherInterface } from './state'
import { DataWeather, PointWeather } from '../../components/models'

const mutation: MutationTree<WeatherInterface> = {

  changeDataWeather (state: WeatherInterface, payload: DataWeather):void {
    state.dataWeather = payload
  },
  changePointWeather (state: WeatherInterface, payload: Array<PointWeather>):void {
    state.pointWeather = payload
  },

  changeOpenCloseWeather (state: WeatherInterface, payload: boolean):void {
    state.openCloseWeather = payload
  }
}

export default mutation
