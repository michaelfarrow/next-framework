import React from 'react'
import PropTypes from 'prop-types'
import { typesByKey } from 'lib/types'
import { asResolverIndex, hrefResolverIndex } from 'lib/link'
import Link from 'next/link'

export default class Pagination extends React.Component {

  static propTypes = {
    type: PropTypes.string.isRequired,
    current: PropTypes.number.isRequired,
    first: PropTypes.number.isRequired,
    last: PropTypes.number.isRequired,
    next: PropTypes.number,
    prev: PropTypes.number
  }

  render () {
    const { type, current, first, last, next, prev } = this.props
    const { nextLabel, prevLabel } = this.props
    const _type = typesByKey[type]
    if (!_type || !_type.index) return null
    return (
      <div className='pagination'>
        <div className='pagination--prev'>
          {prev && (
           <Link prefetch as={asResolverIndex(_type, prev)} href={hrefResolverIndex(_type, prev)}>
           <a>
             {prevLabel || 'Previous'}
           </a>
           </Link>
           )}
        </div>
        <div className='pagination--next'>
          {next && (
           <Link prefetch as={asResolverIndex(_type, next)} href={hrefResolverIndex(_type, next)}>
           <a>
             {nextLabel || 'Next'}
           </a>
           </Link>
           )}
        </div>
      </div>
    )
  }

}
