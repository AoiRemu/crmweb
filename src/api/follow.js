import request from '@/utils/request'

export function GetFollowTableData(customerId) {
  return request({
    url: `/api/FollowUpLog/Customer/${customerId}`,
    method: 'get'
  })
}

export function Add(params) {
  return request({
    url: `/api/FollowUpLog/Add`,
    method: 'post',
    data: params
  })
}
