import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [msg, setMsg] = useState("Carregando informações da rota protegida...");

  useEffect(() => {
    api
      .get("/dashboard")
      .then((res) => {
        setData(res.data);
        setMsg("");
      })
      .catch((err) => {
        setMsg(
          err.response?.data?.message ||
            "Acesso negado. Faça login para continuar.",
        );
      });
  }, []);

  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Painel Dashboard (Área Protegida JWT)</h2>
      {msg && <p>{msg}</p>}
      {data && (
        <div
          style={{
            padding: "20px",
            border: "1px solid #4caf50",
            borderRadius: "6px",
            background: "#f9fff9",
          }}
        >
          <p>
            <strong>Status:</strong> {data.message}
          </p>
          <p>
            <strong>Usuário Logado:</strong> {data.user.email}
          </p>
          <p>
            <strong>Permissão (Role):</strong> {data.user.role}
          </p>
        </div>
      )}
    </div>
  );
}
