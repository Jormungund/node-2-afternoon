const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const PC = require('./controllers/products_controller');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
massive( process.env.CONNECTION_STRING ).then( dbInstance => {
    app.set('db', dbInstance);
}).catch(err => console.log(err));
const port = process.env.PORT || 3000;

app.get('/api/products', PC.getAll);
app.get('/api/products/:id', PC.getOne)
app.post('/api/products', PC.create)
app.put('/api/products/:id', PC.update)
app.delete('/api/products/:id', PC.delete)


app.listen(port, ()=>{
    console.log('Listening on port', port);
});