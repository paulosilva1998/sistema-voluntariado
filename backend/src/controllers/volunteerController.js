const VolunteerService = require('../services/volunteerService');

/**
 * Controlador para a gestão de voluntários.
 */
class VolunteerController {
  /**
   * Lista todos os voluntários registados.
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static async getAll(req, res) {
    try {
      const data = await VolunteerService.listVolunteers();
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  /**
   * Cadastra um novo voluntário.
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static async create(req, res) {
    try {
      const created = await VolunteerService.createVolunteer(req.body);
      return res.status(201).json(created);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  /**
   * Atualiza o registo de um voluntário.
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static async update(req, res) {
    try {
      const updated = await VolunteerService.updateVolunteer(
        req.params.id,
        req.body
      );
      return res.status(200).json(updated);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  /**
   * Exclui um voluntário do sistema.
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static async remove(req, res) {
    try {
      await VolunteerService.deleteVolunteer(req.params.id);
      return res.status(204).send();
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
}

module.exports = VolunteerController;
