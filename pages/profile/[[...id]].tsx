import Head from 'next/head'
import React from 'react'

import NavBar from '../../components/NavBar'

const Profile: React.FC = (): React.ReactElement => {
    return (
        <>
            <Head>
                <title>Profile Page</title>
            </Head>
            <div>
                <NavBar />
            </div>
        </>
    )
}

export default Profile
