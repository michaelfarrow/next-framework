import React from 'react'
import Head from 'next/head'
import Title from 'components/title'
import RichText from 'components/rich-text'
import Embed from 'components/embed'

export default class PageTemplate extends React.Component {

  render () {
    const { uid } = this.props
    const { data = {} } = this.props
    const { title, text, embed } = data
    return (
      <div>
        <Head>
          {Title(title)}
        </Head>
        <div className='page--header'>
          {title && <RichText value={title} />}
        </div>
        {embed && embed.html && (
         <div>
           <Embed {...embed} />
         </div>
         )}
        <div className='page--body'>
          {text && <RichText value={text} />}
        </div>
      </div>
    )
  }

}
