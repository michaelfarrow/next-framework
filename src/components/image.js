import React from 'react'
import PropTypes from 'prop-types'

export default class Image extends React.Component {

  render () {
    const { src = '', ...props } = this.props
    let _src = src
    if (!src.match(/^\//) && !src.match(/^https?:\/\//)) {
      _src = `/static/img/remote/${src}`
    }
    return (
      <img src={_src} {...props} />
    )
  }

}
