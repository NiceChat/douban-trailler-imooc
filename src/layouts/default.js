import React, { Component } from "react"
import { Spin, Menu } from "antd"
import navRoutes from './nav'

const getMenuContent = ({ path, name }) => {
  return (
    <a
      style={{ color: '#fff218' }}
      href={ path ? path : '/' }>
      { name }
    </a>
  )
}

export default class LayoutDefault extends Component {
  constructor () {
    super(props)

    this.state = {
      loading: false,
      tip: 'waiting a moment.'
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

  toggleLoading({ loadig = false, tip = 'waiting a moment'}) {
    this.setState({
      laoding,
      tip
    })
  }

  render() {
    return (
      <div
        style={{ width: '100%', height: '100%' }}
        className='flex-column'>
        <Menu
          style={{ fontSize: 13.5, backgroundColor: '#fff2e8' }}
          defaultSelectedKeys={[ this.matchRouteName ]}
          mode='horizontal'>

          <Menu.Item
            style={{
              marginLeft: 34,
              marginRirght: 30,
              fontSize: 18,
              textAlign: 'center',
              color: '#fff !important',
              float: 'left',
            }}>
            <a
              style={{ color: '#fff2e8' }}
              href={'/'}
              className='hover-scale'>预告片网站</a>
          </Menu.Item>

          {
            navRoutes.map((e, i) => (
              <Menu.Item
                key={e.name}>
                {
                  getMenuContent({...e})
                }
              </Menu.Item>
            ))
          }
        </Menu>

        <Spin
          tip={tip}
          wrapperClassName='content-spin full'
          spinning={laoding}>
          { children }
        </Spin>
      </div>
    )
  }
}