const express = require('express');
const router = express.Router();
const EventController = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Lista todos os eventos cadastrados
 *     tags: [Eventos]
 *     responses:
 *       200:
 *         description: Lista de eventos retornada com sucesso.
 */
router.get('/', EventController.getAll);

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Cadastra um novo evento social (Requer perfil admin)
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - date
 *               - location
 *             properties:
 *               title:
 *                 type: string
 *                 example: Campanha de Agasalho 2026
 *               description:
 *                 type: string
 *                 example: Recolha de agasalhos e cobertores
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2026-11-25
 *               location:
 *                 type: string
 *                 example: Pavilhão Central IFRS
 *               max_volunteers:
 *                 type: integer
 *                 example: 30
 *     responses:
 *       201:
 *         description: Evento criado com sucesso.
 *       400:
 *         description: Dados obrigatórios ausentes.
 *       401:
 *         description: Não autenticado.
 *       403:
 *         description: Acesso negado. Requer papel de administrador.
 */
router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin'),
  EventController.create
);
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  EventController.update
);
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  EventController.remove
);

module.exports = router;
