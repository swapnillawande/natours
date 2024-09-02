const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

// 1) Middle-Ware
app.use(express.json());
app.use(morgan('dev'));


app.use((req, res, next)=>{
    console.log("Hello from the middleware ");
    next();
})

app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    next();
})


app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);


// 4) start server
const port = 3000;
app.listen(port, () => {
    console.log(`App Natours running on port: ${port}`);
})

