const path = require('path');
const express = require('express');

// Start Express App
const app = express();
app.enable('trust-proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Bodyparser
app.use(
  express.json({
    limit: '10kb',
  })
);
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).render('index');
});

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION 🎇 Shutting down...');
  console.log(err);
  process.exit(1);
});

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION 🎇 Shutting down...');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
