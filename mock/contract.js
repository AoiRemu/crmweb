const Mock = require('mockjs')

const tableData = Mock.mock({
  'data|100': [{
    id: '@increment(1)',
    'state|1': ['拟定', '谈判', '已签约', '签约失败'],
    ctime: '@datetime',
    price: '@integer(1000,500000)',
    cost: '@integer(1000,30000)',
    accountName: '@cname'
  }]
})

module.exports = [
  {
    url: '/api/Contract/GetTable',
    type: 'get',
    response: config => {
      let data = tableData.data
      const queryForm = config.query
      if (queryForm.accountName) {
        data = data.filter(ele => ele.accountName === queryForm.accountName)
      }
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
