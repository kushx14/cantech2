require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const connectDB = require('./dbconfig');
const cors = require('cors');
app.use(cors({
  origin: 'http://http://localhost:3000/',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // If cookies are required
}));

connectDB();
// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","https://cantech2.onrender.com");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin,X-Requested-With, Content-Type ,Accept"
//     )
//     next();
// })
app.use(express.json())
app.use('/api',require("./Routes/CreateUser"))

app.use('/api',require("./Routes/Displaydata"))
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
