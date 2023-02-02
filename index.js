const express = require('express');
const bodyParser = require('body-parser');
const { connectToDb } = require('./db/index');
//init app & middleware
const app = express();
const router = require('./routes/index');
app.use(bodyParser.json());

//db connection double check
connectToDb((err) => {
    if(!err){
        app.listen(3000, () => {
            console.log("app listening on 3000")
        }) 
    }
})


//routes
app.use('/api',router);

