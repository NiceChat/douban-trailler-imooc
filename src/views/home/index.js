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
    const year = getQuery('year')

    this.state = {
      years: ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018'].reverse(),
      type: this.props.match.params.type,
      year,
      movies: [],
      loading: true,
    }
  }

  componentDidMount() {
    this._getAllMovies()
  }


  _getAllMovies = () => {
    const { year } = this.state

    request(window.__LOADING__)({
      method: 'get',
      url: `/api/v0/movies?type=${this.state.type || ''}&year=${year}`,
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
      return "未能找到对应电影"
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
    setQuery('year', key)
  }

  render() {
    const { years, year } = this.state

    return (
      <Layout {...this.props}>
        <div className='flex-row full'>
          <Menu
            mode='inline'
            style={{height: '100%', overflowY: 'scroll', maxWidth: '300px'}}
            onSelect={this._selectItem}
            className='align-self-start'
            defaultSelectedKeys={[year]}>
            {
              years.map((e) => (
                <MenuItem key={e}>
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