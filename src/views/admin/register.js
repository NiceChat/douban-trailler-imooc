import React, { Component } from 'react'
import { Card, Form, Icon, Input, Button, message } from 'antd'
import { request } from '../../lib'
import { Link } from 'react-router-dom'

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
        .then(() => {
          message.success('恭喜你注册成功， 2s后跳转登录')

          setTimeout(() => {
            this.props.history.push('/login')
          }, 2000)
        })
      }
    })
  }

  checkEmail = (rule, value, callback) => {
    const errors = []
    if(!value) {
      errors.push(new Error('Please in your Email'))
    } else {
      if(!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) {
        errors.push(new Error(`${value} is not a email`))
      }
    }

    callback(errors)
  }

  checkPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    }

    callback()
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Card
        title="欢迎注册"
        hoverable={false}
        extra={<span>已有账号,<Link to='/login'>去登录</Link></span>}
        style={{ width: 450, margin: '120px auto 0 auto' }}
      >

        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('email', {
              rules: [
                { validator: this.checkEmail },
              ],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your UserName!' }],
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
              rules: [
                { required: true, message: 'Please comfirm your password!' },
                { validator: this.checkPassword, required: false },
              ],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="ConfirmPassword" />
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