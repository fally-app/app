import bcrypt from 'bcrypt'
import mongoose, { Document, Schema } from 'mongoose'
import slugify from 'slugify'

import { IStatus } from './User'

export enum IFamilyTypes {
    ADMIN = 'ADMIN',
    FAMILY = 'FAMILY',
}

export interface IFamily extends Document {
    code: string
    name: string
    slug: string
    password: string
    created_at: string
    user_type: IFamilyTypes
    status: IStatus
}

const familySchema: Schema = new Schema({
    code: {
        type: String,
        required: true,
    },
    slug: String,
    name: {
        type: String,
        unique: true,
        trim: true,
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
    user_type: {
        type: String,
        enum: Object.values(IFamilyTypes),
        default: IFamilyTypes.FAMILY,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
})

familySchema.pre<IFamily>('save', function (next) {
    this.slug = slugify(this.name, { lower: true })
    next()
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
