import mongoose, { Document, Schema } from 'mongoose'

import { IFamily } from './Family'

export interface IFamilyReport extends Document {
    family: IFamily['_id']
    present: number
    studied7times: number
    startedSabbath: number
    visited: number
    wereVisited: number
    helped: number
    wereHelped: number
    sick: number
    visitors: number
}

const familyReportSchema: Schema = new Schema({
    family: {
        type: Schema.Types.ObjectId,
        ref: 'Family',
        required: true,
    },
    presents: {
        type: Number,
        default: 0,
    },
    studied7times: {
        type: Number,
        default: 0,
    },
    startedSabbath: {
        type: Number,
        default: 0,
    },
    visited: {
        type: Number,
        default: 0,
    },
    wereVisited: {
        type: Number,
        default: 0,
    },
    helped: {
        type: Number,
        default: 0,
    },
    wereHelped: {
        type: Number,
        default: 0,
    },
    sick: {
        type: Number,
        default: 0,
    },
    visitors: {
        type: Number,
        default: 0,
    },
    sabbath_week: {
        type: Number,
        required: true,
        default: 0,
    },
    absent: {
        type: Number,
        required: true,
        default: 0,
    },
    year: {
        type: Number,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    percentage: {
        type: Number,
        required: true,
    },
})

export default mongoose.models['FamilyReport'] ||
    mongoose.model<IFamily>('FamilyReport', familyReportSchema)
