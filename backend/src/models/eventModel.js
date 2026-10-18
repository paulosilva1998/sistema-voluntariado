const pool = require('../config/db');

/**
 * Modelo para manipulação de eventos e vagas na base de dados MySQL.
 */
class EventModel {
  /**
   * Obtém a lista completa de eventos registados.
   * @returns {Promise<Array<Object>>} Lista de eventos.
   */
  static async findAll() {
    const [rows] = await pool.query('SELECT * FROM events');
    return rows;
  }

  /**
   * Encontra um evento específico pelo seu identificador primário.
   * @param {number|string} id - ID do evento.
   * @returns {Promise<Object|null>} O registo do evento ou null se não for encontrado.
   */
  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM events WHERE id = ?', [id]);
    return rows[0] || null;
  }

  /**
   * Conta quantos voluntários estão inscritos num evento.
   * @param {number|string} eventId - ID do evento a analisar.
   * @returns {Promise<number>} Número de inscrições registadas.
   */
  static async countVolunteersInEvent(eventId) {
    const [rows] = await pool.query(
      'SELECT COUNT(*) as total FROM event_volunteers WHERE event_id = ?',
      [eventId]
    );
    return rows[0].total;
  }

  /**
   * Cria um novo registo de evento na base de dados.
   * @param {Object} eventData - Informações do novo evento.
   * @returns {Promise<Object>} Registo criado com o identificador atribuído.
   */
  static async create(eventData) {
    const { title, description, date, location, max_volunteers } = eventData;
    const [result] = await pool.query(
      'INSERT INTO events (title, description, date, location, max_volunteers) VALUES (?, ?, ?, ?, ?)',
      [title, description, date, location, max_volunteers]
    );
    return { id: result.insertId, ...eventData };
  }

  /**
   * Atualiza as informações de um evento existente.
   * @param {number|string} id - ID do evento a atualizar.
   * @param {Object} eventData - Novos dados do evento.
   * @returns {Promise<Object>} Objeto atualizado.
   */
  static async update(id, eventData) {
    const { title, description, date, location, max_volunteers } = eventData;
    await pool.query(
      'UPDATE events SET title = ?, description = ?, date = ?, location = ?, max_volunteers = ? WHERE id = ?',
      [title, description, date, location, max_volunteers, id]
    );
    return { id, ...eventData };
  }

  /**
   * Remove um evento da base de dados.
   * @param {number|string} id - ID do evento a eliminar.
   * @returns {Promise<boolean>} Retorna verdadeiro se a linha foi apagada com sucesso.
   */
  static async delete(id) {
    const [result] = await pool.query('DELETE FROM events WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = EventModel;
