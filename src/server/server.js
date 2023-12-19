import express from 'express';
import userRouter from './routes/userRouter.js';
import subscriptionRouter from './routes/subscriptionRouter.js';

const port = 3000;

const app = express();

app.use(express.json());

app.use('/user', userRouter);
app.use('/subscription', subscriptionRouter);

app.use('*', (req, res) => res.sendStatus(404));

app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Express server caught unknown middleware error',
    status: 500,
    message: { err: 'An error occured' },
  };
  const errorObj = Object.assign(defaultError, err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => {
  console.log(`🚀 All systems go! Express server is listening at port ${port}`);
});
