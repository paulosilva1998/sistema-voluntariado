require('dotenv').config();
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const SECRET = process.env.JWT_SECRET || 'chave_secreta_jwt_ifrs_2026';

/**
 * Serviço responsável pela lógica de autenticação de utilizadores.
 */
class AuthService {
  /**
   * Valida as credenciais e gera o token de autenticação JWT.
   * @param {string} email - E-mail informado pelo utilizador.
   * @param {string} password - Senha enviada na requisição.
   * @returns {Promise<{token: string, user: {email: string, role: string, name: string}}>}
   */
  static async authenticate(email, password) {
    if (!email || !password) {
      throw new Error('E-mail e senha são obrigatórios.');
    }

    const user = await userModel.findByEmail(email);
    if (!user || user.password !== password) {
      throw new Error('Credenciais inválidas.');
    }

    // Payload obrigatório conforme especificação da prova
    const payload = {
      email: user.email,
      role: user.role
    };

    const token = jwt.sign(payload, SECRET, { expiresIn: '8h' });

    return {
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }
}

module.exports = AuthService;
