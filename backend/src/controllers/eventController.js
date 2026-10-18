const EventService = require('../services/eventService');

/**
 * Controlador de eventos e ações sociais.
 */
class EventController {
  /**
   * Devolve a lista de todos os eventos registados.
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static async getAll(req, res) {
    try {
      const data = await EventService.listEvents();
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  /**
   * Cria um novo evento.
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static async create(req, res) {
    try {
      const created = await EventService.createEvent(req.body);
      return res.status(201).json(created);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  /**
   * Atualiza as informações de um evento.
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static async update(req, res) {
    try {
      const updated = await EventService.updateEvent(req.params.id, req.body);
      return res.status(200).json(updated);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  /**
   * Remove um evento da base de dados.
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static async remove(req, res) {
    try {
      await EventService.deleteEvent(req.params.id);
      return res.status(204).send();
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
}

module.exports = EventController;
