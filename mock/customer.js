const Mock = require('mockjs')
const Global = require('@/utils/global')

const tableData = Mock.mock({
  'data|100': [{
    id: '@increment(1)',
    name: '@cname',
    'follow_state|1': ['新入库', '产生意向', '可跟进客户', '邀约上门', '合作客户'],
    ctime: '@datetime',
    phone: '@integer(13100000000, 13199999999)',
    address: '@county(true)',
    county: '@county(true)',
    email: '@email',
    follow_account: '@cname',
    level: '@integer(1,5)',
    state: '@integer(1,3)',
    groupId: '@integer(1,4)'
  }]
})

module.exports = [
  {
    url: '/api/Customer/GetTable',
    type: 'get',
    response: config => {
      let data = tableData.data
      const queryForm = config.query
      console.log(queryForm.groupId)
      if (queryForm.groupId) {
        queryForm.groupId = +queryForm.groupId
        data = data.filter(ele => ele.groupId === queryForm.groupId)
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
    url: '/api/Customer/[1-9]+',
    type: 'get',
    response: config => {
      return {
        'data': {
          id: '@increment(1)',
          name: '@cname',
          level: '@integer(1,5)',
          'follow_state|1': '@integer(1,5)',
          'follow_state_desc|1': ['新入库', '产生意向', '可跟进客户', '邀约上门', '合作客户'],
          ctime: '@datetime',
          phone: '@integer(13100000000, 13199999999)',
          address: '@county(true)',
          county: '@county(true)',
          email: '@email',
          follow_account: '@cname',
          'gender|1': ['unknown', 'male', 'female'],
          birthday: '@datetime',
          'source|1': ['未知', '员工推广', '直接输入', '外部链接', '微信'],
          group: '',
          position: '',
          wechat: '',
          qq: '',
          telphone: '',
          industry: '',
          workAddress: '@county(true)',
          netAddress: '',
          description: ''
        }
      }
    }
  },
  {
    url: '/api/Tag/Customer/[1-9]+',
    type: 'get',
    response: config => {
      return {
        'data|0-10': [{
          id: '@increment(1)',
          name: '@cname'
        }]
      }
    }
  },
  {
    url: '/api/Follow/Step',
    type: 'get',
    response: config => {
      const { FollowStep } = Global
      const result = Mock.mock({
        'data': FollowStep
      })
      return result
    }
  },
  {
    url: '/api/Follow/Customer/[1-9]+',
    type: 'get',
    response: config => {
      const result = Mock.mock({
        'data': {
          'data|10': [{
            'id': '@increment(1) ',
            'message': '@cparagraph(1,3)',
            'ctime': '@datetime',
            'account': '@cname'
          }],
          'total': '@integer(1,50)'
        }
      })
      return result
    }
  },
  {
    url: '/api/Tag/GetTable',
    type: 'get',
    response: config => {
      return {
        data: Mock.mock({
          total: '@integer(10,50)',
          'data|10': [{
            id: '@increment(1)',
            name: '@cword(5,10)',
            ctime: '@datetime'
          }]
        })
      }
    }
  },
  {
    url: '/api/Group/GetOptions',
    type: 'get',
    response: config => {
      return {
        data: Mock.mock({
          total: 4,
          data: [{
            id: 1,
            name: 'A类客户',
            ctime: '@datetime'
          },
          {
            id: 2,
            name: 'B类客户',
            ctime: '@datetime'
          },
          {
            id: 3,
            name: 'C类客户',
            ctime: '@datetime'
          },
          {
            id: 4,
            name: 'D类客户',
            ctime: '@datetime'
          }]
        })
      }
    }
  },
  {
    url: '/api/Group/GetTable',
    type: 'get',
    response: config => {
      return {
        data: Mock.mock({
          total: 4,
          data: [{
            id: 1,
            name: 'A类客户',
            ctime: '@datetime'
          },
          {
            id: 2,
            name: 'B类客户',
            ctime: '@datetime'
          },
          {
            id: 3,
            name: 'C类客户',
            ctime: '@datetime'
          },
          {
            id: 4,
            name: 'D类客户',
            ctime: '@datetime'
          }]
        })
      }
    }
  }
]
