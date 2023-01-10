import fetch from 'node-fetch';

export async function get(req, res, next) {
    const lat = req.query.lat;
    const lon = req.query.lon;
    const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&lang=kr&units=metric`);
    const data = await result.json();
    res.json(data);
}