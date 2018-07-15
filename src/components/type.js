import React from 'react'
import PropTypes from 'prop-types'
import templates from './templates'

export default class Type extends React.Component {

  static propTypes = {
    type: PropTypes.string.isRequired
  }

  render () {
    const { type, ...props } = this.props
    const Template = templates[type]
    if (!Template) return null
    return (
      <Template {...props} />
    )
  }

}
