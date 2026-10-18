import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        padding: "12px 24px",
        backgroundColor: "#005f27",
        color: "#ffffff",
      }}
    >
      <strong style={{ fontSize: "18px", marginRight: "10px" }}>
        IFRS Voluntariado
      </strong>
      <Link style={{ color: "#ffffff", textDecoration: "none" }} to="/events">
        Eventos
      </Link>
      <Link
        style={{ color: "#ffffff", textDecoration: "none" }}
        to="/volunteers"
      >
        Voluntários
      </Link>
      {token && (
        <Link
          style={{ color: "#ffffff", textDecoration: "none" }}
          to="/dashboard"
        >
          Dashboard
        </Link>
      )}

      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        {token ? (
          <>
            <span
              style={{
                fontSize: "14px",
                background: "rgba(255,255,255,0.2)",
                padding: "4px 8px",
                borderRadius: "4px",
              }}
            >
              Perfil: <strong>{role}</strong>
            </span>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Sair
            </button>
          </>
        ) : (
          <Link
            style={{
              color: "#ffffff",
              textDecoration: "none",
              backgroundColor: "#198754",
              padding: "6px 14px",
              borderRadius: "4px",
            }}
            to="/login"
          >
            Entrar
          </Link>
        )}
      </div>
    </nav>
  );
}
