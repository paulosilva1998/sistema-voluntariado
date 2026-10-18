const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autentica o utilizador e devolve o token JWT
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@ifrs.edu.br
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Autenticação realizada com sucesso.
 *       401:
 *         description: Credenciais inválidas.
 */
router.post('/login', AuthController.login);

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Painel principal protegido por autenticação JWT
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Acesso autorizado ao painel.
 *       401:
 *         description: Token ausente, inválido ou expirado.
 */
router.get('/dashboard', authMiddleware, AuthController.getDashboard);

module.exports = router;
