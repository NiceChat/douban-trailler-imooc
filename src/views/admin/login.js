import React, { Component } from 'react'
import { Card, Form, Icon, Input, Button, Checkbox } from 'antd'
import { request } from '../../lib'
import { Link } from 'react-router-dom'

const FormItem = Form.Item

@Form.create()
export default class Login extends Component {
  constructor(props) {
    super(props)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        request({
          method: 'POST',
          url: '/api/v0/admin/login',
          data: {
            ...values
          }
        })
        .then((res) => {
          localStorage.setItem('user', JSON.stringify(res))
          const { role } = res

          if (role === 'admin') {
            this.props.history.push('/admin/list')
            return
          }

          this.props.history.push(`/`)
        })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Card
        title="欢迎登录管理后台"
        hoverable={false}
        extra={<span>尚未注册,<Link to='/register'>去注册</Link></span>}
        style={{ width: 450, margin: '120px auto 0 auto' }}
      >
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: 'Please input your Email!' },
                { type: 'regexp', RegExp: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, required: true, message: 'Please input correct Email!' },
              ],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>

          <FormItem>
            <Button
              style={{width: '100%'}}
              type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </FormItem>
        </Form>
      </Card>
    )
  }
}