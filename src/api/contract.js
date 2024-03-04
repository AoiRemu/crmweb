import request from '@/utils/request'

export function GetTableData(params) {
  return request({
    url: '/api/Contract/SearchList',
    method: 'post',
    data: params
  })
}

export function GetCustomerContract(id) {
  const params = {
    customerId: id
  }

  return request({
    url: `/api/Contract/SearchList`,
    method: 'post',
    data: params
  })
}

export function Add(params) {
  return request({
    url: `/api/Contract/Add`,
    method: 'post',
    data: params
  })
}

export function Update(params) {
  return request({
    url: `/api/Contract/Update`,
    method: 'put',
    data: params
  })
}

export function GetContractOptions() {
  return request({
    url: `/api/Contract/GetContractOptions`,
    method: 'get'
  })
}

export function GetDetail(id) {
  return request({
    url: `/api/Contract/GetDetail/${id}`,
    method: 'get'
  })
}
