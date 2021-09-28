export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}
export interface AirCompanyList {
  id:string,
  name:string,
  country:string,
  logo:string,
  slogan:string,
  // eslint-disable-next-line camelcase
  head_quaters:string,
  website:string,
  established:string
}
export interface AirPassengers {
  _id:string,
  name:string,
  airline:Array<AirCompanyList>
}
export interface PasDelete {
  status:boolean|null,
  message:string
}
export interface WetherCurrent {
  dt: number,
  // eslint-disable-next-line camelcase
  sunrise: number,
  sunset:number,
  temp:number,
  // eslint-disable-next-line camelcase
  feels_like: number,
  pressure:number,
  humidity: number,
  // eslint-disable-next-line camelcase
  dew_point:number,
  uvi:number,
  clouds:number,
  visibility:number,
  // eslint-disable-next-line camelcase
  wind_speed: number,
  // eslint-disable-next-line camelcase
  wind_deg: number,
  // eslint-disable-next-line camelcase
  wind_gust: number,
  // eslint-disable-next-line no-use-before-define
  weather: Array<WeatherData>
}

export interface WeatherData {
  id:number,
  main:string,
  description:string,
  icon:string
}

export interface DataWeatherTemp {
  day:number,
  eve:number,
  max:number,
  min:number,
  morn:number,
  night:number
}
export interface DataWeatherWether {
  day:number,
  eve:number,
  max:number,
  min:number,
  morn:number,
  night:number
}
export interface WetherDaysArray {
  description:string,
  icon:string,
  id:number,
  main:string,

}

export interface DataWeatherDays {
  dt: number,
  // eslint-disable-next-line camelcase
  sunrise: number,
  sunset:number,
  temp:DataWeatherTemp,
  // eslint-disable-next-line camelcase
  feels_like: number,
  pressure:number,
  humidity: number,
  // eslint-disable-next-line camelcase
  dew_point:number,
  uvi:number,
  clouds:number,
  visibility:number,
  // eslint-disable-next-line camelcase
  wind_speed: number,
  // eslint-disable-next-line camelcase
  wind_deg: number,
  // eslint-disable-next-line camelcase
  wind_gust: number,
  // eslint-disable-next-line no-use-before-define
  weather: Array<Weather>
}
export interface Weather {
  0: WetherDaysArray,
  // eslint-disable-next-line camelcase
  wind_deg: number,
  // eslint-disable-next-line camelcase
  wind_gust: number,
  // eslint-disable-next-line camelcase
  wind_speed: string,
  // eslint-disable-next-line camelcase
}

export interface DataWeather {
  lat:number,
  lon:number,
  timezone:string,
  // eslint-disable-next-line camelcase
  timezone_offset:number,
  current:WetherCurrent,
  daily :Array<DataWeatherDays>,
}

export interface PointWeather {
  id:number,
  title:string,
  name:string,
  check:boolean,
  lon:number,
  lat:number
}

export interface FilteCompanyItem {
  id: string;
  name:string,
  check: boolean;
}

export interface FilterPoint {
  company: string;
  namePas:string
}
