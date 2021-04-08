import express from 'express';
import path from 'path';

const app: express.Application = express();

app.use('/', express.static('../build/'));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

export default app;