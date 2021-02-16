// DEPENDENCIES
const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
const PORT = process.env.port || 3030


// setting up the express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(__dirname + '/public'))

// ROUTES

// *** HTML ROUTES *** //

// takes user to the index.html page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"))
})

// takes user to the notes.html page
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"))
})


// *** API ROUTES *** //

// takes user to the db.json
app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "db/db.json"))
})

//creates new notes from JSON
app.post("/api/notes", function (req, res) {
    fs.readFile(path.join(__dirname, "db/db.json"), (err, data) => {
        if (err) throw err

        // new note variables
        let newNote = JSON.parse(data)
        let notes = req.body
        // adds new ID to every note
        let noteID = newNote.length + 1
        // variable that creates the next new note
        let nextNote = { id: noteID, title: notes.title, text: notes.text }
        // pushes new note to array
        newNote.push(nextNote)
        // response
        res.json(notes)

        // writes new note to the db.json
        fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(newNote), (err, data) => {
            if (err) throw err
            console.log("Your note has been created!")
        })
    })
})

// deletes notes from db.json
app.delete("/api/notes/:id", (req, res) => {
    // reads db.json to access notes array
    fs.readFile("db/db.json", (err, data) => {
        let note = JSON.parse(data)
        let deletedNote = req.body
        note.splice(deletedNote, 1)
        // writes updated array to db.json
        fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(note), (err, data) => {
            if (err) throw err
            console.log("Your note has been deleted!")
            
        })
    })
})



app.listen(PORT, function () {
    console.log('App listening on PORT ' + PORT)
})