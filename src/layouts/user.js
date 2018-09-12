import React, { Component } from 'react'
import { Icon, } from 'antd'
import { Link } from 'react-router-dom'

export default class Detail extends Component {
  constructor(props) {
    super(props)
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

    return (
      <div>
        <Icon type="user" theme="filled" />
        <span>{user.name}</span>
      </div>
    )
  }
}