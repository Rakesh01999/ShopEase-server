const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.POrt || 5000;
require('dotenv').config();


// middleware
app.use(cors({
  origin: [
      'http://localhost:5173', 'https://shopease-j.web.app', 'https://shopease-j.firebaseapp.com'
  ],
  credentials: true
}));
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uuibjb3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const productsCollection = client.db("ShopEase").collection("products");
       
    app.get('/products', async(req, res)=>{
        const result = await productsCollection.find().toArray();
        res.send(result);
    })

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('ShopEase is running');
})

app.listen(port, () => {
    console.log(`ShopEase is running on port ${port}`);
})
 
