import axiosClient from './axiosClient'
import { ApiResponse, CurrentUser, GetMyHorseListResponse, MyHorseListParams } from 'models'

const userApi = {
  getCurrentUserInfo(): Promise<ApiResponse<CurrentUser>> {
    const url = '/user/information'
    return axiosClient.get(url)
  },

  getUserHorseList(params: MyHorseListParams): Promise<ApiResponse<GetMyHorseListResponse>> {
    const url = 'user/horses'
    return axiosClient.get(url, { params })
  }
}

export default userApi
