
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "RapiBite - Lo bueno llega rápido",
    short_name: "RapiBite",
    description:
      "Pide tus comidas favoritas a domicilio en Charlotte.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#d94d78",
    orientation: "portrait-primary",
    lang: "es",
  };
}
