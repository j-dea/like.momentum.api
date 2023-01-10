import dotenv from 'dotenv';
import express from 'express';
import weatherRouter from './app/weather/router/weather.js';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://localhost:5500'
}));
app.use(express.json());
app.use('/weather', weatherRouter);

app.use((req, res) => {
    res.sendStatus(404);
});

app.use((err, req, res, next) => {
    res.sendStatus(500);
});

app.listen(process.env.PORT, () => {
    console.log(`Momentum API Service Listening on port ${process.env.PORT}`);
});