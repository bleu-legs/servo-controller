const express = require('express');
const path = require('path');
const { exec } = require('child_process');  // Import exec to run shell commands
const app = express();
const logger = require('./utils/logger');
const cors = require('cors');
const config = require('./config.json');

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'servo.html'));
});

app.get('/control', (req, res) => {
    const { servo, degree } = req.query;

    // Validate servo and degree parameters
    if (!servo || isNaN(servo)) {
        return res.status(400).json({ error: 'Invalid or missing servo parameter. Must be a number.' });
    }

    if (!degree || isNaN(degree) || degree < 0 || degree > 180) {
        return res.status(400).json({ error: 'Invalid or missing degree parameter. Must be a number between 0 and 180.' });
    }

    const servoNumber = Number(servo);
    const servoDegree = Number(degree);

    console.log(`Received request: Servo ${servoNumber} set to ${servoDegree}°`);

    // Construct the command to run the Python script to move the servo
    const command = `python3 servo/cmd.py ${servoNumber} ${servoDegree}`;

    // Execute the Python script
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing python script: ${error}`);
            return res.status(500).json({ error: 'Failed to move servo' });
        }

        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).json({ error: 'Failed to move servo' });
        }

        console.log(stdout);  // Log the output from the Python script

        // Send the response to the client
        return res.json({ message: `Servo ${servoNumber} set to ${servoDegree}°` });
    });
});

app.listen(config.port, '0.0.0.0', () => {
  logger.info(`App is running at http://localhost:${config.port}`);
});
