const TaskModel = require('./model');

class TaskController {
  constructor() {
    this.taskModel = new TaskModel();
  }

  getAllUsers(req, res) {
    this.taskModel.getAllUsuarios((err, users) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(users);
    });
  }

  getAllAlarms(req, res) {
    this.taskModel.getAllAlarms((err, alarms) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(alarms);
    });
  }

  getUserById(req, res) {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ error: 'Invalid input' });
    }
    this.taskModel.getUserskById(userId, (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (!user.userId) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    });
  }

  getAlarmById(req, res) {
    const alarmId = req.params.id;
    if (!alarmId) {
      return res.status(400).json({ error: 'Invalid input' });
    }
    this.taskModel.getAlarmskById(alarmId, (err, alarm) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (!alarm.id) {
        return res.status(404).json({ error: 'Alarm not found' });
      }

      res.json(alarm);
    });
  }

  addUser(req, res) {
    const { userId, username, password, title, nome, city, unit, is12Hour, hideSec, created_at, role } = req.body;
    if (!userId || !username || !password || !city) {
      return res.status(400).json({ error: 'Invalid input' });
    }
    this.taskModel.addUser(userId, username, password, title, nome, city, unit, is12Hour, hideSec, created_at, role, (err, userId) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json({ userId, username, password, title, nome, city, unit, is12Hour, hideSec, created_at, role });
    });
  }

  addAlarm(req, res) {
    const { description, userId, isActive, isRepeating, isSnoozeEnabled, ringtone, created_at } = req.body;
    if (!description || !userId || isActive === undefined) {
      return res.status(400).json({ error: 'Invalid input' });
    }
    this.taskModel.addAlarm(description, userId, isActive, isRepeating, isSnoozeEnabled, ringtone, created_at, (err, alarmId) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json({ id: alarmId, description, userId, isActive, isRepeating, isSnoozeEnabled, ringtone, created_at });
    });
  }

  updateUser(req, res) {
    const { userId, username, password, title, nome, city, unit, is12Hour, hideSec, created_at, role } = req.body;
    if (!userId || !username || !password || !city) {
      return res.status(400).json({ error: 'Invalid input' });
    }
    this.taskModel.updateUser(userId, username, password, title, nome, city, unit, is12Hour, hideSec, created_at, role, (err, affectedRows) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({ userId, username, password, title, nome, city, unit, is12Hour, hideSec, created_at, role });
    });
  }

  updateAlarm(req, res) {
    const { id, description, userId, isActive, isRepeating, isSnoozeEnabled, ringtone, created_at } = req.body;
    if (!id || !description || !userId || isActive === undefined) {
      return res.status(400).json({ error: 'Invalid input' });
    }
    this.taskModel.updateAlarm(id, description, userId, isActive, isRepeating, isSnoozeEnabled, ringtone, created_at, (err, affectedRows) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (affectedRows === 0) {
        return res.status(404).json({ error: 'Alarm not found' });
      }

      res.json({ id, description, userId, isActive, isRepeating, isSnoozeEnabled, ringtone, created_at });
    });
  }

  deleteUser(req, res) {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ error: 'Invalid input' });
    }
    this.taskModel.deleteUser(userId, (err, affectedRows) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({ success: true, userId });
    });
  }

  deleteAlarm(req, res) {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: 'Invalid input' });
    }
    this.taskModel.deleteAlarm(id, (err, affectedRows) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (affectedRows === 0) {
        return res.status(404).json({ error: 'Alarm not found' });
      }

      res.json({ success: true, id });
    });
  }
}

module.exports = TaskController;