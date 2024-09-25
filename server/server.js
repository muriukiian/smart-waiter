const express = require('express');
const dotenv = require("dotenv").config();
const cors = require("cors")
const connectDb = require('./config/dbConnect')
const authRoutes = require("./routes/auth.routes.js")
const userRoute = require("./routes/user.routes.js")



const app = express();
//connect to the database
connectDb();

//set up cors
app.use(cors);

//middleware
app.use(express.json());


//routes
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoute)



//connect server
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});