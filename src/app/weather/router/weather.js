import express from 'express';
import { get } from '../controller/weather.js';

const router = express.Router();

router.get('/', get);

export default router;