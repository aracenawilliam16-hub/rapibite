
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient, type User } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

export default function MiCuenta() {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (!supabase) {
      setMensaje("No se pudo conectar con Supabase.");
      setCargando(false);
      return;
    }

    const cliente = supabase;

    async function verificarSesion() {
      const { data, error } = await cliente.auth.getUser();

      if (error || !data.user) {
        setUsuario(null);
      } else {
        setUsuario(data.user);
      }

      setCargando(false);
    }

    void verificarSesion();

    const { data: listener } = cliente.auth.onAuthStateChange(
      (_evento, sesion) => {
        setUsuario(sesion?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function cerrarSesion() {
    if (!supabase) return;

    setMensaje("");

    const { error } = await supabase.auth.signOut();

    if (error) {
      setMensaje("No se pudo cerrar sesión. Inténtalo nuevamente.");
      return;
    }

    window.location.replace("/registro");
  }

  const nombre =
    typeof usuario?.user_metadata?.nombre === "string"
      ? usuario.user_metadata.nombre
      : "Cliente RapiBite";

  const boton: React.CSSProperties = {
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    padding: "15px",
    marginTop: "15px",
    borderRadius: "12px",
    border: "none",
    background: "#d94d78",
    color: "white",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "none",
    cursor: "pointer",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#fff7fa",
        padding: "35px 18px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <Link
          href="/"
          style={{
            color: "#d94d78",
            textDecoration: "none",
          }}
        >
          ← Explorar restaurantes
        </Link>

        <h1
          style={{
            color: "#d94d78",
            textAlign: "center",
            fontSize: "44px",
            marginTop: "45px",
          }}
        >
          rapibite.
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#777",
          }}
        >
          Lo bueno llega rápido
        </p>

        <section
          style={{
            background: "white",
            padding: "28px",
            borderRadius: "22px",
            marginTop: "35px",
            boxShadow: "0 8px 30px #d94d7815",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#222",
            }}
          >
            Mi cuenta
          </h2>

          {cargando ? (
            <p style={{ textAlign: "center", color: "#555" }}>
              Cargando tu perfil...
            </p>
          ) : usuario ? (
            <>
              <p style={{ color: "#777" }}>Bienvenido a RapiBite</p>

              <h3 style={{ color: "#d94d78", fontSize: 24 }}>
                {nombre}
              </h3>

              <p style={{ color: "#555" }}>
                <strong>Correo electrónico:</strong>
              </p>

              <p
                style={{
                  color: "#333",
                  overflowWrap: "anywhere",
                }}
              >
                {usuario.email}
              </p>

              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid #eee",
                  margin: "25px 0",
                }}
              />

              <h3 style={{ color: "#222" }}>Mis opciones</h3>

              <p style={{ color: "#777" }}>
                Mis pedidos — Próximamente
              </p>

              <p style={{ color: "#777" }}>
                Mis direcciones — Próximamente
              </p>

              <Link href="/" style={boton}>
                Explorar restaurantes
              </Link>

              <button
                type="button"
                onClick={cerrarSesion}
                style={{
                  ...boton,
                  background: "#fff",
                  color: "#d94d78",
                  border: "1px solid #d94d78",
                }}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <p
                style={{
                  color: "#555",
                  textAlign: "center",
                  lineHeight: 1.6,
                }}
              >
                Para ver tu perfil necesitas iniciar sesión.
              </p>

              <Link href="/registro" style={boton}>
                Registrarme o iniciar sesión
              </Link>
            </>
          )}

          {mensaje && (
            <p role="status" style={{ color: "#b42350" }}>
              {mensaje}
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
