import express from 'express';
import bodyParser from 'body-parser';
import accountRouter from './api/routes/account.route';
import { connect } from 'mongoose';
import { mongoUri } from './config/config';

const app = express();
const PORT = 3000;

connect(mongoUri as string)
    .then(() => console.log('Connection to Mongo DB established'))


app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use('/accounts', accountRouter);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});