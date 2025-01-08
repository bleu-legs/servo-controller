const express = require('express');
const path = require('path');
const app = express();
const logger = require('./utils/logger');
const cors = require('cors');
const config = require('./config.json');

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/servo', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'servo.html'));
});

app.get('/control', (req, res) => {
    const { servo, degree } = req.query;

    if (!servo || isNaN(servo)) {
        return res.status(400).json({ error: 'Invalid or missing servo parameter. Must be a number.' });
    }

    if (!degree || isNaN(degree) || degree < 0 || degree > 180) {
        return res.status(400).json({ error: 'Invalid or missing degree parameter. Must be a number between 0 and 180.' });
    }

    const servoNumber = Number(servo);
    const servoDegree = Number(degree);

    console.log(`Received request: Servo ${servoNumber} set to ${servoDegree}°`);

    res.json({ message: `Servo ${servoNumber} set to ${servoDegree}°` });
});

app.listen(config.port, '0.0.0.0', () => {
  logger.info(`App is running at http://localhost:${config.port}`);
});