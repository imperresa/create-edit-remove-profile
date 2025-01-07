import express from 'express'
import cors from 'cors'
import { db } from './db.mjs';
import { client } from './db.mjs';
import { ObjectId } from 'mongodb';

client.connect()
const app = express();
const port = 4000;

app.use(express.json())
app.use(cors())
app.post('/', async (req, res) => {
  try {
    const newProfile = req.body;
    const collection = db.collection('profiles'); // Specify collection
    await collection.insertOne(newProfile);
    return res.status(201).json({ message: 'Profile has been created' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to create profile' });
  }
});

app.get('/profiles', async (req, res) => {
  try {
    const collection = db.collection('profiles');
    const profiles = await collection.find().toArray();
    return res.json(profiles);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to retrieve profiles' });
  }
});


app.delete('/profiles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const collection = db.collection('profiles');
    
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return res.json(result)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete profile' });
  }
});

app.put('/edit/:id', async (req,res)=>{
  try {
    const { id } = req.params;
    const update = req.body

    const collection = db.collection('profiles');
    delete update._id
    
    const result = await collection.updateOne(
      { _id: new ObjectId(id) }, 
      { $set: update } 
    );
    return res.json(result)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
})


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });