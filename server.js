const express = require('express')
const path = require('path')
const fs = require('fs')

var app = express()
var port = process.env.port || 3000

// setting up the express app to handle data parsing
app.use(express.urlncoded({extended: true}))
app.use(express.json())



app.listen(PORT, function() {
    console.log('App listening  on PORT' + PORT)
})