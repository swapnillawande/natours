const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path : './config.env'})
const app = require('./app.js');

const DB = process.env.DATABASE//.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con=>{
    console.log("DB connection success..");
})

// const testTour = new Tour({
//     name:'The Forest Hiker',
//     rating: 4.7,
//     price: 455
// });

// testTour.save()
//         .then(doc => {
//             console.log(doc);
//         })
//         .catch(err =>{
//             console.log(err);
//         })



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App Natours running on port: ${port}`);
})