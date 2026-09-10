# ICONS 2027 · Mapa interactivo · PABELLÓN 1

Repositorio independiente del mapa del Pabellón 1 (Diecast · Figures & Dolls · Comics · Arcade).
El Pabellón 2 (TCG · Sport Cards) va en su propio repositorio, con la misma estructura.

---

## Ficheros

| Fichero | Para qué sirve |
|---|---|
| `index.html` | **El mapa público**, limpio: solo el plano, las fichas de mesa y 4 niveles de zoom. Es lo que se publica, lo que se embebe en un listing y lo que se ve en móvil. |
| `filters.html` | La versión con herramientas: leyenda con recuento y filtros, buscador de mesas y zoom continuo con deslizador. Para uso interno o para quien quiera hurgar. |
| `config.js` | **El único fichero que tocas** para precios, colores, categorías y la URL de la hoja de cálculo. Lo leen los tres HTML. |
| `mesas.html` | Las mesas. Lo genera el builder. **Ya viene relleno con las 336 mesas del plano.** |
| `seller.html` | Los expositores con logo. Vacío por ahora; lo genera el sellers builder. |
| `builder.html` | Tables Builder Pro: crear, mover, redimensionar, colorear, clonar y numerar mesas. |
| `builder-sellers.html` | Sellers Builder: colocar logos de expositores encima del plano. |
| `Hall 1.png` | El plano (7499 × 5675 px). Si lo cambias, mantén el mismo nombre y proporción. |

---

## Cómo se abre

Los tres HTML cargan `mesas.html` y `seller.html` con `fetch`, y Chrome bloquea eso al abrir con doble clic
(`file://`). Dos formas de trabajar:

**Servidor local** (recomendado, todo funciona solo):

```bash
cd icons-map-hall1-2027
python3 -m http.server 8000
# abre http://localhost:8000/builder.html
```

**Sin servidor**: abre el builder con doble clic y usa *«Pegar mesas.html a mano»* → pegas el contenido del
fichero y sigues trabajando igual.

En **GitHub Pages** funciona directamente: Settings → Pages → Deploy from branch → `main` / root.

---

## Las mesas ya están puestas, con los números del plano

`mesas.html` está generado leyendo el propio PNG, no inventado:

1. Se detectan los 336 rectángulos de mesa por color (relleno `#E6ECFF`, borde `#3E5CFA`).
2. Se agrupan en las 28 islas contiguas.
3. **Se lee por OCR el número impreso en cada mesa** (`A37`, `K59`, `M25`…), girando las etiquetas de las
   columnas laterales, y se decide letra y número base de cada isla por votación de sus 12 mesas: un fallo
   puntual de lectura no puede descolocar la numeración. La coincidencia se verificó mesa a mesa.
4. El tipo sale del color de la etiqueta de la isla: rosa `COLLECTOR`, verde `COMMERCIAL`,
   ámbar `ARTIST VALLEY`.
5. La geometría se normaliza: todas las horizontales quedan a 85 × 25 px y todas las verticales a 25 × 85 px,
   con las columnas y filas de cada isla compartiendo eje. El plano venía con ±2 px de ruido de antialiasing
   y por eso algunas mesas se veían descuadradas.

**Cómo numera el plano** (importante para entenderlo): la **letra es la columna** y el **número la fila**,
de abajo arriba y en bloques de 12. Así que `DIECAST-A` no es una isla, son tres:

| Categoría | Islas | Mesas | Letras | Bloques de números |
|---|---|---|---|---|
| DIECAST | 9 | 108 | A, B, C | 13-24 · 25-36 · 37-48 |
| FIGURES | 10 | 120 | D–J | 25-36 · 37-48 |
| COMICS | 6 | 72 | K, L, M | 25-36 · 37-48 |
| ARCADE | 3 | 36 | K, L, M | 49-60 |
| **Total** | **28** | **336** | | |

Dentro de cada isla la numeración arranca en la 3.ª mesa de la columna izquierda y va en sentido
antihorario: izquierda 3-4, abajo, derecha de abajo arriba, arriba de derecha a izquierda, izquierda 1-2.

**Nomenclatura del ID**: `CATEGORÍA-LETRA-Nº` → `DIECAST-A-37`, `ARCADE-K-59`. El tooltip muestra
`Zone A · Table 37`, que es exactamente lo que se lee en el plano. Si prefieres que el ID sea solo `A37`
para que cuadre con la hoja de cálculo, se cambia en el builder o con un buscar-y-reemplazar en `mesas.html`.

**Ojo con Artist Valley**: `COMICS-M-25..36` y `COMICS-M-37..48` son Artist Valley en el plano. Como este
año solo hay Collector y Commercial, están puestas como *collector* con tono **claro** para que las
distingas de un vistazo. Si quieres un tipo propio con su precio, se añade en `config.js` en tres líneas y
aparece solo en el desplegable del builder.

---

## Tables Builder Pro (`builder.html`)

**Dos modos de selección**

