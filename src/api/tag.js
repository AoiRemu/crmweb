import request from '@/utils/request'

export function GetCustomerTags(customerId) {
  return request({
    url: `/api/Tag/Customer/${customerId}`,
    method: 'get'
  })
}

export function GetTableData(params) {
  return request({
    url: `/api/Tag/SearchList`,
    method: 'post',
    data: params
  })
}

export function Add(params) {
  return request({
    url: `/api/Tag/Add`,
    method: 'post',
    data: params
  })
}

export function Update(params) {
  return request({
    url: `/api/Tag/Update`,
    method: 'put',
    data: params
  })
}
