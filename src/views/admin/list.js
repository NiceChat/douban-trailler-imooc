import React, { Component } from 'react'
import { request } from '../../lib'
import { Table, Tag, Popconfirm, message } from 'antd'
import Layout from '../../layouts/default'
import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')
const site = `http://pax27hr6e.bkt.clouddn.com/`

export default class List extends Component {
  constructor(props) {
    super(props)

    this.state = {
      movie: null,
      columns: [
        {
          title: '海报',
          dataIndex: 'posterKey',
          className: 'center',
          key: 'posterKey',
          width: 150,
          render: posterKey => {
            const url = `${site}${posterKey}`
            return <img width='130' height='180' src={url} />
          }
        },
        {
          title: '标题',
          className: 'center',
          dataIndex: 'title',
          key: 'title',
          width: 150,
        },
        {
          title: '评分',
          className: 'center',
          dataIndex: 'rate',
          key: 'rate',
          width: 150,
        },
        {
          title: '分类',
          className: 'center',
          dataIndex: 'movieTypes',
          key: 'movieTypes',
          width: 150,
          render: movieTypes => {
            return movieTypes.map(element => (<Tag color="#2db7f5">{element}</Tag>))
          }
        },
        {
          title: '上映年份',
          className: 'center',
          dataIndex: 'years',
          width: 150,
          key: 'years',
        },
        {
          title: '标签',
          className: 'center',
          dataIndex: 'tags',
          width: 150,
          key: 'tags',
          render: tags => {
            return tags.map(element => (<span>#{element}</span>))
          }
        },
        {
          title: '概况',
          dataIndex: 'summary',
          key: 'summary',
        },
        {
          title: '操作',
          key: 'operation',
          fixed: 'right',
          width: 100,
          render: (text, record) => {
            return (
              <div>
                <a
                  onClick={() => this.detail(record)}
                  href='javascript:;'>详情</a>

                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record)}>
                  <a
                    style={{ color: '#f00', marginLeft: '10px' }}
                    href="javascript:;">删除</a>
                </Popconfirm>
              </div>
            )
          }
        },
      ]
    }
  }

  componentDidMount() {
    this._getAllMovive()
  }

  handleDelete(record) {
    const { _id } = record
    request({
      method: 'delete',
      url: `/api/v0/admin/del/${_id}`
    })
    .then(() => {
      message.success('删除成功!')
      this._getAllMovive()
    })
  }

  detail(record) {
    const { _id } = record
    this.props.history.push(`/detail/${_id}`)
  }

  _getAllMovive = () => {
    request({
      method: 'get',
      url: `/api/v0/admin/movies`,
    })
    .then(data => {
      this.setState({
        movies: data,
        loading: false,
      })
    })
    .catch(() => {
      this.setState({
        movies: [],
        loading: false,
      })
    })
  }


  render() {
    const { movies, columns } = this.state

    if (!movies) return null

    return (
      <Layout {...this.props}>
        <div className='flex-row full'>
          <div className='scroll-y align-self-start'>
            <Table
              rowKey={record => record._id}
              dataSource={movies}
              columns={columns}
              bordered />
          </div>
        </div>
      </Layout>
    )
  }
}