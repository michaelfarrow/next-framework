import React from 'react'
import Head from 'next/head'
import Title from 'components/title'
import RichText from 'components/rich-text'
import Link from 'components/link'
import Image from 'components/image'

class ProjectPreview extends React.Component {

  render () {
    const { data = {} } = this.props
    const { title, header_image = {} } = data
    const { thumb = {} } = header_image
    return (
      <li>
        <Link doc={this.props}>
        {Object.keys(thumb).length && <Image {...thumb} /> || null}
        {title && <RichText asText={true} value={title} />}
        </Link>
      </li>
    )
  }

}

export default class ProjectIndexTemplate extends React.Component {

  render () {
    const { items } = this.props
    return (
      <div>
        <Head>
          {Title('Work')}
        </Head>
        <h2>Project Index</h2>
        <ul>
          {items.map((item, i) => (
             <ProjectPreview key={i} {...item} />
           ))}
        </ul>
        {this.props.renderPagination()}
      </div>
    )
  }

}
