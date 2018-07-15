import React from 'react'
import PropTypes from 'prop-types'

export default class Page extends React.Component {

  static propTypes = {
    value: PropTypes.array,
    slices: PropTypes.object
  }

  static defaultProps = {
    value: [],
    slices: {}
  }

  render () {
    const { value, slices } = this.props
    return (
      <div>
        {value.map((v, i) => {
           const Slice = slices[v.slice_type]
           if (!Slice) return null
           return (
             <Slice key={i} {...v.primary} />
           )
         })}
      </div>
    )
  }

}
