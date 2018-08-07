import React from 'react'
import { Route, Switch } from 'react-router-dom'
import routes from './routes'
import 'antd/dist/antd.css'
import './assets/common.scss'

export default () => (
  <Switch>
    {
      routes.map(({ name, path, exact = true, component }) => {
        return (
          <Route 
            path={path}
            key={name}
            exact={exact}
            component={component}
          />
        )
      })
    } 
  </Switch>
)