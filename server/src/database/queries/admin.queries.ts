import { role } from "../../types/user.js";
import pool from "../index.js";

const db = {
  getHashedPassword: async function (name: string) {
    const response = await pool.query(
      "SELECT password FROM users WHERE username = $1",
      [name]
    );
    return response.rows;
  },
  findUserByName: async function (name: string) {
    const response = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [name]
    );
    return response.rows;
  },
  findUserByID: async function (id: string) {
    const response = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    return response.rows;
  },
  createUser: async function (name: string, email: string, password: string,role: role) {
    const response = await pool.query(
      "INSERT INTO users(username, email,password, role) VALUES ($1,$2,$3,$4) RETURNING id",
      [name, email, password, role]
    );
    return response.rows;
  },
  getUsers: async function () {
    const response = await pool.query(
      "select users.id, users.username,users.email,users.password, users.role,TO_CHAR(created_at, 'HH24:MI:SS  DD.MM.YYYY') AS created_at from users ORDER BY users.id ASC"
    );
    return response.rows;
  },
  editUser: async function (id: string, name: string) {
    const response = await pool.query(
      "UPDATE users SET username = $2  WHERE id = $1",
      [id, name]
    );
  },
};

export default db;
