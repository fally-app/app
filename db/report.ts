import { Db } from 'mongodb'

import { getCurrentWeekInTheYear } from '../utils/Helpers'

export const getCurrentReport = async (db: Db) => {
    return db
        .collection('familyreports')
        .aggregate([
            {
                $lookup: {
                    from: 'families',
                    localField: 'family',
                    foreignField: '_id',
                    as: 'family',
                },
            },
            {
                $match: {
                    sabbath_week: getCurrentWeekInTheYear()[1] - 1,
                    year: getCurrentWeekInTheYear()[0],
                },
            },

            { $unwind: '$family' },
            { $sort: { percentage: -1 } },
        ])
        .toArray()
}

export const addReport = async (db: Db, report) => {
    return db
        .collection('familyreports')
        .insertOne(report)
        .then(({ ops }) => ops[0])
}
