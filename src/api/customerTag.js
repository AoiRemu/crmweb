import request from '@/utils/request'

export function GetCustomerTagList(id) {
  return request({
    url: `/api/CustomerTag/GetCustomerTagList/${id}`,
    method: 'get'
  })
}

export function Add(params) {
  return request({
    url: `/api/CustomerTag/Add`,
    method: 'post',
    data: params
  })
}

export function UpdateCustomerTags(params) {
  return request({
    url: `/api/CustomerTag/UpdateCustomerTags`,
    method: 'post',
    data: params
  })
}
