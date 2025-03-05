import express from "express"
import cors from 'cors'
import 'dotenv/config'
import cookieParser from "cookie-parser"
import connectDB from "./db/index.js"
import passport from "passport"

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json({limit: '10kb'}));
app.use(passport.initialize());

const PORT = process.env.PORT || 5000;

// api routes
app.get("/", (req, res) => { 
    res.send("App started");
});

import userRouter from "./router/user.router.js"
import letterRouter from "./router/letter.router.js"
app.use('/api/v1/user', userRouter);
app.use('/api/v1/letter', letterRouter);

app.all("*", (req, res) => {
    res.status(404).send("Can't find the requested route");
})
connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`✅ server is running at: http://localhost:${PORT}`);
    })
})
.catch((error) => {
    console.log("Error in connecting to DB", error);
})