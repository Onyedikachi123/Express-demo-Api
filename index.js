const Joi = require('joi');
const express = require('express');
const app = express();


// A piece of middleware
app.use(express.json());


const genres = [
{
    id: 1,
    name: 'Comedy'
}, 
{
    id: 2,
    name: 'Crime'
},
{
    id: 3,
    name: 'Action'
},
{
    id: 4,
    name: 'Romance'
},
{
    id: 5,
    name: 'Horror'
},
{
    id: 6,
    name: 'Mystery'
}
];

app.get('/', (req, res) => {
  res.send('Hello Kachi!!!');
});

// Getting the list of the genres
app.get('/api/genres', (req, res) => {
    res.send(genres);
});

// posting a genre
app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

 const genre = {
     id: genres.length + 1,
     name: req.body.name
 };
 genres.push(genre);
 res.send(genre);
});


app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with this ID is not find');
   
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
        

    genre.name = req.body.name;
    res.send(genre);
});


app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with this ID is not find');

    // delete
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
     

    res.send(genre);
});





function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };

   return Joi.validate(genre, schema);
}




// Getting a single genre / Looking for the genres
app.get('/api/genres/:id', (req, res) => {
const genre = genres.find(g => g.id === parseInt(req.params.id));
if(!genre) return res.status(404).send('The genre with this ID is not find');
 res.send(genre);
});





const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening in port ${port}`));