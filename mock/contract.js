const Mock = require('mockjs')

const tableData = Mock.mock({
  'data|100': [{
    id: '@increment(1)',
    'state|1': ['拟定', '谈判', '已签约', '签约失败', '已放款', '审批未通过', '客户退单'],
    ctime: '@datetime',
    amount: '@integer(1000,500000)',
    cost: '@integer(1000,30000)',
    accountName: '@cname',
    signTime: '@datetime'
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
  },
  {
    url: '/api/Contract/GetCustomerContract',
    type: 'get',
    response: config => {
      return {
        data: {
          'data|0-3': [{
            id: '@increment(1)',
            'state|1': ['拟定', '谈判', '已签约', '签约失败', '已放款', '审批未通过', '客户退单'],
            ctime: '@datetime',
            amount: '@integer(1000,500000)',
            cost: '@integer(1000,30000)',
            accountName: '@cname',
            signTime: '@datetime'
          }]
        }
      }
    }
  },
  {
    url: '/api/Contract/Add',
    type: 'post',
    response: config => {
      return {
        data: {
          code: 200,
          message: '操作成功',
          data: ''
        }
      }
    }
  }
]
