import { Db, MongoClient } from 'mongodb'
import { NextApiRequest } from 'next'

export interface Request extends NextApiRequest {
    db: Db
    dbClient: MongoClient
    user: {
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
    family: {
        _id: string
        name: string
    }
}

export interface TokenDecode {
    _id: string
    ait: string
}

export enum USER_TYPES {
    ADMIN = 'ADMIN',
    FAMILY = 'FAMILY',
}

export interface FamilyType {
    _id: string
    user_type: USER_TYPES
    name: string
    password: string
    code: string
    status: IStatus
}
