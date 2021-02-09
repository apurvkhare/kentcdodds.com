const path = require('path')
const express = require('express')
require('express-async-errors')
const {createRequestHandler} = require('@remix-run/express')

const app = express()

app.use(express.static('public'))

// This is here for start-server-and-run which makes a HEAD
// request to "/" for it to know that the server is ready.
app.head('/', (req, res) => res.sendStatus(200))

app.get('/__img/content/blog/*', (req, res) => {
  if (req.path.includes('..')) {
    // lol, nice try...
    res.sendStatus(400)
    return
  }
  res.sendFile(path.join(__dirname, req.path.replace('/__img', '')))
})

app.all(
  '*',
  createRequestHandler({
    getLoadContext() {
      return {}
    },
  }),
)

const port = process.env.PORT ?? 3000

app.listen(port, () => {
  console.log(`Express server started on http://localhost:${port}`)
})