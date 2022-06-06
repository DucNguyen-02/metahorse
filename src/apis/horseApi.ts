import axiosClient from './axiosClient'
import {
  ApiResponse,
  GetHorseCareerResponse,
  GetTopParams,
  Horse,
  GetHorseCareerListParams,
  TopHorse,
  TopStable
} from 'models'

const horseApi = {
  getHorseDetail(horseId: string): Promise<ApiResponse<Horse>> {
    const url = `/horse/${horseId}`
    return axiosClient.get(url)
  },

  getTopHorses(params: GetTopParams = {}): Promise<ApiResponse<TopHorse[]>> {
    const url = '/horse/top-horses'
    return axiosClient.get(url, { params })
  },

  getTopStables(params: GetTopParams = {}): Promise<ApiResponse<TopStable[]>> {
    const url = '/horse/top-stables'
    return axiosClient.get(url, { params })
  },

  getHorseCarrerList(params: GetHorseCareerListParams = { horseId: '0' }): Promise<ApiResponse<GetHorseCareerResponse>> {
    const url = `horse/${params.horseId}/career`
    return axiosClient.get(url, { params })
  }
}

export default horseApi
