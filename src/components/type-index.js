import React from 'react'
import PropTypes from 'prop-types'
import templates from './index-templates'

export default class TypeIndex extends React.Component {

  static propTypes = {
    type: PropTypes.string.isRequired
  }

  render () {
    const { type } = this.props
    const Template = templates[type]
    if (!Template) return null
    return (
      <Template {...this.props} />
    )
  }

}
