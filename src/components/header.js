import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

const Header = () => (
  <div>
    <Link href='/'>
    <a style={linkStyle}>Home</a>
    </Link>
    <Link href='/about'>
    <a style={linkStyle}>About</a>
    </Link>
  </div>
)

export default Header

// import React from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import { setTitle } from '../lib/actions/app'
//
// class Header extends React.Component {
//
//   static propTypes = {
//     title: PropTypes.string.isRequired,
//     onClick: PropTypes.func
//   }
//
//   render () {
//     const { title, onClick } = this.props
//     return (
//       <div>
//         <h1>{title}</h1>
//         {onClick && (
//          <button onClick={onClick}>
//            Change Title
//          </button>
//          )}
//       </div>
//     )
//   }
//
// }
//
// const RANDOM_TITLES = [
//   'one',
//   'two',
//   'three',
//   'four',
//   'five'
// ]
//
// const mapStateToProps = state => ({
//   title: state.app.title
// })
//
// const mapDispatchToProps = dispatch => ({
//   onClick: () => {
//     dispatch(setTitle(RANDOM_TITLES[Math.floor(Math.random() * RANDOM_TITLES.length)]))
//   }
// })
//
// export default connect(mapStateToProps, mapDispatchToProps)(Header)
