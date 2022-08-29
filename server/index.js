import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/postRoutes.js';
import dotenv from 'dotenv';

// const express=require('express');  ko can dung hang nay trong newest node.
// chi can dung "type":module trong package.json

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true })); //vi co hinh nen cho limit 30mb
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true })); //da set up xong body parser co the post req
app.use(cors());

//middleware
app.use('/', postRoutes);

//connect to db using mongoose db
const PORT = process.env.PORT || 5000; 

mongoose
	.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedtopology: true })
	.then(() =>
		app.listen(PORT, () => console.log(`server running on port: ${PORT}`))
	) //if successfull need to call app
	.catch((error) => console.log(error.message));