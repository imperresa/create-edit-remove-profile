import { MongoClient } from "mongodb";

let connectionString ='mongodb://localhost:27017/' //ใส่ connectionString mongodb ตรงนี้

export const client = new MongoClient(connectionString)

export const db = client.db('profile')
