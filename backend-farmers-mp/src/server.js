const express = require('express')
const connectDB = require('./config/db')
require('dotenv').config()
const authRouter = require("./routes/authRoutes");
const cors = require("cors");

const app = express()
const corsOptions = {
  origin: 'http://localhost:3000', // Allow only this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1/auth", authRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
}) 

const port = process.env.PORT || 5000

connectDB();



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})























// const express = require('express');
// const dotenv = require('dotenv'); //import
// dotenv.config(); //config

// const app = express();



// const port = process.env.PORT || 3000;

// app.use(express());

// app.get('/', (req,res) => {
//     res.send("hello world")
// })

// app.listen(port, ()=> {
//     console.log(`server running on port ${port}`);
// })