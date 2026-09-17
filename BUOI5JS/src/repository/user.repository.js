import pool from "../config/db.config.js";

export const findAll = async ({ sortBy = "id", order = "asc" }) => {
  const validSortColumns = ["id", "name", "email", "age"];
  if (!validSortColumns.includes(sortBy)) {
    throw new Error(`Invalid sort column: ${sortBy}`);
  }

  const validOrder = ["asc", "desc"];
  if (!validOrder.includes(order.toLowerCase())) {
    throw new Error(`Invalid order: ${order}`);
  }

  const [rows] = await pool.query(`SELECT * FROM users ORDER BY ${sortBy} ${order}`);
  return rows;
};

export const findById = async (id) => {
  const [rows] = await pool.execute(
    "SELECT id, name, email, age, role, created_at, updated_at FROM users WHERE id = ?",
    [id]
  );
  return rows[0] || null;
};

export const findByEmail = async (email) => {
  const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0] || null;
};

export const create = async ({ name, email, password, age, role }) => {
  const [result] = await pool.execute(
    "INSERT INTO users (name, email, password, age, role) VALUES (?, ?, ?, ?, ?)",
    [name, email, password ?? null, age ?? null, role || "MEMBER"]
  );
  return findById(result.insertId);
};

export const update = async (id, { name, email, age }) => {
  await pool.execute(
    `UPDATE users 
     SET name = COALESCE(?, name), 
         email = COALESCE(?, email), 
         age = COALESCE(?, age) 
     WHERE id = ?`,
    [name ?? null, email ?? null, age ?? null, id]
  );
  return findById(id);
};

export const deleteById = async (id) => {
  const existingUser = await findById(id);
  if (!existingUser) return null;

  await pool.execute("DELETE FROM users WHERE id = ?", [id]);
  return existingUser;
};