const pool = require('../config/db');

/**
 * Procura um utilizador na base de dados através do e-mail.
 * @param {string} email - E-mail do utilizador a procurar.
 * @returns {Promise<Object|null>} Retorna os dados do utilizador ou null caso não exista.
 */
async function findByEmail(email) {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [
    email
  ]);
  return rows[0] || null;
}

module.exports = { findByEmail };
