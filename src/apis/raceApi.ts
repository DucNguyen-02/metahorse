import axiosClient from './axiosClient'
import { ApiResponse, GetRaceListParams, GetRaceListResponse, JoinRaceBody, Race, RaceResult } from 'models'

const raceApi = {
  getRaceList(params?: GetRaceListParams): Promise<ApiResponse<GetRaceListResponse>> {
    const url = '/races'
    return axiosClient.get(url, { params })
  },

  getRace(raceId: number): Promise<ApiResponse<Race>> {
    const url = `/races/${raceId}`
    return axiosClient.get(url)
  },

  joinRace(raceId: number, body: JoinRaceBody): Promise<ApiResponse<string>> {
    const url = `/races/${raceId}/enter`
    return axiosClient.post(url, body)
  },

  getRaceResult(raceId: number): Promise<ApiResponse<RaceResult>> {
    const url = `/races/${raceId}/result`
    return axiosClient.get(url)
  }
}

export default raceApi
