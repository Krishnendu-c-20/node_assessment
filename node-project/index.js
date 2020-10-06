const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json()); 

app.post('/api/v1/parse', (req, res) => {

    const schema = Joi.object({
        data: Joi.string().required()
    });
    const result = schema.validate(req.body);
    console.log(result);
    if(!req.body.data ) {
        //400 BAD request
        res.status(400).send('Request body is required.');
        return;
    }
    // if(result && result.value && result.value.data) {
        const v1_pattern = /^([A-Z]+0*)([A-Z]+0*)([1-9]*)/g;
        const v1_array = [...(req.body.data).matchAll(v1_pattern)];
        var [firstName, lastName, clientId] = [v1_array[0][1], v1_array[0][2], v1_array[0][3]];
        const v1_response_data = {
            statusCode: 200,
            data: {
                firstName: firstName,
                lastName: lastName,
                clientId: clientId
            }
        };

        const v2_pattern = /^([A-Z]+)0*([A-Z]+)0*([1-9]{3})([1-9]*)/g;
        const v2_array = [...(req.body.data).matchAll(v2_pattern)];
        var [firstName, lastName, clientId] = [v2_array[0][1], v2_array[0][2], `${v2_array[0][3]}-${v2_array[0][4]}`];
        const v2_response_data = {
            statusCode: 200,
            data: {
                firstName: firstName,
                lastName: lastName,
                clientId: clientId
            }
        };
    // }
    
    res.send(v2_response_data);
});

//env varible PORT
const port = process.env.PORT || 3000;
app.listen(port, () =>console.log(`EXPRESS on port ${port}...`));