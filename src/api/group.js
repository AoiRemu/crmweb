import request from '@/utils/request'

export function GetTableData(params) {
  return request({
    url: '/api/Group/GetTable',
    method: 'get',
    params: params
  })
}

export function GetOptions(params) {
  return request({
    url: '/api/Group/GetOptions',
    method: 'get',
    params: params
  })
}
