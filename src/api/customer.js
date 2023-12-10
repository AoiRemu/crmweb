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
    url: `/api/Customer/${id}`,
    method: 'get'
  })
}
