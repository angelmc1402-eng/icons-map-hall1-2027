# ICONS 2027 · Mapa interactivo · PABELLÓN 1

Repositorio independiente del mapa del Pabellón 1 (Diecast · Figures & Dolls · Comics · Arcade).
El Pabellón 2 (TCG · Sport Cards) va en su propio repositorio, con la misma estructura.

---

## Ficheros

| Fichero | Para qué sirve |
|---|---|
| `index.html` | El mapa público. Es lo que se publica y lo que ve el cliente. |
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

## Las mesas ya están puestas

`mesas.html` viene generado leyendo el propio plano: se han detectado los 336 rectángulos de mesa dibujados
y se ha leído la etiqueta de cada isla (rosa `COLLECTOR` / verde `COMMERCIAL` / ámbar `ARTIST VALLEY`),
así que cada mesa está **encajada al píxel** sobre su dibujo y con su tipo correcto.

| Categoría | Islas | Mesas | Tipos detectados |
|---|---|---|---|
| DIECAST | 9 (A–I) | 108 | A,B,C collector · D–I commercial |
| FIGURES | 10 (A–J) | 120 | A,B,F,G,H collector · C,D,E,I,J commercial |
| COMICS | 6 (A–F) | 72 | A,D collector · B,E commercial · C,F Artist Valley |
| ARCADE | 3 (A–C) | 36 | A,B collector · C commercial |
| **Total** | **28** | **336** | |

**Nomenclatura**: `CATEGORÍA-ZONA-Nº` → `DIECAST-A-1`, `COMICS-F-12`.
La numeración de cada isla va **en sentido horario** empezando por la mesa de arriba a la izquierda.

**Ojo con Artist Valley**: `COMICS-C` y `COMICS-F` son Artist Valley en el plano. Como este año solo hay
Collector y Commercial, están puestas como *collector* con tono **claro** para que las distingas de un
vistazo. Si quieres un tipo propio, se añade en `config.js` en tres líneas y aparece solo en el desplegable
del builder.

---

## Tables Builder Pro (`builder.html`)

**Dos modos de selección**

- **Islas**: al pulsar una mesa seleccionas las 12 de su isla (todas las del mismo prefijo).
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
que marques en la casilla de al lado. En modo islas el prefijo salta a la letra libre siguiente
(`DIECAST-E` → `DIECAST-J` si de la F a la I ya están cogidas); en modo mesas continúa la numeración.
`Ctrl+D` clona a la derecha.

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
6. `git commit` + `push`. GitHub Pages publica el mapa.
