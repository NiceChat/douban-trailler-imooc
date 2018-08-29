import React, { Component } from 'react'
import Layout from '../../layouts/default'
import { Menu } from 'antd'
import MenuItem from 'antd/lib/menu/MenuItem'
import { request, query } from '../../lib'
import Content from './content'

export default class Home extends Component {
  constructor(props) {
    super(props)
    const { getQuery } = query

    this.state = {
      years: ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018'].reverse(),
      type: this.props.match.params.type,
      year: getQuery('year') ,
      movies: [],
      loading: true,
    }
  }

  componentDidMount() {
    this._getAllMovies()
  }

  componentWillReceiveProps(prevProps) {
    if (this.props !== prevProps) {
      console.log('diffcult')
    }
  }

  _getAllMovies = () => {
    const { getQuery } = query
    request(window.__LOADING__)({
      method: 'get',
      url: `/api/v0/movies?type=${this.state.type || ''}&year=${getQuery('year')}`,
    })
    .then(res => {
      this.setState({
        movies: res,
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

  _renderContent = () => {
    const { movies, loading } = this.state

    if (!movies || !movies.length) {
      return null
    }

    return (
      <Content
        loading={loading}
        movies={movies}>
      </Content>
    )
  }

  _selectItem = ({ key }) => {
    const { setQuery } = query
    this.setState({
      selectedKey: key
    })

    const { years } = this.state
    setQuery('year', years[key])
  }

  render() {
    const { years, selectedKey } = this.state

    return (
      <Layout {...this.props}>
        <div className='flex-row full'>
          <Menu
            mode='inline'
            style={{height: '100%', overflowY: 'scroll', maxWidth: '300px'}}
            onSelect={this._selectItem}
            className='align-self-start'
            defaultSelectedKeys={[selectedKey]}>
            {
              years.map((e, i) => (
                <MenuItem key={i}>
                  <span>{ e }年上映</span>
                </MenuItem>
              ))
            }
          </Menu>

          <div className='flex-1 scroll-y align-self-start'>
            { this._renderContent()}
          </div>
        </div>
      </Layout>
    )
  }
}