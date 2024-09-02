const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());

app.use((req, res, next)=>{
    console.log("Hello from the middleware 😘");
    next();
})

app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    next();
})

const toursData = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

const getAllTours = (req,res) =>{
        res.status(200).json({
            status: "success",
            requestedAt : req.requestTime,
            results: toursData.length,
            data: {
                tours: toursData
            }
        });
}

const getTourById = (req,res) =>{
    console.log(req.params);
    const id = req.params.id * 1;
    const tour = toursData.find(el => el.id === id);

    if (!tour) {
        return res.status(404)
            .json({
                status: "Fail",
                message: "Invalid ID"
            });
    }else{
        res.status(200).json({
            status: "success",
            data: {
                tour: tour
            }
        });
    }
}

const createTour =(req,res)=>{
    const newId = toursData[toursData.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    toursData.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(toursData), ((err) => {

        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    }));
}

const updateTourById = (req,res)=>{
    if(req.params.id * 1 > toursData.length){
        return res.status(404).json({
            status: 'Fail',
            message :'Invalid ID'
        })
    }

    res.status(200).json({
        status:'Success',
        data: {
            tour:'<Updated tour here...>'
        }
    })
}

const deleteTourById = (req,res)=>{

    if(req.params.id * 1 > toursData.length){
        return res.status(404).json({
            status: 'Fail',
            message :'Invalid ID'
        })
    }

    res.status(204).json({
        status:'Success',
        data: null
    })
}


// fetch all the tours data by : GET API
//app.get('/api/v1/tours',getAllTours);

// fetch the tour data by ID : GET API
//app.get('/api/v1/tours/:id',getTourById);

// insert tour data : POST API
//app.post('/api/v1/tours',createTour);

// update tour by Id : PATCH
//app.patch('/api/v1/tours/:id',updateTourById);

// delete tour by ID : DELETE
//app.delete('/api/v1/tours/:id',deleteTourById);

app.route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour);

app.route('/api/v1/tours/:id')
    .get(getTourById)
    .patch(updateTourById)
    .delete(deleteTourById);


const port = 3000;
app.listen(port, () => {
    console.log(`App Natours running on port: ${port}`);
})

