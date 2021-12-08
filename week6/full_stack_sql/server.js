const express = require('express')
const app = express()
const mysql = require('mysql')

//conect to db
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fullstack'
})

db.connect((err) =>{
    if(err)
        throw err;
    console.log('connection made')
})

// create db
app.get('/createDB', (req, res) =>{
    let sqlString = 'CREATE DATABASE fullstack'
    db.query(sqlString, (err, res) =>{
        if(err)
        throw err;
        console.log('database created')
        res.send('database created')
    })
})

//create table
app.get('/createTable', (req, res) =>{
    let sqlString = 'CREATE TABLE messages (id INT auto_increment, name VARCHAR(40), message VARCHAR(250), PRIMARY KEY(id))'
    db.query(sqlString, (err, res) =>{
        if(err)
        throw err;
        console.log('Table created')
        res.send('Table created')
    })
})

//insert row
app.get('/insertRow', (req, res) =>{
    let values = {name: 'Justin', message: 'my first post'}
    let sqlString = `INSERT INTO messages ${values}`
    db.query(sqlString, (err, res) =>{
        if(err)
        throw err;
        console.log('Insert executed')
        res.send('Insert executed')
    })
})

//get data
app.get('/getPosts', (req,res) =>{
    let sqlString = 'SELECT * FROM messages'
    db.query(sqlString, (err, res) =>{
        if(err)
        throw err;
        console.log(res)
        res.send('select query executed')
    })
})

//update post
app.get('/updatePost/:id', (req, res) =>{
    let newMessage = 'message updated'
    let sqlString = `UPDATE messages SET message = '${newMessage}' WHERE id = ${req.params.id}`
    db.query(sqlString, (err, res) =>{
        if(err)
        throw err;
        console.log(res)
        res.send('update query executed')
    })
})

//delete post
app.get('/deletePost/:id', (req, res) =>{
    let sqlString = `DELETE FROM messages WHERE id = ${req.params.id}`
    db.query(sqlString, (err, res) =>{
        if(err)
        throw err;
        console.log(res)
        res.send('delete query executed')
    })
})

app.listen('4000', () =>{
    console.log('sever open')
})