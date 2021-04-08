import express from 'express';
import path from 'path';

const port = process.env.PORT || 8080;

const app: express.Application = express();

app.use('/', express.static('../build/'));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Elevators is listening on port ${port}!`);
});