import { Button, Link } from '@material-ui/core'
import Head from 'next/head'

const App: React.FC = (): React.ReactElement => {
    return (
        <>
            <Head>
                <title>SDA - SABBATH SCHOOL</title>
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
                    alignItems: 'center',
                }}>
                <Link href="/login">
                    <a>
                        <Button variant="contained" color="primary">
                            Login here
                        </Button>
                    </a>
                </Link>
            </div>
        </>
    )
}

export default App
