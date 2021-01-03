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
                    sabbath_week: getCurrentWeekInTheYear()[1],
                    year: getCurrentWeekInTheYear()[0],
                },
            },
            { $sort: { percentage: -1 } },
        ])
        .toArray()
}
