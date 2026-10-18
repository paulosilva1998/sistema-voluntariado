const VolunteerModel = require('../models/volunteerModel');

/**
 * Serviço responsável pela gestão e consistência de voluntários.
 */
class VolunteerService {
  /**
   * Devolve a relação de todos os voluntários.
   * @returns {Promise<Array<Object>>}
   */
  static async listVolunteers() {
    return await VolunteerModel.findAll();
  }

  /**
   * Regista um novo voluntário com validação de campos essenciais.
   * @param {Object} data - Dados do voluntário (name, email, phone, skills).
   * @returns {Promise<Object>}
   */
  static async createVolunteer(data) {
    if (!data.name || !data.email || !data.phone) {
      throw new Error(
        'Nome, e-mail e telefone são de preenchimento obrigatório.'
      );
    }

    return await VolunteerModel.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      skills: data.skills || ''
    });
  }

  /**
   * Atualiza as informações de um voluntário.
   * @param {number|string} id - ID do voluntário.
   * @param {Object} data - Dados a atualizar.
   * @returns {Promise<Object>}
   */
  static async updateVolunteer(id, data) {
    const existing = await VolunteerModel.findById(id);
    if (!existing) {
      throw new Error('Voluntário não encontrado para atualização.');
    }

    return await VolunteerModel.update(id, {
      name: data.name || existing.name,
      email: data.email || existing.email,
      phone: data.phone || existing.phone,
      skills: data.skills !== undefined ? data.skills : existing.skills
    });
  }

  /**
   * Remove o registo de um voluntário.
   * @param {number|string} id - ID do voluntário.
   * @returns {Promise<boolean>}
   */
  static async deleteVolunteer(id) {
    const deleted = await VolunteerModel.delete(id);
    if (!deleted) {
      throw new Error('Voluntário não encontrado para remoção.');
    }
    return true;
  }
}

module.exports = VolunteerService;
