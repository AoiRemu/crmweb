import request from '@/utils/request'

export function GetCustomerTags(customerId) {
  return request({
    url: `/api/Tag/Customer/${customerId}`,
    method: 'get'
  })
}

export function GetTableData() {
  return request({
    url: `/api/Tag/GetTable`,
    method: 'get'
  })
}
