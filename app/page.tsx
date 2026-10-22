
"use client";

import { useState } from "react";

export default function Home() {
  const [pagina, setPagina] = useState("inicio");

  const boton = {
    background: "#f97316",
    color: "white",
    border: "none",
    borderRadius: 10,
    padding: "14px 20px",
    cursor: "pointer"
  };

  return (
    <main style={{
      minHeight: "100vh",
      background: "#fff7ed",
      fontFamily: "Arial, sans-serif",
      color: "#292524"
    }}>
      <header style={{
        background: "#ea580c",
        color: "white",
        padding: 25,
        textAlign: "center"
      }}>
        <h1 style={{ fontSize: 38, margin: 0 }}>
          RapiBite
        </h1>
        <p>Lo bueno llega rápido</p>
        <p>Charlotte, North Carolina</p>
      </header>

      <nav style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 10,
        padding: 20
      }}>
        {[
          ["inicio", "Inicio"],
          ["restaurantes", "Restaurantes"],
          ["pedidos", "Mis pedidos"],
          ["cuenta", "Mi cuenta"]
        ].map(([id, nombre]) => (
          <button
            key={id}
            onClick={() => setPagina(id)}
            style={{
              ...boton,
              background:
                pagina === id ? "#ea580c" : "#fed7aa",
              color:
                pagina === id ? "white" : "#7c2d12"
            }}
          >
            {nombre}
          </button>
        ))}
      </nav>

      <section style={{
        maxWidth: 800,
        margin: "auto",
        padding: 25,
        textAlign: "center"
      }}>
        {pagina === "inicio" && (
          <>
            <h2>¡Bienvenido a RapiBite!</h2>
            <p>
              La comida que te encanta,
              entregada directamente a tu puerta.
            </p>
            <button
              style={boton}
              onClick={() => setPagina("restaurantes")}
            >
              Explorar restaurantes
            </button>
          </>
        )}

        {pagina === "restaurantes" && (
          <>
            <h2>Restaurantes cerca de ti</h2>
            <p>
              Muy pronto encontrarás aquí
              tus restaurantes favoritos.
            </p>
          </>
        )}

        {pagina === "pedidos" && (
          <>
            <h2>Mis pedidos</h2>
            <p>
              Aquí podrás consultar tus pedidos
              y seguir tus entregas.
            </p>
          </>
        )}

        {pagina === "cuenta" && (
          <>
            <h2>Mi cuenta</h2>
            <p>
              Próximamente podrás registrarte
              con tu correo y contraseña.
            </p>
          </>
        )}
      </section>

      <footer style={{
        textAlign: "center",
        padding: 30,
        marginTop: 60
      }}>
        © 2026 RapiBite. Todos los derechos reservados.
      </footer>
    </main>
  );
}
