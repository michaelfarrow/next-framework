import React from 'react'
import PropTypes from 'prop-types'

export default class Image extends React.Component {

  render () {
    const { src, url, dimensions = {}, ...props } = this.props
    const { width, height } = dimensions
    const hasDimesions = width && height
    let _src = src || url || ''
    if (!_src.match(/^\//) && !_src.match(/^https?:\/\//)) {
      _src = `/static/img/remote/${_src}`
    }
    const image = hasDimesions
      ? <span style={{backgroundImage: `url(${_src})`, display: 'block', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundPosition: 'center', backgroundSize: 'cover'}} />
      : <img src={_src} {...props} />

    const inner = hasDimesions
      ? <span style={{display: 'block', position: 'relative', paddingTop: `${height / width * 100}%`}}>{image}</span>
      : image
    return (
      <span style={{display: 'block'}} className='image-wrapper'>{inner}</span>
    )
  }

}
