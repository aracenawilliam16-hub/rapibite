
"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export default function Registro() {
  const [modo, setModo] = useState<"registro" | "entrar">("registro");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMensaje("");

    if (!url || !key) {
      setMensaje("Falta configurar la conexión con Supabase.");
      return;
    }

    if (modo === "registro" && !nombre.trim()) {
      setMensaje("Escribe tu nombre.");
      return;
    }

    setCargando(true);

    try {
      const supabase = createClient(url, key);

      if (modo === "registro") {
        const { error } = await supabase.auth.signUp({
          email: correo.trim(),
          password: clave,
          options: {
            emailRedirectTo: `${window.location.origin}/registro`,
            data: { nombre: nombre.trim(), tipo: "cliente" },
          },
        });

        if (error) throw error;

        setMensaje(
          "Solicitud recibida. Revisa tu correo para confirmar tu cuenta. Si ya existe una cuenta, intenta iniciar sesión."
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: correo.trim(),
          password: clave,
        });

        if (error) throw error;

        setMensaje("¡Bienvenido a RapiBite! Sesión iniciada.");
      }
    } catch (error) {
      setMensaje(
        error instanceof Error ? error.message : "Ocurrió un error."
      );
    } finally {
      setCargando(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#fff7fa",
        padding: "35px 18px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: 440, margin: "0 auto" }}>
        <Link
          href="/"
          style={{ color: "#d94d78", textDecoration: "none" }}
        >
          ← Volver a RapiBite
        </Link>

        <h1
          style={{
            color: "#d94d78",
            fontSize: 44,
            textAlign: "center",
            marginBottom: 5,
          }}
        >
          rapibite.
        </h1>

        <p style={{ textAlign: "center", color: "#666" }}>
          Lo bueno llega rápido
        </p>

        <section
          style={{
            background: "white",
            padding: 28,
            borderRadius: 22,
            marginTop: 30,
            boxShadow: "0 8px 30px #d94d7815",
          }}
        >
          <h2 style={{ textAlign: "center", color: "#222" }}>
            {modo === "registro" ? "Crear mi cuenta" : "Iniciar sesión"}
          </h2>

          <form onSubmit={enviar}>
            {modo === "registro" && (
              <input
                placeholder="Nombre completo"
                aria-label="Nombre completo"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                style={campo}
              />
            )}

            <input
              type="email"
              placeholder="Correo electrónico"
              aria-label="Correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              style={campo}
            />

            <input
              type="password"
              placeholder="Contraseña"
              aria-label="Contraseña"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              minLength={6}
              required
              style={campo}
            />

            <button
              type="submit"
              disabled={cargando}
              style={{
                width: "100%",
                padding: 15,
                background: "#d94d78",
                color: "white",
                border: "none",
                borderRadius: 12,
                fontSize: 17,
                fontWeight: "bold",
                marginTop: 18,
                cursor: "pointer",
                opacity: cargando ? 0.6 : 1,
              }}
            >
              {cargando
                ? "Procesando..."
                : modo === "registro"
                ? "Registrarme"
                : "Entrar"}
            </button>
          </form>

          {mensaje && (
            <p role="status" style={{ color: "#9d3158", lineHeight: 1.5 }}>
              {mensaje}
            </p>
          )}

          <button
            type="button"
            onClick={() => {
              setModo(modo === "registro" ? "entrar" : "registro");
              setMensaje("");
            }}
            style={{
              background: "none",
              border: "none",
              color: "#d94d78",
              cursor: "pointer",
              display: "block",
              margin: "24px auto 0",
              fontSize: 15,
            }}
          >
            {modo === "registro"
              ? "¿Ya tienes cuenta? Inicia sesión"
              : "¿No tienes cuenta? Regístrate"}
          </button>
        </section>
      </div>
    </main>
  );
}

const campo: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: 14,
  border: "1px solid #ddd",
  borderRadius: 10,
  marginTop: 15,
  fontSize: 16,
  background: "white",
  color: "#222",
};
