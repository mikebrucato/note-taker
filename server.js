//DEPENDENCIES
const express = require('express')
const path = require('path')
const fs = require('fs')

var app = express()
var PORT = process.env.port || 3000

// setting up the express app to handle data parsing
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(__dirname + '../public'))

// fs read file function
fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err

    const notes = JSON.parse(data)
    
// ROUTES

// get route for api/notes
app.get("/api/notes", (req, res) => {
    res.json(notes)

})

// post route for api/notes
app.post("/api/notes", (req, res) => {
    const newNote = req.body
    notes.push(newNote)
    updateDb()
})

// gets notes with specific IDs
app.get("/api/notes/:id", (req, res,) => {
    res.json(notes[req.params.id])
})

// deletes notes with specific IDs
app.delete("/api/notes/:id", (req, res) => {
    notes(req.params.id)
    updateDb()
})

// gets user to index.html page
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

// gets user to notes.html page
app.get("/public/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

// updates db.json file
const updateDb = () => {
    fs.writeFile("db/db.json", JSON.stringify(notes, '\t'), (err, data) => {
        if (err) throw err
        return true
    })
    
  }

})


app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT)
})