- **Islas**: al pulsar una mesa seleccionas las 12 de su isla. Agrupa por **proximidad en el plano**, no por
  prefijo, precisamente porque `DIECAST-A` son tres islas distintas.
- **Mesas**: solo la que pulsas.
- `Shift + clic` suma o resta de la selección. `Shift + arrastrar` sobre el plano hace un marco de selección.
- Arrastrar sobre una zona vacía mueve el plano. Rueda = zoom. Tecla `0` = encajar.

**Tamaño en tiempo real**

Sliders de ancho y alto que se aplican mientras arrastras, a toda la selección a la vez. Debajo, el valor
exacto en % y su equivalente en píxeles del plano. También:

- **Tirador naranja** en la esquina de la selección: redimensiona sobre el plano arrastrando.
- **Girar (W↔H)**: convierte mesas horizontales en verticales y al revés.
- **Igualar tamaños**: pone todas las seleccionadas al tamaño de la primera.
- **−5 % / +5 % / +20 %**: escalado desde el centro.

**Tipo y color**

- Desplegable **Tipo de mesa**: Collector / Commercial. Cambia el color y el precio del tooltip.
- Desplegable **Tono**: Claro / Base / Oscuro, para pintar unas comerciales más claras y otras más oscuras
  sin salirte de la paleta.
- **Color propio** (selector de color) solo para excepciones puntuales.

Los tonos salen de `config.js`, así que el builder y el mapa público pintan exactamente igual.

**Clonar**

Botones **← ↑ ↓ →**: el clon es idéntico (tamaño, tipo, tono) y se coloca pegado al original con el hueco
que marques en la casilla de al lado. Y **replica la lógica del plano**:

- **a los lados** → letra libre siguiente con los mismos números (`DIECAST-A-37..48` → `DIECAST-D-37..48`)
- **arriba / abajo** → misma letra y el siguiente bloque de 12 números libre (`A-37..48` → `A-49..60`)

En modo mesas simplemente continúa la numeración. `Ctrl+D` clona a la derecha.

**Deshacer**

`Ctrl+Z` deshacer, `Ctrl+Y` (o `Ctrl+Shift+Z`) rehacer, hasta 120 pasos. El contador del botón te dice
cuántos pasos tienes guardados. Además autoguarda en el navegador cada 8 segundos:
**Restaurar sesión** recupera lo último si cierras la pestaña sin exportar.

**Crear mesas**

Cinco formas: mesa individual, fila horizontal, columna vertical, rejilla e **isla perimetral**
(arriba / lados / abajo, con los lados en vertical automáticamente). Se crea en el centro de la vista y la
letra de zona avanza sola para el siguiente bloque.

**Otras herramientas**

- Alinear (izquierda, centro, derecha, arriba, medio, abajo) y distribuir en horizontal / vertical.
- **Renumerar 1→n** reordena la numeración de la selección de arriba a abajo y de izquierda a derecha.
- **Ir a una isla**: desplegable que salta y centra cualquier isla.
- Recuento por categoría y por tipo, con el precio aplicado.
- Botón `123` para ocultar los números y ver mejor el plano.

**Atajos**

| Tecla | Acción |
|---|---|
| Flechas | mover 0,005 % |
| Shift + flechas | mover 0,05 % |
| Alt + flechas | mover 0,5 % |
| Ctrl+D | clonar a la derecha |
| Ctrl+Z / Ctrl+Y | deshacer / rehacer |
| Ctrl+A | seleccionar todo |
| Supr | borrar selección |
| Esc | deseleccionar |
| Rueda | zoom |
| 0 | encajar el plano |

Y en la barra inferior hay un **deslizador de zoom** con − / + y botón de encajar.

**Al acabar**: *Descargar mesas.html* (también lo copia al portapapeles) y reemplazas el `mesas.html` del
repositorio. *Exportar JSON* deja una copia de seguridad legible por si acaso.

---

## Sellers Builder (`builder-sellers.html`)

Colocas la caja del logo de cada expositor encima de sus mesas. Por seller: nombre, URL del logo, Instagram
y web, todo en vivo. **Repetición del logo** (1, 2 en horizontal, 2, 3 o 4 en vertical) para cuando ocupa
varias mesas seguidas. **Ver mesas** dibuja las mesas de fondo como referencia y **Ajustar a la mesa** copia
la posición y el tamaño exactos de la mesa que tiene debajo. Mismo deshacer y mismo autoguardado.

Exporta `seller.html`.

---

## Hoja de cálculo

En `config.js`, `csvUrl`. La hoja se publica en Google Sheets con
**Archivo → Compartir → Publicar en la web → CSV**.

Columnas (la fila 1 es cabecera y se ignora):

| Columna | Contenido |
|---|---|
| A | libre (notas, referencia de pedido…) |
| B | **estado** — si contiene `VENDIDA` o `SOLD`, la mesa sale roja y con `SOLD OUT` |
| C | **ID de mesa** — tiene que coincidir exactamente con `data-info` (`DIECAST-A-1`) |
| D | *(opcional)* nombre del expositor, y sale en el tooltip de la mesa |

