
const express = require('express')
// const bodyParser = require('body-parser')
const mongoose = require('mongoose')
 const cors = require('cors'); // Import the cors middleware
require('./models/userModels');
require('dotenv').config();
const connectDB = require('./config/db');



// const authRoutes = require('./routes/authRoutes')
// const requireToken = require('./middleware/authMiddleware');

// app.use(bodyParser.json());



//mongoDb connection

// Use cors middleware
const app = express()
app.use(express.json());
app.use(cors());

connectDB();
app.use('/api/user', require('./routes/userRoute'))
app.use('/api/admin', require('./routes/adminRoute'))
app.use('/api/doctor', require('./routes/doctorRoutes'))

// app.use(authRoutes);


// mongoose.connect(process.env.mongoUrl)

// mongoose.connection.on("connected", () => { console.log("Connected to MongoDB");
//  });

// mongoose.connection.on("error", (err) => { console.log("Error in connection to MongoDB", err) });

 

const port = process.env.PRT || 8080;

// app.get('/', (req, res) => {
//     res.send('hello');

// })




// app.get('/signin', requireToken, (req, res) => {
//     res.send("Your email is " + req.user.email)
// })

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})