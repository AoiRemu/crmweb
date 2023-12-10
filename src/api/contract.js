import request from '@/utils/request'

export function GetTableData(params) {
  return request({
    url: '/api/Contract/GetTable',
    method: 'get',
    params: params
  })
}

