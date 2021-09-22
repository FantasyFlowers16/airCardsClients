export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}
export interface AirCompanyList {
  id:number,
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
