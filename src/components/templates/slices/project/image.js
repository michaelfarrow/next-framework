import React from 'react'
import RichText from 'components/rich-text'
import Image from 'components/image'

export default class ImageSlice extends React.Component {

  render () {
    const { image, caption } = this.props
    return (
      <div>
        {image && <Image {...image} />}
        {caption && (
         <div>
           <RichText value={caption} />
         </div>
         )}
      </div>
    )
  }

}
