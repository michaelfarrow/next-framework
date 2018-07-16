import React from 'react'
import RichText from 'components/rich-text'
import Link from 'components/link'

class ProjectPreview extends React.Component {

  render () {
    const { data = {} } = this.props
    const { title } = data
    return (
      <li>
        <Link doc={this.props}>
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
