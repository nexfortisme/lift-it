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
  // Exersizes
  db.exec(`CREATE TABLE IF NOT EXISTS exersize (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    exersizeName TEXT NOT NULL,
    exersizeType INTEGER NOT NULL,
    FOREIGN KEY (exersizeType) REFERENCES exersizeType(id)
  )`);
  // Exersize Types
  db.exec(`CREATE TABLE IF NOT EXISTS exersizeType (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    exersizeType TEXT NOT NULL
  )`);
  // Workout Exersizes
  db.exec(`CREATE TABLE IF NOT EXISTS workoutExersize (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    workoutId INTEGER NOT NULL,
    FOREIGN KEY (workoutId) REFERENCES workout(id),
  )`);
}

export default GetDBConnection;
