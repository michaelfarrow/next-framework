import React from 'react'
import title from 'lib/title'

export default function Title () {
  const args = [].slice.call(arguments)
  return (
    <title key='title'>
      {title(args)}
    </title>
  )
}
