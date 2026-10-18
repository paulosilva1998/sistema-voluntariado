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
└── README.md
```

## Imagens:

<img width="1918" height="948" alt="1" src="https://github.com/user-attachments/assets/d48a32ec-d9dc-4755-80ac-d3e7422d64fd" />
<img width="1916" height="951" alt="2" src="https://github.com/user-attachments/assets/7f96de1c-3a28-461e-96f3-dc93c1e16e48" />
<img width="1912" height="942" alt="3" src="https://github.com/user-attachments/assets/983b0010-1f08-4f6a-825b-66dc9cf91b39" />
<img width="1913" height="946" alt="4" src="https://github.com/user-attachments/assets/9de88cda-7045-472e-b871-7b3105561983" />
<img width="1916" height="946" alt="5" src="https://github.com/user-attachments/assets/b6028846-17ba-4fc5-ad1d-b53438dc973a" />
<img width="1915" height="947" alt="6" src="https://github.com/user-attachments/assets/301af80c-edc3-4db7-b0c6-f652c863d695" />








