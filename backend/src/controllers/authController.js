const AuthService = require('../services/authService');

/**
 * Controlador encarregado dos fluxos de autenticação e sessão.
 */
class AuthController {
  /**
   * Realiza a autenticação e devolve o token JWT.
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.authenticate(email, password);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(401).json({ message: err.message });
    }
  }

  /**
   * Retorna os dados da sessão na rota protegida do dashboard.
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static async getDashboard(req, res) {
    return res.status(200).json({
      message: 'Acesso validado com sucesso ao dashboard protegido!',
      user: req.user
    });
  }
}

module.exports = AuthController;
