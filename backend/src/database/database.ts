import { Database } from "bun:sqlite";

let DB: Database;

function GetDBConnection() {
  if (!DB) {
    DB = new Database("db.sqlite");
  }
  return DB;
}

function CreateTables() {
  let db = GetDBConnection();
  // Users
  db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    discordId TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
  // Workouts
  db.exec(`CREATE TABLE IF NOT EXISTS workouts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    workoutName TEXT NOT NULL,
    workoutDate DATETIME NOT NULL,
    workoutNotes TEXT NOT NULL,
    workoutType INTEGER NOT NULL,
    FOREIGN KEY (workoutType) REFERENCES workoutType(id)
  )`);
  // Workout Types
  db.exec(`CREATE TABLE IF NOT EXISTS workoutType (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    workoutType TEXT NOT NULL
  )`);
  // Events
  db.exec(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    eventType INTEGER NOT NULL,
    FOREIGN KEY (eventType) REFERENCES eventType(id)
  )`);
  // Event Types
  db.exec(`CREATE TABLE IF NOT EXISTS eventType (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    eventType TEXT NOT NULL
  )`);
  // Workout Events
  db.exec(`CREATE TABLE IF NOT EXISTS workoutEvent (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    workoutId INTEGER NOT NULL,
    FOREIGN KEY (workoutId) REFERENCES workout(id),
  )`);
}

export default GetDBConnection;
