import React from 'react'
import PropTypes from 'prop-types'

export default class Diagram extends React.Component {

  static propTypes = {
    content: PropTypes.string.isRequired
  }

  render () {
    return (
      <div dangerouslySetInnerHTML={{__html: this.props.content}} />
    )
  }

}
