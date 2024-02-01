import request from '@/utils/request'

export function GetTable(params) {
  return request({
    url: '/api/Customer/GetTable',
    method: 'get',
    params: params
  })
}

export function GetDetail(id) {
  return request({
    url: `/api/Customer/GetDetail/${id}`,
    method: 'get'
  })
}

export function UpdateStar(id, params) {
  return request({
    url: `/api/Customer/UpdateStar/${id}`,
    method: 'post',
    data: params
  })
}
