import express from 'express';
// import bodyParser from 'body-parser';
import mongoose  from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

app.use(express.json({limit: "30mb", extended: true }));
app.use(express.urlencoded({limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes);    // Every routes inside the postRoutes(imported from post.js) is going to start with '/posts' not with only'/' this
app.use("/user", userRoutes);       // user path for creating user model 

app.get('/',(req,res) => {
    res.send('Hy! I am running');
});

const PORT = process.env.PORT||5000;

mongoose.connect(process.env.CONNECTION_URL , { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(PORT , () => console.log(`Server running on port: http://localhost:${PORT}`)))
    .catch((error)=>console.log(`${error} did not connect`));


// mongoose.set('useFindAndModify', false);
