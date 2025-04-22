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
        res.send(results)

    })
}
function store(req, res) {
    const { movie_id, name, vote, text } = req.body;

    const sql = 'INSERT INTO reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?)';

    connection.query(sql, [movie_id, name, vote, text], (err, result) => {
        if (err) {
            console.error('Query error:', err);
            return res.status(500).json({
                error: 'Errore durante il salvataggio',
                details: err.message
            });
        }

        res.status(201).json({
            message: 'Recensione aggiunta con successo',
            id: result.insertId
        });
    });
}

module.exports = {
    index,
    show,
    store,
}