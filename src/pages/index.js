import Link from 'next/link'

const Index = () => (
  <div>
    <Link href='/about'>
    <button>
      Go to About Page
    </button>
    </Link>
    <p>
      Hello Next.js
    </p>
  </div>
)

export default Index

// import React from 'react'
// import PropTypes from 'prop-types'
// import '../css/styles.scss'
// import { connect } from 'react-redux'
// import { fetchUsers } from '../lib/actions/user'
// import Header from '../components/header'
//
// class Index extends React.Component {
//
//   static propTypes = {
//     users: PropTypes.array,
//     onComponentWillMount: PropTypes.func
//   }
//
//   static defaultProps = {
//     users: []
//   }
//
//   componentWillMount () {
//     const { onComponentWillMount } = this.props
//     onComponentWillMount && onComponentWillMount()
//   }
//
//   static getInitialProps ({store, isServer, pathname, query}) {
//     console.logo
//     const action = fetchUsers()
//     store.dispatch(action)
//     return action.payload.then(payload => {
//       return {
//         users: payload.data
//       }
//     })
//   }
//
//   render () {
//     const { users } = this.props
//     return (
//       <div>
//         <Header />
//         <p>
//           <ul>
//             {users.map((user, i) => (
//                <li key={i}>
//                  {user.name}
//                </li>
//              ))}
//           </ul>
//         </p>
//       </div>
//     )
//   }
//
// }
//
// const mapStateToProps = state => ({
//   users: state.users.items
// })
//
// const mapDispatchToProps = dispatch => ({
//   // onComponentWillMount: () => {
//   //   dispatch(fetchUsers())
//   // }
// })
//
// export default connect(mapStateToProps, mapDispatchToProps)(Index)
