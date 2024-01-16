const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', function (req, res) {
  res.json({
    message : "Welcome"
  })
})

const contactsRouter = require("./app/routes/contact.route")
    app.use("/api/contacts", contactsRouter);

module.exports = app;