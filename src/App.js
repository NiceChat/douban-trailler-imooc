import React from 'react'
import { Route, Switch } from 'react-router-dom'
import routes from './routes'
import 'antd/dist/antd.css'
import './assets/common.scss'

export default () => (
  <Switch>
    {
      routes.map(route => {
        return (
          <Route 
            path={route.path} 
            key={route.name}
            exact= {true}
            component={route.component}>
          </Route>
        )
      })
    } 
  </Switch>
)