import { Db } from 'mongodb'

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
        ])
        .sort({ percentage: -1 })
        .toArray()
}
