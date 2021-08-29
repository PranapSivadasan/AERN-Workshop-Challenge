require('dotenv').config({path : './configuration/.env'});
const express = require('express');
const router = require('./routes/app-route');
const app = express();


app.listen(process.env.PORT, () => {
    console.log(`Express app listening to http://localhost:${process.env.PORT}`);
});

// Adding CORS policy
app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
} );

// Adding body parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/', router);
