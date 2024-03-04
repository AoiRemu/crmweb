import request, { BaseURL } from '@/utils/request'

export function GetTable(params) {
  return request({
    url: '/api/CustomerMain/SearchList',
    method: 'post',
    data: params
  })
}

export function Add(params) {
  return request({
    url: `/api/CustomerMain/Add`,
    method: 'post',
    data: params
  })
}

export function Update(params) {
  return request({
    url: `/api/CustomerMain/Update`,
    method: 'put',
    data: params
  })
}

export function GetDetail(id) {
  return request({
    url: `/api/CustomerMain/GetDetail/${id}`,
    method: 'get'
  })
}

export function UpdateStar(params) {
  return request({
    url: `/api/CustomerMain/UpdateStar`,
    method: 'put',
    data: params
  })
}

export function GiveUp(id) {
  return request({
    url: `/api/CustomerMain/GiveUp/${id}`,
    method: 'put'
  })
}

export function Allot(id) {
  return request({
    url: `/api/CustomerMain/Allot/${id}`,
    method: 'put'
  })
}

/**
 * 获取跟进状态步骤
 * @returns
 */
export function GetFollowStep() {
  return request({
    url: `/api/CustomerMain/GetFollowStateStep`,
    method: 'get'
  })
}

export function UpdateFollowState(id, followState) {
  return request({
    url: `/api/CustomerMain/UpdateFollowState/${id}/${followState}`,
    method: 'put'
  })
}

export function BatchUpdateGroup(params) {
  return request({
    url: `/api/CustomerMain/BatchUpdateGroup`,
    method: 'put',
    data: params
  })
}

export const UploadUrl = BaseURL + `/api/CustomerMain/ImportCustomers`
