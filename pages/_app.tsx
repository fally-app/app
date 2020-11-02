import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'

// import { Provider } from 'react-redux'
// import store from '../store'
import theme from '../theme'

export default function MyApp(props: AppProps): React.ReactElement {
    const { Component, pageProps } = props

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side')
        if (jssStyles) {
            jssStyles.parentElement?.removeChild(jssStyles)
        }
    }, [])

    return (
        <React.Fragment>
            <Head>
                <title>My page</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            {/* <Provider store={store}> */}
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
            {/* </Provider> */}
        </React.Fragment>
    )
}
