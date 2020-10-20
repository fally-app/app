import mongoose, { Document, Schema } from 'mongoose'

import { IFamily } from './Family'
import { IUser } from './User'

export interface IAttandances extends Document {
    user_Id: IUser['_id']
    family_code: IFamily['_id']
    isPresent: boolean
    studied7Times: boolean
    startedSabbath: boolean
    visited: boolean
    wasvisited: boolean
    helped: boolean
    wasHelped: boolean
    isSick: boolean
    broughtOneTenth: boolean
    created_at: string
}

const attandanceShema: Schema = new Schema({
    user_Id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    family_code: {
        type: Schema.Types.ObjectId,
        ref: 'Family',
        required: true,
    },
    isPresent: {
        type: Boolean,
        default: false,
    },
    studied7Times: {
        type: Boolean,
        default: false,
    },
    startedSabbath: {
        type: Boolean,
        default: false,
    },
    visited: {
        type: Boolean,
        default: false,
    },
    wasvisited: {
        type: Boolean,
        default: false,
    },
    helped: {
        type: Boolean,
        default: false,
    },
    wasHelped: {
        type: Boolean,
        default: false,
    },
    isSick: {
        type: Boolean,
        default: false,
    },
    broughtOneTenth: {
        type: Boolean,
        default: false,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
})

export default mongoose.models['Attendances'] ||
    mongoose.model<IFamily>('Attendances', attandanceShema)