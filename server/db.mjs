import { MongoClient } from "mongodb";

let connectionString ='mongodb://localhost:27017/'

export const client = new MongoClient(connectionString)

export const db = client.db('profile')