La columna D es nueva: si la rellenas, el tooltip muestra el nombre del expositor sin tener que tocar
`seller.html`. Si la dejas vacía no aparece nada.

El mapa refresca solo cada 2 minutos (`csvRefreshMs`).

Para sacar la lista de IDs y pegarla en la hoja limpia:

```bash
grep -o 'data-info="[^"]*"' mesas.html | sed 's/data-info="//;s/"//' > ids.txt
```

---

## El mapa público (`index.html`)

Deliberadamente desnudo: **sin título, sin leyenda y sin buscador**, para que se vea el plano y nada más.
Todo eso vive en `filters.html`.

- **4 niveles de zoom** con la botonera `×1 ×2 ×3 ×4` abajo a la derecha (centrada en móvil), botón
  **BACK** para volver a la vista completa, clic en el plano para subir un nivel (y volver al principio
  tras el último), rueda del ratón, y teclas `1`-`4`, `+`, `−` y `Esc`. Con zoom se arrastra para moverse.
- **Ficha de mesa** al pasar por encima en escritorio y **al tocarla en móvil**: tarjeta blanca con una
  línea del color del tipo arriba, el ID grande (`A45`), la etiqueta del tipo, categoría / zona / mesa y el
  precio con la tarifa tachada más el early bird. Es un overlay de tamaño fijo, así que se lee igual de
  bien en la vista completa que en el nivel más cercano.
- **Estado agotado**: la mesa pasa a rojo y la ficha muestra `SOLD OUT`, con el nombre del expositor si lo
  has puesto en la columna D de la hoja.

### Por qué 4 niveles y no un zoom libre

Escalar con `transform: scale()` una imagen de 7499 px obliga al navegador a mantener una capa compositada
enorme. Pasado cierto punto no la puede rasterizar y **el plano se queda gris**, sobre todo en móvil al
alejar después de un zoom fuerte. Dos medidas contra eso:

1. La animación usa `transform`, pero **en cuanto termina la escala se aplica al layout**: el contenedor
   pasa a medir los píxeles reales y el `transform` vuelve a ser solo un desplazamiento. Así el navegador
   trata la imagen como una imagen normal y la pinta en mosaico.
2. El nivel más cercano se **recorta automáticamente** si con esa pantalla y densidad de píxeles pediría
   más resolución de la que el navegador puede pintar (`MAX_RASTER` en `index.html`). En un portátil normal
   los niveles son ×1 ×2,2 ×4 ×6; en móvil ×1 ×2,8 ×5 ×8; en un 2K retina el último baja solo.

Una nota de geometría: el plano es 4:3 tumbado, así que en un móvil vertical (9:19) llena el ancho y deja
franjas arriba y abajo por mucho que se ajuste. Se ve entero, que es lo que se quiere de un plano, y con
un toque ya se entra al nivel que llena la pantalla.

## La versión con filtros (`filters.html`)

Lo mismo más las herramientas, para quien las quiera:

- **Zoom continuo** del 100 % al 800 % con deslizador vertical, botones − / +, encajar, rueda (hace zoom
  donde apunta el cursor), doble clic, teclas y pinza en móvil.
- **Buscador**: escribes `A37`, `K59` o solo `A` y te enfoca y resalta las mesas.
- **Leyenda con recuento** que además filtra: pulsas *Collector*, *Commercial* o *Sold out* y atenúa el
  resto.
- Enlace de vuelta al mapa simple.

Lleva la misma protección contra el gris y el tope en 800 % por el mismo motivo.

## Precios

En `config.js`:

```js
types: {
  collector:  { price: 100, ... },
  commercial: { price: 250, ... }
},
earlyBird: { active: true, discount: 0.15, label: 'EARLY BIRD −15%' }
```

Con `earlyBird.active: true` el tooltip muestra **100,00 € tachado y 85,00 €** al lado, con la píldora
`EARLY BIRD −15%`. Cuando acabe la promoción, `active: false` y vuelve a salir solo el precio de tarifa.
No hay que tocar nada más.

---

## Flujo de trabajo típico

1. Abres `builder.html` con el servidor local.
2. Retocas mesas: tamaño, tipo, tono, clones.
3. *Descargar mesas.html* y reemplazas el del repositorio.
4. Sacas los IDs con el `grep` de arriba y los pegas en la hoja de cálculo.
5. `builder-sellers.html` para los logos → *Descargar seller.html*.
6. `git commit` + `push`. GitHub Pages publica el mapa: `index.html` en la raíz y `filters.html` en
   `/filters.html`.

## Para el Pabellón 2

Mismo repo con `Hall 2.png`, y en `config.js` cambias `hallName`, `hallLabel`, `mapImage` y las
`categories` por TCG y Sport Cards. Las mesas se pueden extraer igual del plano: los colores de mesa y de
etiqueta son los mismos, solo cambian los colores de fondo de zona.
