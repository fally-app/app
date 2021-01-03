import { Db, MongoClient } from 'mongodb'
import { NextApiRequest } from 'next'

export interface Request extends NextApiRequest {
    db: Db
    dbClient: MongoClient
}

export enum Gender {
    Male = 'Male',
    Female = 'Female',
}

export enum IStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

export interface UserType {
    _id: string
    firstName: string
    lastName: string
    email?: string
    family_id: string
    gender?: Gender
    status: IStatus
    class_level: string
    joined_at: string
    family: [
        {
            _id: string
            name: string
        }
    ]
}
