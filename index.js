const express = require('express');
const app = express()
const path = require('path')
const {v4 : uuid}= require('uuid');
const methodOverride = require('method-override')
uuid();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('__method'))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

let comments = [
    {
        id: uuid(),
        username: 'bailey',
        comment: 'i am a cat'
    },
    {
        id: uuid(),
        username: 'lola',
        comment: 'i am also a cat'
    }
]
app.listen(3000, () =>{
    console.log("Listening");
})

//get request for rendering data to index
app.get('/comments', (req, res) =>{
    res.render('comments/index', {comments})

})
//post request for posting the data to the console
app.post('/comments', (req, res) => {
    const {comment, username} = req.body;
    comments.push({username,comment, id: uuid()})
    res.redirect('/comments')
})
//get request for entering data into the form and getting the data from the form
app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})


app.get('/comments/:id', (req, res) =>{
    //view
    const {id} = req.params;
    const comment = comments.find(c => c.id === id )
    res.render('comments/show', {comment} )
})

app.get('/comments/:id/edit', (req,res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === id )
    res.render('comments/edit', {comment})
})

app.patch('/comments/:id', (req, res) => {
    //update
    const {id} = req.params;
    const foundComment = comments.find(c => c.id === id )
    const newComment = req.body.comment
    foundComment.comment = newComment;
    res.redirect('/comments');
})

app.delete('/comments/:id', (req, res) => {
    //delete
    const {id} = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments')
})
