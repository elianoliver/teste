const sqlite3 = require('sqlite3').verbose();

class TaskModel {
  constructor() {
    this.db = new sqlite3.Database('tasks.db');
    this.initDatabaseUsers();
    this.initDatabaseAlarms();
  }

  initDatabaseUsers() { // CRIA TABELA USUARIOS
    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        userId varchar PRIMARY KEY,
        username varchar not null,
        password varchar not null,
        title varchar,
        nome varchar,
        city varchar not null,
        unit char(1),
        is12Hour boolean,
        hideSec boolean,
        created_at timestamp default current_timestamp,
        role varchar
      )
    `;
    this.db.run(sql);
  }

  initDatabaseAlarms() { // CRIA TABELA ALARMS
    const sql = `
      CREATE TABLE IF NOT EXISTS alarms (
        id varchar PRIMARY KEY,
        description varchar not null,
        userId varchar,
        isActive boolean not null,
        isRepeating boolean,
        isSnoozeEnabled boolean,
        ringtone varchar,
        created_at timestamp default current_timestamp,
        FOREIGN KEY(userId) REFERENCES users(userId)
      )
    `;
    this.db.run(sql);
  }


  // GET ALL USERS
  getAllUsuarios(callback) {
    const sql = 'SELECT * FROM users';
    this.db.all(sql, (err, rows) => {
      callback(err, rows || []);  // Retorna um array vazio se rows for nulo
    });
  }

  // GET ALL ALARMS
  getAllAlarms(callback) {
    const sql = 'SELECT * FROM alarms';
    this.db.all(sql, (err, rows) => {
      callback(err, rows || []);  // Retorna um array vazio se rows for nulo
    });
  }

  // GET USER BY ID
  getUsersById(userId, callback) {
    const sql = 'SELECT * FROM users WHERE userId = ?';
    this.db.get(sql, [userId], (err, row) => {
      callback(err, row || {});
    });
  }

  // GET ALARMS BY ID
  getAlarmskById(id, callback) {
    const sql = 'SELECT * FROM alarms WHERE id = ?';
    this.db.get(sql, [id], (err, row) => {
      callback(err, row || {});
    });
  }

  // ADD USER
  addUser(userId, username, password, title, nome, city, unit, is12Hour, hideSec, created_at, role, callback) {
    const sql = 'INSERT INTO users (userId, username, password, title, nome, city, unit, is12Hour, hideSec, created_at, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    this.db.run(sql, [userId, username, password, title, nome, city, unit, is12Hour, hideSec, created_at, role], (err) => {
      callback(err, this.lastID);
    });
  }

  // ADD ALARM
  addAlarm(description, userId, isActive, isRepeating, isSnoozeEnabled, ringtone, created_at, callback) {
    const sql = 'INSERT INTO alarms (description, userId, isActive, isRepeating, isSnoozeEnabled, ringtone, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)';
    this.db.run(sql, [description, userId, isActive, isRepeating, isSnoozeEnabled, ringtone, created_at, callback], (err) => {
      callback(err, this.lastID);
    });
  }

  // UPDATE USER
  updateUser(userId, username, password, title, nome, city, unit, is12Hour, hideSec, created_at, role, callback) {
    const sql = 'UPDATE users SET username = ?, password = ?, title = ?, nome = ?, city = ?, unit = ?, is12Hour = ?, hideSec = ?, created_at = ?, role = ? WHERE userId = ?';
    this.db.run(sql, [username, password, title, nome, city, unit, is12Hour, hideSec, created_at, role, userId], function (err) {
      callback(err, this.changes);
    });
  }

  // UPDATE ALARM
  updateAlarm(description, userId, isActive, isRepeating, isSnoozeEnabled, ringtone, created_at, callback) {
    const sql = 'UPDATE alarms SET description = ?, userId = ?, isActive = ?, isRepeating = ?, isSnoozeEnabled = ?, ringtone = ?, created_at = ? WHERE id = ?';
    this.db.run(sql, [description, userId, isActive, isRepeating, isSnoozeEnabled, ringtone, created_at], function (err) {
      callback(err, this.changes);
    });
  }

  // DELETE USER
  deleteUser(userId, callback) {
    const sql = 'DELETE FROM users WHERE userId = ?';
    this.db.run(sql, [userId], function (err) {
      callback(err, this.changes);
    });
  }

  // DELETE ALARMS
  deleteAlarm(id, callback) {
    const sql = 'DELETE FROM alarms WHERE id = ?';
    this.db.run(sql, [id], function (err) {
      callback(err, this.changes);
    });
  }
}

module.exports = TaskModel;