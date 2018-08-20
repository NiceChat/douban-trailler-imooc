import React, { Component } from 'react'
import { request } from '../../lib'
import { Badge, Tabs, Spin } from 'antd'
import { Link } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/zh-cn'

const TabPane = Tabs.TabPane
moment.locale('zh-cn')
const site = `http://pax27hr6e.bkt.clouddn.com/`
export default class Detail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      movie: null,
      relativeMovies: [],
    }
  }

  componentDidMount() {
    this._getMovieDetail()
  }

  // componentDidUpdate() {
  //   this._getMovieDetail()
  // }

  _getMovieDetail = () => {
    request({
      method: 'get',
      url: `/api/v0/movies/${this.props.match.params.id}`,
    })
    .then(res => {
      const { movie, relativeMovies } = res
      const { video, coverKey } = movie
      const thumb = `${site}${coverKey}`

      this.setState({
        movie,
        relativeMovies,
      }, () => {
        if (!this.player) {
          setTimeout(() => {
            this.player = new DPlayer({
              container: document.getElementById('videoPlayer'),
              screenshot: true,
              video: {
                url: video,
                pic: thumb,
                thumbnails: thumb
              },
            })
          }, 500)
        }
      })
    })
    .catch(() => {
      this.setState({
        movie: null,
        relativeMovies: [],
      })
    })
  }

  _switchTab = () => {
    console.log('test')
  }

  render() {
    const { movie, relativeMovies } = this.state

    if (!movie) return null

    return (
      <div className='flex-row full'>
        <div className='page-shade'>
          <div className='video-wrapper'>
            <div
              data-src={site + movie.coverKey}
              data-video={movie.video}
              id='videoPlayer'>
              <Spin size="large" />
            </div>
          </div>
          <div className='video-sidebar'>
            <Link className='homeLink' to={'/'}>返回首页</Link>
            <Tabs defaultActiveKey="1">
              <TabPane tab="关于本篇" key="1">
                <h1>{ movie.title }</h1>
                <dl>
                  <dt>
                    豆瓣评分:
                    <Badge
                      style={{ backgroundColor: '#52c41a' }}
                      count={`${movie.rate}分`}></Badge>
                  </dt>
                  <dt>
                    电影分类: { movie.tags && movie.tags.join(' ')}
                  </dt>
                  <dt>
                  </dt>
                  <dd>
                    { movie.summary }
                  </dd>
                </dl>
              </TabPane>
              <TabPane tab="同类电影" key="2">
                {
                  relativeMovies.map(item => (
                    <Link
                      className='media'
                      to={`/detail/${item._id}`}
                      key={item._id}>
                      <img
                        width='60'
                        className='align-self-center mr-3'
                        src={site + item.posterKey}
                        />
                      <div className='media-body'>
                        <h6 className='media-title'>{item.title}</h6>
                        <p className='media-summary'>{item.publicDate}</p>
                      </div>
                    </Link>
                  ))
                }
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}