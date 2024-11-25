const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const helmet = require("helmet"); // Helmet for setting security headers
const cors = require("cors");
const port = process.env.PORT || 3000; // Make sure "process.env.PORT" is capitalized for render
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Set up Helmet with CSP headers
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"],
      fontSrc: ["'self'", "https://foodie-server-7mst.onrender.com"],
      imgSrc: ["'self'", "data:"], // Allows loading inline base64 images
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"], // Allows inline styles
    },
  })
);

// MongoDB connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@foodi.sk0tb.mongodb.net/?retryWrites=true&w=majority&appName=foodi`;
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
    // Database and collections
    const menuCollection = client.db("demo-foodi-client").collection("menus");
    const cartCollection = client
      .db("demo-foodi-client")
      .collection("cartItems");

    // Endpoint to get all menu items
    app.get("/menu", async (req, res) => {
      const result = await menuCollection.find().toArray();
      res.send(result);
    });

    // Ping the database to confirm the connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Keep the client open for further operations
  }
}
run().catch(console.dir);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Hello developer");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
