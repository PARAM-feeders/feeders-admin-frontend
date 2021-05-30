import React from 'react'
import {
  Content,
  Footer,
  HeaderComponent
} from './index'

const Layout = () => {

  return (
    <div className="c-app c-default-layout">
      <div className="c-wrapper">
        <HeaderComponent/>
        <div className="c-body">
          <Content/>
        </div>
        <Footer/>
      </div>
    </div>
  )
}

export default Layout
