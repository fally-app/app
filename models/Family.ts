import bcrypt from 'bcrypt'
import mongoose, { Document, Schema } from 'mongoose'

import { IStatus } from './User'

export interface IFamily extends Document {
    code: string
    name: string
    password: string
    created_at: string
    status: IStatus
}

const familySchema: Schema = new Schema({
    code: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(IStatus),
        default: IStatus.ACTIVE,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
})

familySchema.pre<IFamily>('save', function () {
    const hashedPassword = bcrypt.hashSync(
        this.password,
        12,
        process.env.JWT_SECRET
    )
    this.password = hashedPassword
})

export default mongoose.models['Family'] ||
    mongoose.model<IFamily>('Family', familySchema)