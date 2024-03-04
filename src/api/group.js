import request from '@/utils/request'

export function GetTableData(params) {
  return request({
    url: '/api/CustomerGroup/SearchList',
    method: 'post',
    data: params
  })
}

export function GetOptions(params) {
  return request({
    url: '/api/CustomerGroup/GetOptions',
    method: 'post',
    data: params
  })
}

export function Add(params) {
  return request({
    url: '/api/CustomerGroup/Add',
    method: 'post',
    data: params
  })
}

export function Update(params) {
  return request({
    url: '/api/CustomerGroup/Update',
    method: 'put',
    data: params
  })
}

export function Delete(id) {
  return request({
    url: `/api/CustomerGroup/Delete/${id}`,
    method: 'delete'
  })
}
