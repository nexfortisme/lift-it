import { Database } from "bun:sqlite";

let DB: Database;

function GetDBConnection() {
  if (!DB) {
    DB = new Database("db.sqlite");
  }
  return DB;
}

export default GetDBConnection;
