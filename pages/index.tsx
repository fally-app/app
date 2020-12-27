// import { Button, Typography } from '@material-ui/core'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
import { useEffect } from 'react'

import useUser from '../lib/useUser'

const App: React.FC = (): React.ReactElement => {
    const { user } = useUser()

    useEffect(() => {
        if (user) {
            if (user?.user_type === 'ADMIN') {
                Router.replace('/admin')
            } else if (user?.user_type === 'FAMILY') {
                Router.replace('/home')
            }
        }
    }, [user])

    return (
        <>
            <Head>
                <title>RCA - Adventist Church</title>
            </Head>

            <div className=" w-screen h-screen bg-hero-image bg-no-repeat bg-cover font-poppins">
                {/* <Typography
                    variant="h2"
                    style={{ marginBottom: '2rem', color: '#fff' }}>
                    Welcome to the app
                </Typography>
                <Link href="/login" passHref>
                    <Button variant="contained" color="primary">
                        Login here
                    </Button>
                </Link> */}
                <nav className=" flex justify-around pt-4">
                    <h3 className="text-white text-3xl font-bold">SDA</h3>
                    <div className=" flex justify-between gap-8 text-white">
                        <Link href="/schedule">
                            <a>Schedule</a>
                        </Link>
                        <Link href="/blog">
                            <a>Blog</a>
                        </Link>
                        <Link href="/signin">
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
                <main className="flex justify-around items-center h-4/5">
                    <section>
                        <h1 className="font-bold text-white text-4xl w-96 leading-relaxed capitalize mb-8 font-poppins">
                            The holy spirit Inside Gods People
                        </h1>
                        {/* #0074ff */}
                        <Link href="/blog">
                            <a className=" bg-blue-600 text-white py-4 px-12 rounded-full font-poppins font-bold">
                                Read More
                            </a>
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
                        <p className=" text-white pt-4 text-lg font-poppins">
                            God is Good all the time
                        </p>
                    </section>
                </main>
            </div>
        </>
    )
}

export default App
