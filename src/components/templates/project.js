import React from 'react'
import Head from 'next/head'
import Title from 'components/title'
import RichText, { asText } from 'components/rich-text'
import Slices from 'components/slices'
import slices from './slices/project'

export default class ProjectTemplate extends React.Component {

  render () {
    const { data = {} } = this.props
    const { title, body } = data
    return (
      <div>
        <Head>
          {Title(['Work', title])}
        </Head>
        <div>
          {title && <RichText value={title} />}
        </div>
        <div>
          {body && <Slices value={body} slices={slices} />}
        </div>
      </div>
    )
  }

}
