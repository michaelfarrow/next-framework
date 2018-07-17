import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import pathToRegexp from 'path-to-regexp'

const NAV = [
  {
    label: 'Index',
    href: '/',
    as: '/'
  },
  {
    label: 'Work',
    href: '/prismic/project/page/1',
    as: '/work'
  }
]

export default class Header extends React.Component {

  static propTypes = {
    router: PropTypes.object.isRequired
  }

  render () {
    const { router } = this.props
    const currentPath = router.asPath
    return (
      <header>
        <h1>Next.js</h1>
        <nav>
          <ul>
            {NAV.map((item, i) => {
               const exact = pathToRegexp(`${item.as}`).exec(currentPath)
               const child = pathToRegexp(`${item.as}/(.*)`).exec(currentPath)
               const classes = ['nav--item']
               if (exact) classes.push('nav--item-current')
               if (child) classes.push('nav--item-current-child')
               return (
                 <li key={i} className={classes.join(' ')}>
                   <Link prefetch href={item.href} as={item.as}>
                   <a>
                     {item.label}
                   </a>
                   </Link>
                 </li>
               )
             })}
          </ul>
        </nav>
      </header>
    )
  }

}
