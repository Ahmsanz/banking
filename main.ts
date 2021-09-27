import express from 'express';
import bodyParser from 'body-parser';
import accountRouter from './api/routes/account.route';
import { connect } from 'mongoose';
import { mongoUri } from './config/config';
import userRouter from './api/routes/user.route';
import transactionRouter from './api/routes/transaction.route';
import connectionRouter from './api/routes/connection.route';

const app = express();
const PORT = 3000;

connect(mongoUri as string)
    .then(() => console.log('Connection to Mongo DB established'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('You are now accessing the API. Welcome!');
});

app.use('/accounts', accountRouter);
app.use('/users', userRouter);
app.use('/transactions', transactionRouter);
app.use('/connections', connectionRouter);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});