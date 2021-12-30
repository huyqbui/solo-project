const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const cors = require('cors');

const DIST_DIR = path.join(__dirname, 'dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');
const mongodb = require('./mongoose/db');
const controller = require('./controllers/controller');

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('dist'));
app.use(cors());

// api routes
app.get('/', (req, res) => {
  res
    .status(200)
    .contentType('text/html')
    .sendFile(HTML_FILE, (err) => {
      if (err) {
        res.status(500).send(err);
      }
    });
});

app.post('/new/channel', controller.addChannel, (req, res) =>
  res.status(200).json(res.locals.newChannel)
);

app.use('*', (req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };

  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => {
  console.log(`The app server is running on port: ${port}`);
});

module.exports = app;
