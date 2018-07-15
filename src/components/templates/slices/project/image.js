import React from 'react'
import RichText from 'components/rich-text'

export default class ImageSlice extends React.Component {

  render () {
    const { image, caption } = this.props
    return (
      <div>
        {image && <img src={image.url} />}
        {caption && (
         <div>
           <RichText value={caption} />
         </div>
         )}
      </div>
    )
  }

}
