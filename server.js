const express = require('express')
const path = require('path')
const fs = require('fs')

var app = express()
var PORT = process.env.port || 3000

// setting up the express app to handle data parsing
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(__dirname + '/public'))

// fs read file function
fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err

    let notes = JSON.parse(data)
})

// API routes

// get route for api/notes
app.get("/api/notes", (req, res) => {
    res.json(notes)
})

// post route for api/notes
app.post("/api/notes", (req, res) => {
    const newNotes = req.body
    notes.push(newNotes)
    updateDb()
})

// gets notes with specific IDs
app.get("/api/notes/:id", (req, res) => {
    res.json(notes[req.params.id])
})

app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT)
})