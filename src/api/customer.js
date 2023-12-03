import request from '@/utils/request'

export function GetTable(params) {
  return request({
    url: '/api/Customer/GetTable',
    method: 'get',
    params: params
  })
}
