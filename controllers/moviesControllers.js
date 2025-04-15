const connection = require('../data/db')

function index(req, res) {
    const sql = 'SELECT * FROM movies'
    console.log('loading');

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'db query failed' })
        console.log(results);

        res.json(results)
    })
}
function show(req, res) {
    const sql = 'SELECT * FROM movies JOIN reviews ON movies.id = reviews.movie_id WHERE movies.id = ?'
    const { id } = req.params;
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'error durying showing' })
        res.send(results[0])

    })
}
module.exports = {
    index,
    show,
}