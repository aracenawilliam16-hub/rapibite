
"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function RegistroRestaurante() {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [categoria, setCategoria] = useState("Latina");
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function registrar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMensaje("");
    setEnviando(true);

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        setMensaje(
          "Primero debes iniciar sesión en RapiBite."
        );
        return;
      }

      const { error } = await supabase
        .from("restaurantes")
        .insert({
          nombre: nombre.trim(),
          direccion: direccion.trim(),
          telefono: telefono.trim(),
          email: email.trim(),
          categoria,
          propietario_id: user.id,
          estado: "pendiente",
        });

      if (error) {
        console.error("Error de registro:", error.message);
        setMensaje(
          "No se pudo enviar la solicitud: " + error.message
        );
        return;
      }

      setMensaje(
        "¡Solicitud enviada! RapiBite revisará tu restaurante."
      );

      setNombre("");
      setDireccion("");
      setTelefono("");
      setEmail("");
      setCategoria("Latina");
    } catch {
      setMensaje("Ocurrió un error. Inténtalo nuevamente.");
    } finally {
      setEnviando(false);
    }
  }

  const campo: React.CSSProperties = {
    width: "100%",
    padding: "15px",
    border: "1px solid #e5dce0",
    borderRadius: "12px",
    fontSize: "16px",
    boxSizing: "border-box",
    marginTop: "7px",
  };

  const etiqueta: React.CSSProperties = {
    display: "block",
    marginBottom: "17px",
    fontWeight: 600,
    color: "#333",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#fff6f9",
        padding: "30px 16px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "560px",
          margin: "0 auto",
        }}
      >
        <a
          href="/"
          style={{
            color: "#d94d78",
            textDecoration: "none",
          }}
        >
          ← Volver a RapiBite
        </a>

        <h1
          style={{
            textAlign: "center",
            color: "#d94d78",
            fontSize: "48px",
            marginBottom: "5px",
          }}
        >
          rapibite.
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Lo bueno llega rápido
        </p>

        <section
          style={{
            background: "white",
            borderRadius: "24px",
            padding: "30px 24px",
            boxShadow: "0 8px 30px #d94d7814",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            Registra tu restaurante
          </h2>

          <p
            style={{
              textAlign: "center",
              color: "#666",
              marginBottom: "30px",
            }}
          >
            Lleva tus mejores platos a más clientes
            con RapiBite.
          </p>

          <form onSubmit={registrar}>
            <label style={etiqueta}>
              Nombre del restaurante
              <input
                style={campo}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Punta Cana Restaurant"
                required
                maxLength={150}
              />
            </label>

            <label style={etiqueta}>
              Dirección
              <input
                style={campo}
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder="Dirección del negocio"
                required
              />
            </label>

            <label style={etiqueta}>
              Teléfono
              <input
                style={campo}
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="Número de contacto"
                required
              />
            </label>

            <label style={etiqueta}>
              Correo electrónico
              <input
                style={campo}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="restaurante@ejemplo.com"
                required
              />
            </label>

            <label style={etiqueta}>
              Tipo de comida
              <select
                style={campo}
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="Latina">Latina</option>
                <option value="Mexicana">Mexicana</option>
                <option value="Dominicana">Dominicana</option>
                <option value="Hondureña">Hondureña</option>
                <option value="Salvadoreña">Salvadoreña</option>
                <option value="Americana">Americana</option>
                <option value="Otra">Otra</option>
              </select>
            </label>

            <button
              type="submit"
              disabled={enviando}
              style={{
                width: "100%",
                padding: "17px",
                background: "#d94d78",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: enviando ? "wait" : "pointer",
                opacity: enviando ? 0.7 : 1,
              }}
            >
              {enviando
                ? "Enviando..."
                : "Solicitar registro"}
            </button>

            {mensaje && (
              <p
                role="status"
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  color: "#9b3156",
                }}
              >
                {mensaje}
              </p>
            )}
          </form>
        </section>
      </div>
    </main>
  );
}
