import { MongoClient } from 'mongodb';
import type { Db } from 'mongodb';
import url from 'url';

let cachedDB: Db | undefined;

export async function getDatabase(uri = process.env.DATABASE_URL): Promise<Db> {
	if (cachedDB) {
		return cachedDB;
	}

	if (!uri) {
		throw new Error('Unable to connect to database, no URI was provided');
	}

	const client = await MongoClient.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

	const dbName = url.parse(uri).pathname?.substr(1);

	if (!dbName) {
		throw new Error(`Unable to derive a dbname to connect to`);
	}
	const db = client.db(dbName);

	cachedDB = db;
	return db;
}
