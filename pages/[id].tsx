import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'

interface Family {
    name: string
}
interface FamilyMembers {
    count: number
    data: [
        {
            _id: string
        }
    ]
}

export const Profile = (): React.ReactElement => {
    const router = useRouter()
    const { id } = router.query
    const [family, setFamily] = useState<Family>()
    const [famMembers, setFamMembers] = useState<FamilyMembers>()

    useEffect(() => {
        async function getProfile() {
            try {
                const result = await axios.get(`/api/family/${id}`)
                setFamily(result.data.data)
                setFamMembers(result.data.members)
            } catch (error) {
                throw new Error(error)
            }
        }
        getProfile()
    }, [id])

    return (
        <>
            <NavBar />
            {family && famMembers ? (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '90vh',
                        flexDirection: 'column',
                    }}>
                    <h3>{family.name}</h3>
                    <p>
                        {famMembers?.count}{' '}
                        {famMembers.count > 1 ? 'members' : 'member'}
                    </p>
                </div>
            ) : (
                <p>Loading..</p>
            )}
        </>
    )
}
export default Profile
