import React from 'react'

export default class Embed extends React.Component {

  render () {
    const { width: oembedWidth, height: oembedHeight } = this.props
    const hasDimesions = oembedWidth && oembedHeight
    const embedProps = Object.assign({
      'data-oembed': this.props.embed_url,
      'data-oembed-type': this.props.type,
      'data-oembed-provider': this.props.provider_name
    }) // , element.label ? {className: element.label} : {}
    const wrapperInner = {display: 'block'}
    const embed = <span className='embed--inner' style={{display: 'block', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}} dangerouslySetInnerHTML={{__html: this.props.html}} />
    const inner = <span style={{display: 'block', position: 'relative', paddingTop: `${(hasDimesions ? oembedHeight / oembedWidth : 9 / 16) * 100}%`}}>{embed}</span>
    return (
      <span style={{display: 'block'}} {...embedProps}>{inner}</span>
    )
  }

}
