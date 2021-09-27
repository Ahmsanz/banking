import express from 'express';
import accountRouter from './api/routes/account.route';
import { connect } from 'mongoose';
import { mongoUri } from './config/config';
import userRouter from './api/routes/user.route';
import transactionRouter from './api/routes/transaction.route';
import connectionRouter from './api/routes/connection.route';
import { authenticateToken } from './api/services/user.service';

const app = express();
const PORT = 3000;

connect(mongoUri as string)
    .then(() => console.log('Connection to Mongo DB established'))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('You are now accessing the API. Welcome!');
});

app.use('/accounts', authenticateToken, accountRouter);
app.use('/users', userRouter);
app.use('/transactions', authenticateToken, transactionRouter);
app.use('/connections', authenticateToken, connectionRouter);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});