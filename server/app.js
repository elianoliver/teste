const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const TaskController = require('./src/controller');

const app = express();
const port = 3000;

const taskController = new TaskController();

app.use(cors());
app.use(bodyParser.json());

// Rotas para usuários
app.get('/users', (req, res) => {
  taskController.getAllUsers(req, res);
});

app.get('/users/:userId', (req, res) => {
  taskController.getUserById(req, res);
});

app.post('/users', (req, res) => {
  taskController.addUser(req, res);
});

app.put('/users/:id', (req, res) => {
  taskController.updateUser(req, res);
});

app.delete('/users/:id', (req, res) => {
  taskController.deleteUser(req, res);
});

// Rotas para alarmes
app.get('/alarms', (req, res) => {
  taskController.getAllAlarms(req, res);
});

app.get('/alarms/:id', (req, res) => {
  taskController.getAlarmById(req, res);
});

app.post('/alarms', (req, res) => {
  taskController.addAlarm(req, res);
});

app.put('/alarms/:id', (req, res) => {
  taskController.updateAlarm(req, res);
});

app.delete('/alarms/:id', (req, res) => {
  taskController.deleteAlarm(req, res);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});