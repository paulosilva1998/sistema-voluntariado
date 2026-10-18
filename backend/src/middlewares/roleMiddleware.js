/**
 * Middleware para controle de acesso baseado em perfis (RBAC)
 * @param {string} requiredRole - Papel necessário para acessar o recurso (ex: 'admin')
 */
function roleMiddleware(requiredRole) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({
        message: 'Acesso negado. Perfil não autorizado para esta operação.'
      });
    }
    return next();
  };
}

module.exports = roleMiddleware;
