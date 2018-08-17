import React, { Component } from 'react'
import { Icon, Card, Row, Col, Badge } from 'antd'
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

  _renderContent = () => {
    const { movies } = this.props

    return (
      <div style={{ padding: '30px'}}>
        <Row>
          {
            movies.map((it, i) => (
              <Col
                xl={{span: 6}}
                lg={{span: 8}}
                md={{span: 12}}
                sm={{span: 24}}
                style={{marginBottom: '8px'}}
                key={i}>
                <Card
                  bordered={false}
                  hoverable
                  style={{ width: '100%'}}
                  actions={[
                    <Badge>
                      <Icon
                        style={{marginRight: '2px'}}
                        type='clocl-circle'>
                      </Icon>
                      {moment(it.meta.createAt).fromNow(true)}前更新
                    </Badge>,
                    <Badge>
                      <Icon style={{marginRight: '2px'}}
                        type='clocl-circle'>
                      </Icon>
                      {it.rate}分
                    </Badge>
                  ]}
                  cover={<img src={site + it.posterKey +'?imageMogr2/thumbnail/x1680/crop/1080x1600'}/>}>
                    <Meta
                      style={{height: '202px', overflow: 'hidden'}}
                      title={<Link to={`/detail/${it._id}`}>{it.title}</Link>}
                      description={<Link to={`/detail/${it._id}`}>{it.summary}</Link>}/>
                </Card>
              </Col>
            ))
          }
        </Row>
      </div>
    )
  }

  render() {
    return (
      <div style={{ padding: 10 }}>
        {this._renderContent()}
      </div>
    )
  }
}