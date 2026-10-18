const EventModel = require('../models/eventModel');

/**
 * Serviço que implementa as regras de negócio dos eventos e ações sociais.
 */
class EventService {
  /**
   * Retorna todos os eventos disponíveis.
   * @returns {Promise<Array<Object>>}
   */
  static async listEvents() {
    return await EventModel.findAll();
  }

  /**
   * Regista um novo evento após validar os campos obrigatórios.
   * @param {Object} data - Dados do evento (title, description, date, location, max_volunteers).
   * @returns {Promise<Object>}
   */
  static async createEvent(data) {
    if (!data.title || !data.date || !data.location) {
      throw new Error('Os campos título, data e local são obrigatórios.');
    }

    const eventPayload = {
      title: data.title,
      description: data.description || '',
      date: data.date,
      location: data.location,
      max_volunteers: data.max_volunteers ? Number(data.max_volunteers) : 20
    };

    return await EventModel.create(eventPayload);
  }

  /**
   * Atualiza as informações de um evento existente.
   * @param {number|string} id - ID do evento.
   * @param {Object} data - Novos dados.
   * @returns {Promise<Object>}
   */
  static async updateEvent(id, data) {
    const existing = await EventModel.findById(id);
    if (!existing) {
      throw new Error('Evento não encontrado para atualização.');
    }

    const updatedPayload = {
      title: data.title || existing.title,
      description:
        data.description !== undefined
          ? data.description
          : existing.description,
      date: data.date || existing.date,
      location: data.location || existing.location,
      max_volunteers: data.max_volunteers
        ? Number(data.max_volunteers)
        : existing.max_volunteers
    };

    return await EventModel.update(id, updatedPayload);
  }

  /**
   * Remove um evento da base de dados.
   * @param {number|string} id - ID do evento a eliminar.
   * @returns {Promise<boolean>}
   */
  static async deleteEvent(id) {
    const deleted = await EventModel.delete(id);
    if (!deleted) {
      throw new Error('Evento não encontrado para remoção.');
    }
    return true;
  }

  /**
   * Valida se um evento atingiu a lotação limite de voluntários.
   * @param {number|string} eventId - Identificador do evento.
   * @returns {Promise<boolean>}
   */
  static async validateCapacity(eventId) {
    const event = await EventModel.findById(eventId);
    if (!event) {
      throw new Error('Evento não encontrado.');
    }

    const currentCount = await EventModel.countVolunteersInEvent(eventId);
    if (currentCount >= event.max_volunteers) {
      throw new Error(
        'O limite máximo de voluntários para este evento já foi atingido.'
      );
    }

    return true;
  }
}

module.exports = EventService;
