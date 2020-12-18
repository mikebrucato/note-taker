// DEPENDENCIES
const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()
var PORT = process.env.port || 3000

// setting up the express app to handle data parsing
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(__dirname + '/public'))

// ROUTES

// takes user to the index.html page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

// takes user to the notes.html page
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

// takes user to the db.json
app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "db/db.json"))
})




app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT)
})