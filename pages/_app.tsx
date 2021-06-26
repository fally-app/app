import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import '../styles/tailwind.css'
import theme from '../theme'


export default function MyApp(props: AppProps): React.ReactElement {
    const { Component, pageProps } = props
    React.useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side')
        if (jssStyles) {
            jssStyles.parentElement?.removeChild(jssStyles)
        }
    }, [])

    return (
        <React.Fragment>
            <Head>
                <title>Welcome</title>
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </React.Fragment>
    )
}
