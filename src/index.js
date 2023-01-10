import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import morgan from 'morgan';
import weatherRouter from './app/weather/router/weather.js';

dotenv.config();
const app = express();

app.use(cors({
    origin: 'https://j-dea.github.io'
}));
app.use(morgan('combined'));
app.use(express.json());
app.use('/weather', weatherRouter);

app.use((req, res) => {
    res.sendStatus(404);
});

app.use((err, req, res, next) => {
    res.sendStatus(500);
});

https
    .createServer({
        ca: fs.readFileSync(`${process.env.SSL_PATH}/fullchain.pem`),
        key: fs.readFileSync(`${process.env.SSL_PATH}/privkey.pem`),
        cert: fs.readFileSync(`${process.env.SSL_PATH}/cert.pem`)
    }, app)
    .listen(process.env.PORT, () => {
        console.log(`Momentum API Service Listening on port ${process.env.PORT}`);
    });
