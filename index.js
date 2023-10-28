const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;


// middleware // 
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));

app.use(express.json());

app.use(cookieParser());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wslenxe.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


// my crated middleware // 
// const logger = async(req, res , next) => {
//   console.log('called' , req.host, req.originalUrl);
//   next()
// }
// 


// the way of token verify by using middleware // 
const verifyToken = async(req, res , next) => {
   const token = req.cookies?.token;
   console.log('value of token middleware', token);
   if(!token) {
    return res.status(401).send({message : 'not authorized'})
   }

   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    // err

    if(err) {
      console.log(err);
      return res.status(401).send({message : 'unauthorized'})
    }

    // if token is valid then it would be decoded // 
    console.log('value in the token ', decoded);
    req.user = decoded;
    next();
  })
}
// the way of token verify by using middleware // 

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const servicesCollection = client.db('carDoctor').collection('services');

    const ordersCollection = client.db('carDoctor').collection('orders');

    // auth related api // 
    app.post('/jwt', async(req, res) => {
      const user = req.body;
      console.log(user);
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn : '1h'})
      res
      .cookie('token', token, {
        httpOnly: true,
        secure: false,
      })
      .send({success : true});
    })



    // CRUD Read for services //
    app.get('/services', async(req, res) => {
        const cursor = servicesCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    // Read single data // 
    app.get('/services/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};
      
      const options = {
        projection: { title: 1, price: 1, service_id: 1, img: 1 },
      };

      const result = await servicesCollection.findOne(query, options);
      res.send(result);
    })


    // Create for customers oders collection // 
    app.post('/orders',  async(req, res) => {
      const orders = req.body;
      const result = await ordersCollection.insertOne(orders);
      res.send(result);
    })

    // Read some data from database way not single or all data only some data  // 

    app.get('/orders', verifyToken, async(req, res) => {
      console.log(req.query.email);
      // console.log('tok tok token', req.cookies.token);
      console.log('user in the valid token ' , req.user);

      if(req.query.email !== req.user.email){
        return res.status(403).send({message : 'forbidden access '})
      }

      let query = {};
      if(req.query?.email){
        query = {emailAddress: req.query.email}
      }
      const result = await ordersCollection.find(query).toArray();
      res.send(result);
    })



    app.delete('/orders/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};
      const result = await ordersCollection.deleteOne(query);
      res.send(result);
    })



    app.patch('/orders/:id', async(req, res) => {
      const id = req.params.id;
      const updatedOrders = req.body;
      const query = {_id : new ObjectId(id)}
      const updateDoc = {
      $set: {
        status : updatedOrders.status
      },
    }

    const result = await ordersCollection.updateOne(query, updateDoc)

    res.send(result)
    })


    // Create for customers oders collection // 


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Doctor is running on server')
})

app.listen(port, () => {
    console.log(`doctor server is running on PORT ${port}`);
})