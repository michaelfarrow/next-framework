import React from 'react'
import PropTypes from 'prop-types'
import ImageLoader from 'react-load-image'
import LazyLoad from 'react-lazyload'

export default class Image extends React.Component {

  render () {
    const { src, url, dimensions = {}, ...props } = this.props
    const { width, height } = dimensions
    const hasDimesions = width && height
    let _src = src || url || ''
    if (!_src.match(/^\//) && !_src.match(/^https?:\/\//)) {
      _src = `/static/img/remote/${_src}`
    }
    const BackgroundImage = ({src, style = {}, ...props} = {}) => <span className='img' style={{backgroundImage: `url(${_src})`, display: 'block', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundPosition: 'center', backgroundSize: 'cover'}} />
    const image = (
    <LazyLoad>
      <ImageLoader src={_src}>
        {hasDimesions && <BackgroundImage/> || <img {...props} />}
        <div/>
        <div/>
      </ImageLoader>
    </LazyLoad>
    )

    const inner = hasDimesions
      ? <span style={{display: 'block', position: 'relative', paddingBottom: `${height / width * 100}%`}}>{image}</span>
      : image
    return (
      <span style={{display: 'block'}} className='image-wrapper'>{inner}</span>
    )
  }

}
