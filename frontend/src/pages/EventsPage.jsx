import { useEffect, useState } from "react";
import api from "../services/api";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [maxVolunteers, setMaxVolunteers] = useState(20);
  const [error, setError] = useState("");

  const role = localStorage.getItem("role");

  const fetchEvents = () => {
    api.get("/events").then((res) => setEvents(res.data));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/events", {
        title,
        description,
        date,
        location,
        max_volunteers: Number(maxVolunteers),
      });
      setTitle("");
      setDescription("");
      setDate("");
      setLocation("");
      setError("");
      fetchEvents();
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao cadastrar evento.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/events/${id}`);
      fetchEvents();
    } catch (err) {
      alert(err.response?.data?.message || "Sem autorização para excluir.");
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "0 auto" }}>
      <h2>Ações Sociais e Eventos</h2>

      {role === "admin" ? (
        <form
          onSubmit={handleCreate}
          style={{
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        >
          <h3>Cadastrar Novo Evento (Acesso Admin)</h3>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              marginBottom: "10px",
            }}
          >
            <input
              placeholder="Título do Evento"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              placeholder="Local"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Limite Máximo de Voluntários"
              value={maxVolunteers}
              onChange={(e) => setMaxVolunteers(e.target.value)}
              required
            />
          </div>
          <input
            placeholder="Descrição da ação"
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "12px",
              boxSizing: "border-box",
            }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
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
            Salvar Evento
          </button>
        </form>
      ) : (
        <p style={{ color: "#666", fontStyle: "italic" }}>
          * Para cadastrar novos eventos, efetue login como administrador.
        </p>
      )}

      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}
      >
        <thead style={{ background: "#f2f2f2" }}>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Data</th>
            <th>Local</th>
            <th>Vagas</th>
            {role === "admin" && <th>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {events.map((ev) => (
            <tr key={ev.id}>
              <td>{ev.id}</td>
              <td>{ev.title}</td>
              <td>{ev.date ? ev.date.substring(0, 10) : ""}</td>
              <td>{ev.location}</td>
              <td>{ev.max_volunteers}</td>
              {role === "admin" && (
                <td>
                  <button
                    onClick={() => handleDelete(ev.id)}
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
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
