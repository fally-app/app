import { Button, Typography } from '@material-ui/core'
import Head from 'next/head'
import Link from 'next/link'

const App: React.FC = (): React.ReactElement => {
    return (
        <>
            <Head>
                <title>SDA - Sabbath School</title>
            </Head>
            <div
                style={{
                    backgroundImage: `url('/bg.jpg')`,
                    width: `100vw`,
                    height: '100vh',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Typography
                    variant="h2"
                    style={{ marginBottom: '2rem', color: '#fff' }}>
                    Welcome to the app
                </Typography>
                <Link href="/login" passHref>
                    <Button variant="contained" color="primary">
                        Login here
                    </Button>
                </Link>
            </div>
        </>
    )
}

export default App
