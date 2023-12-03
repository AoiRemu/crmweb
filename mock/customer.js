const Mock = require('mockjs')

const tableData = Mock.mock({
  'data|100': [{
    id: '@id',
    name: '@cname',
    'follow_state|1': ['新入库', '产生意向', '可跟进客户', '邀约上门', '合作客户'],
    ctime: '@datetime',
    phone: '@integer(13100000000, 13199999999)',
    address: '@county(true)',
    county: '@county(true)',
    email: '@email',
    follow_account: '@cname'
  }]
})

module.exports = [
  {
    url: '/api/Customer/GetTable',
    type: 'get',
    response: config => {
      const data = tableData.data
      const queryForm = config.query
      const pageSize = +queryForm.pageSize
      const pageIndex = +queryForm.pageIndex
      const result = data.slice(pageSize * (pageIndex - 1), pageSize * pageIndex)
      return {
        data: {
          total: data.length,
          data: result
        }
      }
    }
  }
]
