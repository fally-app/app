import { Gender, IStatus } from '../../models/User'

export interface IUser {
    firstName: string
    lastName: string
    email?: string
    family_id: string
    gender: Gender
    status: IStatus
    class_level: string
    joined_at: string
}
