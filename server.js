require('newrelic');
const express = require('express')
const dotenv = require('dotenv');
dotenv.load();

var Rollbar = require('rollbar');
var rollbar = new Rollbar(process.env.ROLLBAR_ACCESS_TOKEN);
const app = express()
const port = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('Hello chaos!'))

app.get('/error', (req, res) =>{
    try {
        throw new Error('something bad happened')
    } catch (error) {
        rollbar.error(error)
    }   
    res.send('Error posted to rollbar')
})

app.use(rollbar.errorHandler());

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
