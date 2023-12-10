import request from '@/utils/request'

export function GetFollowStep() {
  return request({
    url: `/api/Follow/Step`,
    method: 'get'
  })
}

export function GetFollowTableData(customerId) {
  return request({
    url: `/api/Follow/Customer/${customerId}`,
    method: 'get'
  })
}
