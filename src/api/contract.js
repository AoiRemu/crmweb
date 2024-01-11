import request from '@/utils/request'

export function GetTableData(params) {
  return request({
    url: '/api/Contract/GetTable',
    method: 'get',
    params: params
  })
}

export function GetCustomerContract(id) {
  return request({
    url: `/api/Contract/GetCustomerContract/${id}`,
    method: 'get'
  })
}

