import { DataWeather, PointWeather } from '../../components/models'

export interface WeatherInterface {
  openCloseWeather:boolean,
  dataWeather:DataWeather,
  pointWeather:Array<PointWeather>
}

function state (): WeatherInterface {
  return {
    openCloseWeather: false,
    dataWeather: {
      lat: 0,
      lon: 0,
      timezone: '',
      timezone_offset: 0,
      current: {
        dt: 0,
        sunrise: 0,
        sunset: 0,
        temp: 0,
        feels_like: 0,
        pressure: 0,
        humidity: 0,
        dew_point: 0,
        uvi: 0,
        clouds: 0,
        visibility: 0,
        wind_speed: 0,
        wind_deg: 0,
        wind_gust: 0,
        weather: [
          {
            id: 0,
            main: '',
            description: '',
            icon: ''
          }
        ]
      },
      daily: []
    },
    pointWeather: [
      {
        title: 'Томск',
        check: false,
        name: 'Tomsk',
        lon: 82.5,
        lat: 58.5,
        id: 1
      },
      {
        title: 'Кемерово',
        name: 'Kemerovo',
        check: false,
        lon: 86.0833,
        lat: 55.3333,
        id: 2
      },
      {
        title: 'Новосибирск',
        check: true,
        lon: 82.9344,
        name: 'Novosibirsk',
        lat: 55.0411,
        id: 3
      },
      {
        title: 'Барнаул',
        check: false,
        name: 'Barnaul',
        lon: 83.7636,
        lat: 53.3606,
        id: 4
      }
    ]
  }
}

export default state
