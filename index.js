const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require("mongodb").ObjectId;
require('dotenv').config();
const cors = require('cors');

const app = express()
const port =process.env.PORT || 5000;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cknzz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// console.log(uri)


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// MIDDLEWARE
app.use(cors());
app.use(express.json())


// TourToDubai
// LBzybKvtUnSBLyj4

app.get('/', (req, res) => {
    res.send('Allah code run korao...amin!....and it is working');
})



client.connect(err => {
    const servicesCollection = client.db("serviceData").collection("services");

    const orderCollection = client.db("serviceData").collection("orderedProduct");
    // perform actions on the collection object


    // ADD  POST SERVICES
    app.post("/addServices", async (req, res) => {
        const result = await servicesCollection.insertOne(req.body)
        res.send(result);
    })


    // GET ALL SERVICES

    app.get("/allservices", async (req, res) => {
        const result = await servicesCollection.find({}).toArray();
        res.send(result);
    })


    // GET SINGLE PRODUCST
    app.get("/singleProduct/:id", async (req, res) => {
        // console.log(req.params.id)
        const result = await servicesCollection.find({ _id: ObjectId(req.params.id) }).toArray();
        res.send(result[0]);
    })


    // CONFIRM ORDER
    app.post("/confirmOrder", async (req, res) => {
        const result = await orderCollection.insertOne(req.body);
        res.send(result);
    })


    // MY CONFIRM ORDER
    app.get("/myOrders/:email", async (req, res) => {
        // console.log(req.params.id)
        const result = await orderCollection.find({ email: req.params.email }).toArray();
        res.send(result);
    })



    // get confirmed order
    app.get("/confirmedOrders", async (req, res) => {
        // console.log(req.params.id)
        const result = await orderCollection.find({}).toArray();
        res.send(result);
    })


    // DELETE ORDER
    app.delete("/deleteOrder/:id",async (req,res)=>{
        const result=await orderCollection.deleteOne({_id : ObjectId(req.params.id),
        })
        res.send(result);
    })


    
    // client.close();
});




app.listen(port, () => {
    console.log('Running server at', port)
})