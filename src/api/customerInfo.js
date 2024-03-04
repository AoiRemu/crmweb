import request from '@/utils/request'

export function GetInfoDetail(customerId) {
  return request({
    url: `/api/CustomerInfo/GetDetail/${customerId}`,
    method: 'get'
  })
}
