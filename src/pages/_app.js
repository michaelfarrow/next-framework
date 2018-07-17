import '../css/styles.scss'

import React from 'react'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import Head from 'next/head'
import withRedux from 'next-redux-wrapper'
import makeStore from 'lib/store'
import { PageTransition } from 'next-page-transitions'
import Header from 'components/header'
import Title from 'components/title'

const TIMEOUT = {
  enter: 1000,
  exit: 400
}

class MyApp extends App {

  static async getInitialProps ({Component, ctx}) {

    // we can dispatch from here too
    // ctx.store.dispatch({type: 'FOO', payload: 'foo'})

    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

    return {pageProps}
  }

  render () {
    const { Component, pageProps, store } = this.props
    const { router } = this.props
    return (
      <Container>
        <Head>
          {Title()}
        </Head>
        {/* <Provider store={store}> */}
        <div>
          <Header router={router} />
          <div>
            <PageTransition timeout={TIMEOUT} classNames='page-transition' monkeyPatchScrolling={true}>
              <Component {...pageProps} />
            </PageTransition>
          </div>
        </div>
        {/* </Provider> */}
      </Container>
    )
  }

}

export default withRedux(makeStore)(MyApp)
