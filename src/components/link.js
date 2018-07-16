import React from 'react'
import PropTypes from 'prop-types'
import { default as NextLink } from 'next/link'
import { hrefResolver, asResolver } from 'lib/link'

export default class Link extends React.Component {

  static propTypes = {
    doc: PropTypes.object.isRequired
  }

  render () {
    return (
      <NextLink prefetch href={hrefResolver(this.props.doc)} as={asResolver(this.props.doc)}>
        <a>
          {this.props.children}
        </a>
      </NextLink>
    )
  }

}
