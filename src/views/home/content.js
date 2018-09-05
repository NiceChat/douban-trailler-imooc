import React, { Component } from 'react'
import { Icon, Card, Row, Col, Badge, Modal, Spin } from 'antd'
import moment from 'moment'
import { Link } from 'react-router-dom'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')
const Meta = Card.Meta
const site = `http://pax27hr6e.bkt.clouddn.com/`

export default class Home extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    visible: false,
  }

  _renderContent = () => {
    const { movies, loading } = this.props
    const { visible } = this.state

    return (
      <div style={{ padding: '10px'}}>
        <Row>
          {
            movies.map((it, i) => (
              <Col
                xl={{span: 6}}
                lg={{span: 8}}
                md={{span: 12}}
                sm={{span: 24}}
                style={{ padding: '8px'}}
                key={i}>
                <Card
                  loading={loading}
                  className='ant-card__home'
                  bordered={false}
                  hoverable={false}
                  style={{ width: '100%' }}
                  actions={[
                    <Badge>
                      <Icon
                        style={{marginRight: '2px'}}
                        type='clock-circle-o'>
                      </Icon>
                      {moment(it.meta.createTime).fromNow(true)}前更新
                    </Badge>,
                    <Badge>
                      <Icon style={{marginRight: '2px'}}
                        type='heart-o'>
                      </Icon>
                      {it.rate}分
                    </Badge>
                  ]}
                  cover={<img
                    onClick={ () => this._showModal(it)}
                    src={site + it.posterKey +'?imageMogr2/thumbnail/x1680/crop/1080x1600'}/>}>
                    <Meta
                      style={{height: '202px', overflow: 'hidden'}}
                      title={<Link to={`/detail/${it._id}`}>{it.title}</Link>}
                      description={<Link to={`/detail/${it._id}`}>{it.summary}</Link>}/>
                </Card>
              </Col>
            ))
          }
        </Row>
        <Modal
          visible={visible}
          afterClose={this._handleClose}
          onCancel={this._handleCancel}
          footer={null}
        >
          <Spin></Spin>
        </Modal>
      </div>
    )
  }

  _handleCancel = () => {
    if (this.palyer && this.player.pause) {
      this.player.pause()
    }

    this.setState({
      visible: false
    })
  }

  _handleClose = () => {
    this.setState({
      visible: false
    })
  }

  _showModal = (movie) => {
    this.setState({
      visible: true
    })

    const { video, coverKey } = movie
    const thumb = `${site}${coverKey}`

    if (!this.player) {
      setTimeout(() => {
        this.player = new DPlayer({
          container: document.getElementsByClassName('ant-modal')[0],
          screenshot: true,
          autoplay: true,
          video: {
            url: video,
            pic: thumb,
            thumbnails: thumb
          },
        })
        this.player.play()
      }, 500)
    } else {
      this.player.switchVideo({
        url: video,
        pic: thumb,
        type: 'auto',
      })
      this.player.play()
    }
  }

  render() {
    return (
      <div style={{ padding: 10 }}>
        {this._renderContent()}
      </div>
    )
  }
}