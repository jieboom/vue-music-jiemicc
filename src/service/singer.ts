import { get } from './base'

// 歌手列表接口
export interface Singer {
    id:number;
    pic:string;
    mid:string;
    name:string;
}
export interface SingerGroup {
   list:Singer[];
   title:string;
}
export type SingerGroupList = SingerGroup[]
export const getSingerList = (params?:Record<string, unknown>):Promise<{singers:SingerGroupList}> => {
  return get<{singers:SingerGroupList}>('/api/getSingerList', params)
}

// 歌手详情接口
export interface Song{
   album:string;
   duration: number;
   id: number;
   mid: string;
   name: string;
   pic:string;
   singer:string;
   url:string;
 }
export const getSingerDetail = (params?:Record<string, unknown>):Promise<{songs:Song[]}> => {
  return get<{songs:Song[]}>('/api/getSingerDetail', params)
}

// 获取歌曲url接口
export interface SongsUrls {
  map:Record<string, string>
}
export const getSongUrls = (params?:Record<string, unknown>):Promise<SongsUrls> => {
  return get<SongsUrls>('/api/getSongsUrl', params)
}
