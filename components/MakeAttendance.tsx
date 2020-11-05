import React from 'react'

import { Gender, IStatus } from '../models/User'

interface MakeAttendanceProps {
    users: [
        {
            _id: string
            firstName: string
            lastName: string
            email?: string
            family_id: string
            gender?: Gender
            status: IStatus
            class_level: string
            joined_at: string
        }
    ]
}

export const MakeAttendance: React.FC<MakeAttendanceProps> = ({
    users,
}): React.ReactElement => {
    console.log(users)
    return <div>Make attendance here</div>
}
export default MakeAttendance
