
// Save your local vars in .env for testing. DO NOT VERSION CONTROL `.env`!.
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') require('dotenv').config({
    path: './server/sample.env'
});

import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as chalk from 'chalk';
import * as Kcors from 'kcors';

import router from './routes';

const app = new Koa();
const port = process.env.PORT || 8888;

app.use(Kcors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port, () => console.log(chalk.black.bgGreen.bold(`listening on port ${port}`)));

export default app;