const express = require('express')
const cors = require('cors')
const app = express();
const port = 3002
const connection = require('./data/db')
console.log('im in');

app.use(cors({
    origin: 'http://localhost:5174'
}))

const moviesRouter = require('./routers/movies')
app.use(express.json())
app.use('/movies', moviesRouter)
app.use(express.static('movies_cover'))


//middlewares
const serverError = (err, req, res, next) => {
    console.error(err.stack)
    res.status(500)
    res.json({
        error: '500 internal server error',
        message: err.message
    })

}

const notFound = (req, res, next) => {
    res.status(404);
    res.json({
        error: '404 not found',
        message: 'pagina non trovata'
    })
}



app.use(notFound)
app.use(serverError)



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);

})