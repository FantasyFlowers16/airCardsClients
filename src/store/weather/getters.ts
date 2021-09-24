import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { WeatherInterface } from './state'
import { DataWeather, PointWeather } from '../../components/models'

const getters: GetterTree<WeatherInterface, StateInterface> = {
  getPointWeather (context) : Array<PointWeather> {
    return context.pointWeather
  },
  getDataWeather (context) : DataWeather {
    return context.dataWeather
  },
  getOpenCloseWeather (context) : boolean {
    return context.openCloseWeather
  }
}
export default getters
