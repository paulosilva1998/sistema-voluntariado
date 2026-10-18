import { useEffect, useState } from "react";
import api from "../services/api";

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState("");

  const fetchVolunteers = () => {
    api.get("/volunteers").then((res) => setVolunteers(res.data));
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await api.post("/volunteers", { name, email, phone, skills });
    setName("");
    setEmail("");
    setPhone("");
    setSkills("");
    fetchVolunteers();
  };

  const handleDelete = async (id) => {
    await api.delete(`/volunteers/${id}`);
    fetchVolunteers();
  };

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "0 auto" }}>
      <h2>Gerenciamento de Voluntários</h2>

      <form
        onSubmit={handleCreate}
        style={{
          marginBottom: "30px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      >
        <h3>Cadastrar Novo Voluntário</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            marginBottom: "12px",
          }}
        >
          <input
            placeholder="Nome Completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            placeholder="Telefone / WhatsApp"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            placeholder="Habilidades (ex: Enfermagem, Cozinha)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            background: "#005f27",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Cadastrar Voluntário
        </button>
      </form>

      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}
      >
        <thead style={{ background: "#f2f2f2" }}>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>Habilidades</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map((vol) => (
            <tr key={vol.id}>
              <td>{vol.id}</td>
              <td>{vol.name}</td>
              <td>{vol.email}</td>
              <td>{vol.phone}</td>
              <td>{vol.skills}</td>
              <td>
                <button
                  onClick={() => handleDelete(vol.id)}
                  style={{
                    background: "#dc3545",
                    color: "#fff",
                    border: "none",
                    padding: "4px 8px",
                    cursor: "pointer",
                  }}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
