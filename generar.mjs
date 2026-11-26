// Puerta de entrada de los cuatro portales en GitHub Pages (federicopepino.github.io).
// LinkedIn marca como "Posible contenido malicioso" todo link a *.pages.dev, pero no los de github.io.
// Cada página lleva la vista previa del portal (título, texto e imagen) y lleva al lector al sitio.
// Cuando haya dominios propios, se cambia DESTINO y se vuelve a correr: node generar.mjs
import { writeFileSync, mkdirSync } from "node:fs";

const BASE = "https://federicopepino.github.io";

const PORTALES = [
  {
    ruta: "energetico",
    nombre: "El Gran Energético",
    titulo: "El Gran Energético · Petróleo, gas y minería de Argentina",
    texto: "Noticias del petróleo, el gas y la minería de Argentina, con la producción de Vaca Muerta y los precios del crudo actualizados todos los días.",
    destino: "https://el-gran-energetico.pages.dev/",
    sello: "sello-energetico.svg",
    color: "#9c4f16",
  },
  {
    ruta: "minero",
    nombre: "El Gran Minero",
    titulo: "El Gran Minero · La minería de Argentina, de norte a sur",
    texto: "Noticias de la minería argentina actualizadas varias veces por día, con los precios de los minerales y el mapa oficial de proyectos de todas las provincias.",
    destino: "https://el-gran-minero.pages.dev/",
    sello: "sello-minero.svg",
    color: "#8a6a10",
  },
  {
    ruta: "ganadero",
    nombre: "El Gran Ganadero",
    titulo: "El Gran Ganadero · Noticias, precios y remates del campo argentino",
    texto: "El diario del campo argentino: noticias del agro, precios de hacienda en Cañuelas, granos en Rosario y Chicago, dólar, remates, calculadora ganadera y foro.",
    destino: "https://el-gran-ganadero.pages.dev/",
    sello: "sello-ganadero.svg",
    color: "#7a1530",
  },
  {
    ruta: "lactea",
    nombre: "La Cuenca Láctea",
    titulo: "La Cuenca Láctea · Noticias, precios y datos de la lechería argentina",
    texto: "La Cuenca Láctea: noticias, precios, exportaciones y foro de la lechería argentina. Cobertura de Santa Fe, Córdoba, Buenos Aires y toda la cuenca lechera.",
    destino: "https://la-cuenca-lactea.pages.dev/",
    sello: "sello-lacteo.svg",
    color: "#1f4fb8",
  },
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const meta = ({ titulo, texto, url, imagen }) => `<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(texto)}" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="es_AR" />
<meta property="og:title" content="${esc(titulo)}" />
<meta property="og:description" content="${esc(texto)}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${imagen}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="${imagen}" />`;

const estilo = `<style>
:root{color-scheme:light}
body{margin:0;background:#f7f4ee;color:#1a1a1a;font-family:Georgia,"Times New Roman",serif}
main{max-width:880px;margin:0 auto;padding:48px 16px 64px}
h1{font-size:clamp(28px,5vw,44px);margin:0 0 8px;line-height:1.1}
.bajada{color:#4a4a4a;font-size:19px;margin:0 0 32px;line-height:1.5}
.grilla{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr));gap:16px}
.portal{display:flex;gap:16px;align-items:flex-start;background:#fffdf8;border:1px solid #ddd6c8;border-top:4px solid var(--c);padding:20px;color:inherit;text-decoration:none}
.portal:hover h2,.portal:focus-visible h2{text-decoration:underline}
.portal img{width:56px;height:56px;flex:none}
.portal h2{font-size:22px;margin:0 0 6px;color:var(--c)}
.portal p{margin:0;font-size:15px;line-height:1.5;color:#4a4a4a}
.pie{margin-top:40px;font-size:14px;color:#6a6a6a}
.pasando{max-width:560px;margin:20vh auto 0;padding:0 16px;text-align:center}
.pasando a{color:var(--c)}
</style>`;

// Portada: los cuatro portales.
writeFileSync(
  "index.html",
  `<!doctype html>
<html lang="es-AR">
<head>
${meta({
  titulo: "Los medios del sector productivo argentino",
  texto: "Cuatro portales de noticias y datos: energía, minería, campo y lechería de Argentina, actualizados varias veces por día, con cada dato y su fuente.",
  url: `${BASE}/`,
  imagen: `${BASE}/img/minero.png`,
})}
${estilo}
</head>
<body>
<main>
<h1>Los medios del sector productivo argentino</h1>
<p class="bajada">Cuatro portales de noticias y datos: energía, minería, campo y lechería. Se actualizan varias veces por día y cada dato lleva su fuente.</p>
<div class="grilla">
${PORTALES.map(
  (p) => `<a class="portal" style="--c:${p.color}" href="${p.destino}">
<img src="img/${p.sello}" alt="" width="56" height="56" />
<div><h2>${esc(p.nombre)}</h2><p>${esc(p.texto)}</p></div>
</a>`,
).join("\n")}
</div>
</main>
</body>
</html>
`,
);

// Una página por portal: vista previa propia y pase directo al sitio.
for (const p of PORTALES) {
  mkdirSync(p.ruta, { recursive: true });
  writeFileSync(
    `${p.ruta}/index.html`,
    `<!doctype html>
<html lang="es-AR">
<head>
${meta({ titulo: p.titulo, texto: p.texto, url: `${BASE}/${p.ruta}/`, imagen: `${BASE}/img/${p.ruta}.png` })}
<link rel="canonical" href="${p.destino}" />
<meta http-equiv="refresh" content="0; url=${p.destino}" />
${estilo}
<script>location.replace(${JSON.stringify(p.destino)} + location.search + location.hash);</script>
</head>
<body>
<p class="pasando" style="--c:${p.color}">Abriendo ${esc(p.nombre)}… Si no se abre solo, <a href="${p.destino}">entrá acá</a>.</p>
</body>
</html>
`,
  );
}

writeFileSync(".nojekyll", "");
console.log("Listo:", ["index.html", ...PORTALES.map((p) => `${p.ruta}/index.html`)].join(", "));
