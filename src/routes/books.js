const express = require('express');
const router = express.Router();
const moment = require('moment');
const mysqlConnection = require('../database');

router.get('/book', (req, res) => {
    mysqlConnection.query('SELECT * FROM BOOK', (err, rows, fields) => {
        if(!err){
            rows.forEach(function(row) {
                row.release_date = moment(row.release_date).utc().format('YYYY-MM-DD');
            });
            res.json(rows);
        }else{
            console.log(err)
        }
    });
});

router.get('/book/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM book WHERE id = ?', [id], (err, rows, fields) => {
        if(!err){
            rows.forEach(function(row) {
                row.release_date = moment(row.release_date).utc().format('YYYY-MM-DD');
            });
            res.json(rows[0]);
        }else{
            console.log(err)
        }
    })
});

router.get('/book/search/:title', (req, res) => {
    const { title } = req.params;
    mysqlConnection.query('SELECT * FROM book WHERE book_name = ?', [title], (err, rows, fields) => {
        if(!err){
            rows.forEach(function(row) {
                row.release_date = moment(row.release_date).utc().format('YYYY-MM-DD');
            });
            res.json(rows);
        }else{
            console.log(err)
        }
    })
});

router.post('/book', (req, res) => {
        const { id, name, release_date, description } = req.body;
        const img_url = '/uploads/img/' + req.file.filename;
        const query = `
            CALL booksAddOrEdit(?, ?, ?, ?, ?);
        `;
        mysqlConnection.query(query, [id, name, release_date, description, img_url], (err, rows, fields) => {
            if(!err){
                res.json({Status: 'Book Saved'});
            } else{
                console.log(err);
            }
        });
});

router.post('/book/img', (req, res) => {
    console.log(req.file);
    res.send('img guardada');
});

router.put('/book/:id', (req, res) => {
    const { id } = req.params;
    const {name, release_date, description } = req.body;
    const img_url = '/uploads/img' + req.file.filename;
    const query = `
        CALL booksAddOrEdit(?, ?, ?, ?, ?);
    `;

    mysqlConnection.query(query, [id, name, release_date, description, img_url], (err, rows, fields) => {
        if(!err){
            res.json({Status: 'Book Update!!'});
        } else{
            console.log(err);
        }
    });
});

router.delete('/book/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM book WHERE id = ?', [id], (err, rows, fields) => {
        if(!err){
            res.json({Status: 'Book Delete!!'});
        } else{
            console.log(err);
        }
    });
});

module.exports = router;