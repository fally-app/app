import { makeStyles } from '@material-ui/core'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

const useStyles = makeStyles({
    root: {
        width: '100vw',
        height: '100vh',
        fontFamily: 'Poppins',
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: 'cover',
    },
    nav: {
        display: 'flex',
        justifyContent: 'space-around',
        paddingTop: '2rem',
    },
    header: {
        color: '#fff',
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    links: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '4rem',
        color: '#fff',
    },
    main: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '80%',
    },
    para: {
        color: '#fff',
        paddingTop: '2rem',
        fontSize: '1rem',
        fontFamily: 'Poppins',
    },
    readMore: {
        backgroundColor: 'rgba(37, 99, 235, 1)',
        color: 'white',
        padding: '1rem 3rem',
        borderRadius: '30px',
        fontFamily: 'Poppins',
        fontWeight: 'bold',
    },
    heading: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: '2rem',
        width: '24rem',
        lineHeight: '1.625',
        textTransform: 'capitalize',
        marginBottom: '2rem',
        fontFamily: 'Poppins',
    },
})

const App: React.FC = (): React.ReactElement => {
    const classes = useStyles()

    return (
        <>
            <Head>
                <title>RCA - Adventist Church</title>
            </Head>

            <div className={classes.root}>
                <nav className={classes.nav}>
                    <h3 className={classes.header}>SDA</h3>
                    <div className={classes.links}>
                        <Link href="/schedule">
                            <a>Schedule</a>
                        </Link>
                        <Link href="/blog">
                            <a>Blog</a>
                        </Link>
                        <Link href="/login">
                            <a>Signin</a>
                        </Link>
                        <Link href="/search">
                            <a>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    className="fill-current">
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" />
                                </svg>
                            </a>
                        </Link>
                        <Link href="/more">
                            <a>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    className="fill-current">
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path d="M3 4h18v2H3V4zm6 7h12v2H9v-2zm-6 7h18v2H3v-2z" />
                                </svg>
                            </a>
                        </Link>
                    </div>
                </nav>
                <main className={classes.main}>
                    <section>
                        <h1 className={classes.heading}>
                            The holy spirit Inside Gods People
                        </h1>
                        <Link href="/blog">
                            <a className={classes.readMore}>Read More</a>
                        </Link>
                    </section>
                    <section>
                        <Image
                            src="/animal-bg.jpg"
                            width={600}
                            height={500}
                            priority={true}
                            layout="responsive"
                            alt="current post"
                            className=" rounded-md"
                        />
                        <p className={classes.para}>
                            {' '}
                            God is Good all the time
                        </p>
                    </section>
                </main>
            </div>
        </>
    )
}

export default App
