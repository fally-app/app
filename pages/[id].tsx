import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

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

export const profile: React.FC = (): React.ReactElement => {
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
                console.log(error)
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
export default profile

// export const getServerSideProps: GetServerSideProps = async () => {
//     const result = await axios.get(process.env.SERVER_BASE_URL + '/api/family/')

//     return {
//         props: {
//             report: result.data.data,
//         },
//     }
// }
