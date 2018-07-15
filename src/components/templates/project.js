import React from 'react'
import RichText from 'components/rich-text'
import Slices from 'components/slices'
import slices from './slices/project'

export default class ProjectTemplate extends React.Component {

  render () {
    const { data = {} } = this.props
    const { title, body } = data
    return (
      <div>
        <div>
          {title && <RichText value={title} />}
        </div>
        <div>
          {body && <Slices value={body} slices={slices} />}
        </div>
      </div>
    )
  }

}
