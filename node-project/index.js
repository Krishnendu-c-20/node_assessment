const Joi = require('joi');
const express = require('express');
const app = express();
var totoro = require('totoro-node');
const Parse = require('./controllers/Parse');


app.use(express.json());

app.use('/api', totoro.rain({
    v1: {
        active: true,
        deprecated: false,
        endpoints: [{
            route: "/parse",
            method: "POST",
            active: true,
            deprecated: false,
            implementation: Parse.load
        }]
    },
    v2: {
        active: true,
        deprecated: false,
        endpoints: [{
            route: "/parse",
            method: "POST",
            active: true,
            deprecated: false,
            implementation: Parse.load_v2
        }]
    }

}));

//env varible PORT
const port = process.env.PORT || 3000;
app.listen(port, () =>console.log(`EXPRESS on port ${port}...`));