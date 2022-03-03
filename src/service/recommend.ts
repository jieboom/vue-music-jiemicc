import { get } from './base'
export interface Albums {
    id:number;
    pic:string;
    title:string;
    username:string;
}
export interface Sliders {
    id:number;
    link:string;
    pic:string;
}
interface Recommned {
   albums:Albums[];
   sliders:Sliders[];
}
export const getRecommned = (params?:Record<string, unknown>):Promise<Recommned> => {
  return get<Recommned>('/api/getRecommend', params)
}
