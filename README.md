# Sistema de Gestão de Voluntariado - IFRS

Aplicação web full-stack desenvolvida para a gestão e divulgação de ações sociais e voluntários, estruturada com controlo de acessos por papéis (RBAC), autenticação via JSON Web Tokens (JWT), operações CRUD completas e documentação interativa através do Swagger (OpenAPI 3.0).

---

## 🛠️ Tecnologias Utilizadas

### Back-end
- **Node.js** e **Express**
- **MySQL2** (com suporte a conexões assíncronas por Promises)
- **JSON Web Token (jsonwebtoken)** para autenticação e sessões sem estado
- **Bcrypt / Hash de senhas** para armazenamento seguro de credenciais
- **Swagger UI Express** e **Swagger-JSDoc** para documentação da API
- **Dotenv** e **CORS**

### Front-end
- **React** (inicializado com **Vite**)
- **React Router** para controlo de rotas protegidas e navegação SPA
- **Axios** para consumo de serviços HTTP REST

### Base de Dados
- **MySQL** relacional

---

## 📂 Estrutura do Repositório

```text
sistema-voluntariado/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   └── swagger.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── eventController.js
│   │   │   └── volunteerController.js
│   │   ├── middlewares/
│   │   │   └── authMiddleware.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── eventRoutes.js
│   │   │   └── volunteerRoutes.js
│   │   └── server.js
│   ├── .env.example
│   ├── .env
│   ├── package.json
│   └── tests.rest
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Events.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Volunteers.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── database.sql
├── link_video.txt
└── README.md