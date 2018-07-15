import React from 'react'
import PropTypes from 'prop-types'
import { RichText as PrismicRichText } from 'prismic-reactjs'
import Link from 'components/link'

const htmlSerializer = (type, element, content, children, key) => {
  if (type === 'hyperlink') {
    const link = element.data
    switch (link.link_type) {
      case 'Web':
        return (
          <a key={key} href={link.url} target='_blank'>
            {children}
          </a>
        )
      case 'Document':
        return (
          <Link key={key} doc={link}>
          {children}
          </Link>
        )
    }
  }
  return null
}

export default class RichText extends React.Component {

  static propTypes = {
    value: PropTypes.array.isRequired,
    asText: PropTypes.bool
  }

  static defaultProps = {
    asText: false
  }

  render () {
    const { value, asText } = this.props
    if (asText) return PrismicRichText.asText(value)
    return PrismicRichText.render(value, null, htmlSerializer)
  }

}
