import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import router from './routes/router.js';

const app = new Koa();

const port = 4000;

app.use(cors());
app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
