import React from 'react'
import RichText from 'components/rich-text'

export default class PageTemplate extends React.Component {

  render () {
    const { uid } = this.props
    const { data = {} } = this.props
    const { title, text, embed } = data
    return (
      <div>
        <div className='page--header'>
          {title && <RichText value={title} />}
        </div>
        <div className='page--body'>
          {text && <RichText value={text} />}
        </div>
      </div>
    )
  }

}
