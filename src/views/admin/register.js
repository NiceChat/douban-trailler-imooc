import React, { Component } from 'react'
import { Card, Form, Icon, Input, Button, Checkbox } from 'antd'
import { request } from '../../lib'

const FormItem = Form.Item

@Form.create()
export default class Registter extends Component {
  constructor(props) {
    super(props)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        request({
          method: 'POST',
          url: '/api/v0/admin/register',
          data: {
            ...values
          }
        })
        .then((res) => {
          this.props.history.push('/admin/login')
        })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Card
        title="欢迎注册"
        hoverable={false}
        style={{ width: 450, margin: '120px auto 0 auto' }}
      >
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('Email', {
              rules: [{ required: true, message: 'Please input your Email!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your UseerName!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
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
            {getFieldDecorator('confirmPassword', {
              rules: [{ required: true, message: 'Please comfirm your password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="checkPassword" />
            )}
          </FormItem>

          <FormItem>
            <Button
              style={{width: '100%'}}
              type="primary" htmlType="submit" className="login-form-button">
              立即注册
            </Button>
          </FormItem>
        </Form>
      </Card>
    )
  }
}