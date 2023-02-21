// A Sudoku React/Express.js Web App that populates data from API with a choice of over 5000 puzzles. 
// By providing a user with the ability to play a game of Sudoku by choosing puzzle levels by difficulty and different themes


const router = require('express').Router();
const restricted = require('../auth/restricted-middleware.js')

const { Pool, Client } = require('pg')
const connectionString = 'postgres://postgres:omega2020database@omega2020.cbydc0au6atn.us-east-2.rds.amazonaws.com:5432/postgres'
const pool = new Pool({
  connectionString: connectionString,
})
pool.query("SELECT sudoku, solution, level, id FROM puzzle_table WHERE level='Diabolical' ORDER BY RANDOM() LIMIT 1;", (err, res) => {
  console.log(res.rows[0])
})
const client = new Client({
  connectionString: connectionString,
})
client.connect()
client.query('SELECT NOW()', (err, res) => {
  client.end()
})

router.get('/', (req, res, next) => {
  pool.query('SELECT sudoku, solution, level, id FROM puzzle_table ORDER BY RANDOM() LIMIT 1;',
              (q_err, q_res ) => {
                  res.json(q_res.rows[0])
                  if (q_err) {
                    res.send(q_err)
                  }
      })
})

router.get('/tough', (req, res, next) => {
  pool.query("SELECT sudoku, solution, level, id FROM puzzle_table WHERE level='Tough' ORDER BY RANDOM() LIMIT 1;",
              (q_err, q_res ) => {
                  res.json(q_res.rows[0])
                  if (q_err) {
                    res.send(q_err)
                  }
      })
})

router.get('/moderate', (req, res, next) => {
  pool.query("SELECT sudoku, solution, level, id FROM puzzle_table WHERE level='Moderate' ORDER BY RANDOM() LIMIT 1;",
              (q_err, q_res ) => {
                  res.json(q_res.rows[0])
                  if (q_err) {
                    res.send(q_err)
                  }
      })
})


router.get('/gentle', (req, res, next) => {
  pool.query("SELECT sudoku, solution, level, id FROM puzzle_table WHERE level='Gentle' ORDER BY RANDOM() LIMIT 1;",
              (q_err, q_res ) => {
                  res.json(q_res.rows[0])
                  if (q_err) {
                    res.send(q_err)
                  }
      })
})

router.get('/saved', (req, res, next, puzzleDs) => {
  pool.query(`SELECT solution FROM puzzle_table WHERE id=${puzzleDs};`,
              (q_err, q_res ) => {
                  res.json(q_res.rows[0])
                  if (q_err) {
                    res.send(q_err)
                  }
      })
})

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  pool.query(`SELECT sudoku, solution, level, id FROM puzzle_table where id = ${id};`,
              (q_err, q_res ) => {
                  res.json(q_res.rows[0])
                  if (q_err) {
                    res.send(q_err)
                  }
      })
})


module.exports = router;







