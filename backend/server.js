import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

const CONNECTION_URL = `mongodb+srv://triforze1:Omega111952!!@cluster0.gdgsewl.mongodb.net/?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server Running on port : ${PORT}`))
    })
    .catch((error) => {
        console.log(error.message)
    });