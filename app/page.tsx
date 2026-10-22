
"use client";

import { useState } from "react";

const categorias = [
  "Todos",
  "Hamburguesas",
  "Latina",
  "Pizza",
  "Saludable",
  "Desayunos",
  "Postres",
];

const opciones = [
  { nombre: "Hamburguesas", emoji: "🍔", categoria: "Hamburguesas" },
  { nombre: "Comida latina", emoji: "🌮", categoria: "Latina" },
  { nombre: "Pizza", emoji: "🍕", categoria: "Pizza" },
  { nombre: "Comida saludable", emoji: "🥗", categoria: "Saludable" },
  { nombre: "Desayunos", emoji: "🥞", categoria: "Desayunos" },
  { nombre: "Postres", emoji: "🍰", categoria: "Postres" },
];

export default function Home() {
  const [pagina, setPagina] = useState("Explorar");
  const [categoria, setCategoria] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [idioma, setIdioma] = useState("Español");

  const visibles = opciones.filter(
    (opcion) =>
      (categoria === "Todos" ||
        opcion.categoria === categoria) &&
      opcion.nombre.toLowerCase().includes(
        busqueda.toLowerCase()
      )
  );

  const enlaces = [
    "Explorar",
    "Mis pedidos",
    "Restaurante",
    "Repartidor",
    "Admin",
    "Mi cuenta",
  ];

  return (
    <main>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; background: #fffafb; }
        button, input, select { font: inherit; }
        button { cursor: pointer; }
        .contenedor {
          max-width: 1180px;
          margin: auto;
          padding: 0 22px;
        }
        .cabecera {
          background: white;
          border-bottom: 1px solid #f5e3e8;
        }
        .barra {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          padding-top: 19px;
          padding-bottom: 19px;
          flex-wrap: wrap;
        }
        .logo {
          color: #d94d78;
          font-size: 30px;
          font-weight: 900;
          letter-spacing: -1.5px;
        }
        .ubicacion {
          color: #7e7379;
          font-size: 11px;
        }
        .navegacion {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
        }
        .navbtn {
          border: none;
          background: transparent;
          color: #665b63;
          font-size: 13px;
        }
        .navbtn:hover { color: #d94d78; }
        .bolsa, .principal {
          background: #d94d78;
          color: white;
          border: none;
          border-radius: 10px;
          padding: 13px 19px;
          font-weight: bold;
        }
        .aviso {
          background: #fff0f4;
          border: 1px solid #f8dce5;
          padding: 17px;
          border-radius: 14px;
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
        }
        .aviso p { margin: 5px 0 0; font-size: 12px; }
        .aviso button {
          border: none;
          background: white;
          padding: 10px;
          border-radius: 9px;
          color: #bd4569;
        }
        .prueba {
          color: #8d7c85;
          font-size: 12px;
          margin: 18px 0;
        }
        .hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          overflow: hidden;
          border-radius: 20px;
          background: #fce1e9;
          min-height: 340px;
        }
        .hero-texto {
          padding: 45px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
        }
        .hero h1 {
          color: #a83e60;
          font-size: clamp(30px, 4vw, 49px);
          line-height: 1.1;
          margin: 12px 0;
        }
        .hero p { color: #785b68; }
        .hero-imagen {
          position: relative;
          background: #30202b;
          min-height: 300px;
          overflow: hidden;
        }
        .hero-imagen img {
          width: 100%;
          height: 100%;
          position: absolute;
          object-fit: cover;
        }
        .etiqueta {
          position: absolute;
          bottom: 18px;
          left: 18px;
          background: #fff1f5;
          padding: 12px;
          border-radius: 10px;
          color: #85435b;
          font-size: 12px;
        }
        .buscador {
          display: flex;
          gap: 12px;
          margin: 24px 0;
        }
        .buscador input {
          flex: 1;
          min-width: 0;
          padding: 16px;
          border: 1px solid #f0dce3;
          border-radius: 11px;
          background: white;
        }
        .categorias {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
        }
        .categoria {
          background: #fff0f4;
          color: #775563;
          border: none;
          border-radius: 25px;
          padding: 11px 16px;
        }
        .activa {
          background: #8b6478;
          color: white;
        }
        .tarjetas {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          margin: 24px 0 60px;
        }
        .tarjeta {
          background: white;
          border: 1px solid #f2e0e6;
          border-radius: 16px;
          padding: 26px;
          text-align: center;
        }
        .emoji { font-size: 55px; }
        .panel {
          padding: 45px 20px;
          text-align: center;
          background: white;
          border-radius: 18px;
          margin-top: 25px;
        }
        @media (max-width: 700px) {
          .hero { grid-template-columns: 1fr; }
          .hero-texto { padding: 28px; }
          .hero-imagen { min-height: 240px; }
          .tarjetas { grid-template-columns: repeat(2, 1fr); }
          .barra { justify-content: center; }
          .navegacion { justify-content: center; }
        }
      `}</style>

      <header className="cabecera">
        <div className="contenedor barra">
          <div>
            <div className="logo">rapibite.</div>
            <div className="ubicacion">
              ENTREGAS EN • Charlotte, NC
            </div>
          </div>

          <nav className="navegacion">
            {enlaces.map((enlace) => (
              <button
                className="navbtn"
                key={enlace}
                onClick={() => setPagina(enlace)}
              >
                {enlace}
              </button>
            ))}

            <select
              value={idioma}
              onChange={(e) => setIdioma(e.target.value)}
              aria-label="Idioma"
            >
              <option>Español</option>
              <option>English</option>
            </select>

            <button className="bolsa">
              Bolsa · 0
            </button>
          </nav>
        </div>
      </header>

      <div className="contenedor">
        <div className="aviso">
          <div>
            <strong>RapiBite en tu teléfono</strong>
            <p>Guarda la aplicación en tu pantalla de inicio.</p>
          </div>
          <button onClick={() =>
            alert("Abre el menú de tu navegador y selecciona Agregar a pantalla de inicio.")
          }>
            Instalar RapiBite ↗
          </button>
        </div>

        <div className="prueba">
          VERSIÓN DE PRUEBA · Pedidos de prueba ·
          Sin cobros ni entregas reales
        </div>

        {pagina === "Explorar" ? (
          <>
            <section className="hero">
              <div className="hero-texto">
                <small>SABORES LOCALES. MÁS CERCA.</small>
                <h1>
                  Tu próximo antojo,<br />
                  a un bite de ti.
                </h1>
                <p>
                  Descubre sabores de Charlotte.
                  Nosotros ponemos el camino a tu mesa.
                </p>
                <button
                  className="principal"
                  onClick={() =>
                    document.getElementById("explorar")?.scrollIntoView({
                      behavior: "smooth"
                    })
                  }
                >
                  Encuentra tu favorito ↗
                </button>
              </div>

              <div className="hero-imagen">
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=85"
                  alt="Hamburguesa con queso y vegetales"
                />
                <div className="etiqueta">
                  ♥ Hecho cerca. Disfrutado en casa.
                </div>
              </div>
            </section>

            <section id="explorar">
              <div className="buscador">
                <input
                  placeholder="¿Qué se te antoja hoy?"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
                <button className="principal">
                  Buscar
                </button>
              </div>

              <div className="categorias">
                {categorias.map((item) => (
                  <button
                    key={item}
                    onClick={() => setCategoria(item)}
                    className={
                      "categoria " +
                      (categoria === item ? "activa" : "")
                    }
                  >
                    {item}
                  </button>
                ))}
              </div>

              <h2>Un mundo de sabores, aquí.</h2>
              <p>Explora lo que más te gusta.</p>

              <div className="tarjetas">
                {visibles.map((opcion) => (
                  <div className="tarjeta" key={opcion.nombre}>
                    <div className="emoji">{opcion.emoji}</div>
                    <h3>{opcion.nombre}</h3>
                    <p>Próximamente en RapiBite</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <section className="panel">
            <h1>{pagina}</h1>
            <p>
              Estamos preparando esta sección de RapiBite.
            </p>
            <button
              className="principal"
              onClick={() => setPagina("Explorar")}
            >
              Volver a explorar
            </button>
          </section>
        )}
      </div>

      <footer style={{
        textAlign: "center",
        padding: 30,
        color: "#987784"
      }}>
        © 2026 RapiBite · Lo bueno llega rápido
      </footer>
    </main>
  );
}
