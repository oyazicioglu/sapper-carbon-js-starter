import sirv from 'sirv';
import compression from 'compression';
import * as sapper from '@sapper/server';
import express from 'express';
import cors from 'cors';

const app = express();
const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression({ threshold: 0 }));

app.use(
    sirv('static', {
        dev,
        maxAge: 31536000,
        immutable: true,
    })
);

app.use(sapper.middleware());

app.listen(PORT, (err) => {
    if (err) console.log('error', err);
});
