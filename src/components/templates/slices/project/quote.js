import React from 'react'
import RichText from 'components/rich-text'

export default class QuoteSlice extends React.Component {

  render () {
    const { copy, attribution } = this.props
    return (
      <div>
        {copy && (
         <blockquote>
           <RichText value={copy} />
         </blockquote>
         )}
        {attribution && (
         <RichText value={attribution} />
         )}
      </div>
    )
  }

}
