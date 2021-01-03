import { Db } from 'mongodb'

export const getCurrentReport = async (db: Db) => {
    return db
        .collection('reports')
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
}
