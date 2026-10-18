const pool = require('../config/db');

/**
 * Modelo para manipulação de voluntários na base de dados MySQL.
 */
class VolunteerModel {
  /**
   * Lista todos os voluntários registados.
   * @returns {Promise<Array<Object>>} Lista de voluntários.
   */
  static async findAll() {
    const [rows] = await pool.query('SELECT * FROM volunteers');
    return rows;
  }

  /**
   * Obtém os dados de um voluntário pelo seu ID.
   * @param {number|string} id - ID do voluntário.
   * @returns {Promise<Object|null>} Registo do voluntário ou null.
   */
  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM volunteers WHERE id = ?', [
      id
    ]);
    return rows[0] || null;
  }

  /**
   * Insere um novo voluntário.
   * @param {Object} data - Dados do voluntário (name, email, phone, skills).
   * @returns {Promise<Object>} Objeto criado com o novo ID.
   */
  static async create(data) {
    const { name, email, phone, skills } = data;
    const [result] = await pool.query(
      'INSERT INTO volunteers (name, email, phone, skills) VALUES (?, ?, ?, ?)',
      [name, email, phone, skills]
    );
    return { id: result.insertId, ...data };
  }

  /**
   * Atualiza as informações cadastrais de um voluntário.
   * @param {number|string} id - ID do voluntário.
   * @param {Object} data - Dados atualizados.
   * @returns {Promise<Object>} Dados consolidados.
   */
  static async update(id, data) {
    const { name, email, phone, skills } = data;
    await pool.query(
      'UPDATE volunteers SET name = ?, email = ?, phone = ?, skills = ? WHERE id = ?',
      [name, email, phone, skills, id]
    );
    return { id, ...data };
  }

  /**
   * Apaga o registo de um voluntário.
   * @param {number|string} id - ID do voluntário.
   * @returns {Promise<boolean>} Sucesso da remoção.
   */
  static async delete(id) {
    const [result] = await pool.query('DELETE FROM volunteers WHERE id = ?', [
      id
    ]);
    return result.affectedRows > 0;
  }
}

module.exports = VolunteerModel;
