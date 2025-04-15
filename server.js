const express = require('express')
const app = express();
const port = 3002
const connection = require('./data/db')

app.use(express.json())




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


app.use(serverError)

app.use(notFound)


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);

})