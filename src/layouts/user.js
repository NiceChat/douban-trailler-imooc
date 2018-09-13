import React, { Component } from 'react'
import { message, Menu, Dropdown } from 'antd'
import { Link } from 'react-router-dom'
import { request } from '../lib'

export default class Detail extends Component {
  constructor(props) {
    super(props)
  }

  handleMenuClick() {
    request({
      method: 'post',
      url: '/api/v0/admin/logout',
    })
    .then(res => {
      message.success('成功退出')
      localStorage.clear('user')
      window.location.href = window.location.origin + '/moives'
    })
  }

  render() {
    const { user } = this.props

    if (!user) {
      return (
        <Link
          style={{ color: '#fff', fontSize: '12px' }}
          to='/register'>请注册</Link>
      )
    }

    const menu = (
      <Menu
        style={{ width: '100px', }}
        onClick={this.handleMenuClick}>
        <Menu.Item key="1">退出</Menu.Item>
      </Menu>
    )

    return (
      <div>
        <Dropdown overlay={menu}>
          <div>
          Hi,<span>{user.username}</span>
          </div>
        </Dropdown>
      </div>
    )
  }
}