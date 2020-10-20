import mongoose, { Document, Schema } from 'mongoose'

import { IFamily } from './Family'

export enum Gender {
    Male = 'Male',
    Female = 'Female',
}

export enum IStatus {
    ACTIVE = 'ACTIVE',
    DIACTIVE = 'DIACTIVE',
}

export interface IUser extends Document {
    firstName: string
    lastname: string
    gender?: Gender
    email: string
    class: string
    joined_at: Date
    family_id: IFamily['_id']
    status: IStatus
}

const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
    },
    firstname: {
        required: true,
        type: String,
    },
    lastname: {
        required: true,
        type: String,
    },
    gender: {
        required: true,
        type: String,
        enum: Object.values(Gender),
    },
    status: {
        type: String,
        enum: Object.values(IStatus),
        default: IStatus.ACTIVE,
    },
    family_id: {
        type: Schema.Types.ObjectId,
        ref: 'Family',
        required: true,
    },
    class: {
        type: String,
        required: true,
    },
    joined_at: {
        type: Date,
        default: Date.now(),
    },
})

export default mongoose.models['User'] ||
    mongoose.model<IUser>('User', userSchema)
