import mongoose from 'mongoose'

async function connectDB(): Promise<void> {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    console.log(`MongoDb connected: ${conn.connection.host}`)
}

export default connectDB
