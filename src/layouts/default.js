import React, { Component } from "react"
import { Spin, Menu } from "antd"
import navRoutes from '../nav'
import User from './user'

const getMenuContent = ({ path, name }) => {
  const search = window.location.search

  return (
    <a
      style={{ color: '#fff' }}
      href={ path ? `${path}${search}` : `/${search}` }>
      { name }
    </a>
  )
}

export default class LayoutDefault extends Component {
  constructor (props) {
    super(props)

    const userStr = localStorage.getItem('user')

    this.state = {
      loading: false,
      tip: 'waiting a moment.',
      user: JSON.parse(userStr)
    }
  }

  componentDidMount() {
    window.__LOADING__ = this.toggleLoading
  }

  componentWillUnmount() {
    window.__LOADING__ = null
  }

  matchRouteName = this.props.match
    ? navRoutes.find(e => e.name === this.props.match.params.type)
      ? navRoutes.find(e => e.name === this.props.match.params.type).name
      : '全部'
    : navRoutes[0].name

  toggleLoading = ({ loadig = false, tip = 'waiting a moment'}) => {
    this.setState({
      loadig,
      tip
    })
  }

  render() {
    const { children } = this.props
    const { tip, loading, user } = this.state

    return (
      <div
        style={{ width: '100%', height: '100%' }}
        className='flex-column'>
        <Menu
          style={{ fontSize: 13.5, backgroundColor: 'rgb(25, 25, 19)' }}
          defaultSelectedKeys={[ this.matchRouteName ]}
          mode='horizontal'>

          <Menu.Item
            style={{
              marginLeft: 34,
              marginRirght: 30,
              fontSize: 18,
              textAlign: 'center',
              float: 'left',
            }}>
            <a
              style={{ color: '#fff' }}
              href={'/'}
              className='hover-scale'>Moives</a>
          </Menu.Item>

          {
            navRoutes.map((e, i) => (
              <Menu.Item
                style={{
                  marginLeft: 10,
                  marginRirght: 10,
                  fontSize: 14,
                  color: '#fff',
                  textAlign: 'center',
                  float: 'left',
                }}
                key={e.name}>
                {
                  getMenuContent({...e})
                }
              </Menu.Item>
            ))
          }

          <Menu.Item
            style={{
              marginLeft: 10,
              marginRirght: 10,
              fontSize: 14,
              color: '#fff',
              textAlign: 'center',
              float: 'right',
            }}>
            <User user={user}/>
          </Menu.Item>
        </Menu>

        <Spin
          tip={tip}
          wrapperClassName='content-spin full'
          spinning={loading}>
          { children }
        </Spin>
      </div>
    )
  }
}