import React from 'react'
import PropTypes from 'prop-types'
import { typesByKey } from 'lib/types'
import Link from 'next/link'

const asResolver = (type, page) => {
  const path = [type.index]
  if (page !== 1) {
    path.push('page')
    path.push(page)
  }
  return path.join('/')
}

const hrefResolver = (type, page) => {
  return ['/prismic', type.type, 'page', page].join('/')
}

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
    const _type = typesByKey[type]
    if (!_type || !_type.index) return null
    return (
      <div className='pagination'>
        <div className='pagination--prev'>
          {prev && (
           <Link as={asResolver(_type, prev)} href={hrefResolver(_type, prev)}>
           <a>Previous</a>
           </Link>
           )}
        </div>
        <div className='pagination--next'>
          {next && (
           <Link as={asResolver(_type, next)} href={hrefResolver(_type, next)}>
           <a>Next</a>
           </Link>
           )}
        </div>
      </div>
    )
  }

}
