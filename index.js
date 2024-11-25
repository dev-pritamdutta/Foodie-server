const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const cors = require("cors");
const port = process.env.port || 3000;
require("dotenv").config();

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@foodi.sk0tb.mongodb.net/?retryWrites=true&w=majority&appName=foodi`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    //database and collection
    const menuCollection = client.db("demo-foodi-client").collection("menus");
    const cartCollection = client.db("demo-foodi-client").collection("cartItems");

    //all menu items operation
    app.get("/menu", async(req, res) =>{
      const result = await menuCollection.find().toArray();
      res.send(result);
    })



    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello developer");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
