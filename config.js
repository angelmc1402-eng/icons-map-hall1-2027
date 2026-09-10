/* ============================================================
   ICONS 2027 · HALL 1 · CONFIGURACIÓN ÚNICA
   Este es el ÚNICO archivo que tocas para cambiar precios,
   colores, categorías o la hoja de cálculo.
   Lo usan index.html, builder.html y builder-sellers.html.
   ============================================================ */

window.ICONS_CONFIG = {

    /* --- Identidad del pabellón ------------------------------ */
    hallName: 'HALL 1',
    hallLabel: 'Pabellón 1 · Diecast, Figures & Dolls, Comics & Arcade',
    mapImage: 'Hall 1.png',

    /* --- Hoja de cálculo (Google Sheets publicado como CSV) ---
       Publicar: Archivo > Compartir > Publicar en la web > CSV
       Contrato de columnas (fila 1 = cabecera, se ignora):
         col A = lo que quieras (nombre vendedor, notas...)
         col B = ESTADO   -> "VENDIDA" / "SOLD" marca la mesa como agotada
         col C = ID MESA  -> debe coincidir exactamente con data-info
         col D = (opcional) nombre del vendedor que se muestra en el tooltip
    ---------------------------------------------------------- */
    csvUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSuA_zpd7Ays5Xt9MDPQzkzCbxj8s0SaDgQGhuxcthtMl59F3H9oWipgKfsUmbiDloop2b43rqoq8CG/pub?gid=0&single=true&output=csv',
    csvRefreshMs: 120000,

    /* --- Categorías del pabellón -----------------------------
       key   = prefijo que se usa en el ID (DIECAST-A-1)
       label = lo que ve el público en el tooltip
    ---------------------------------------------------------- */
    categories: [
        { key: 'DIECAST', label: 'Diecast' },
        { key: 'FIGURES', label: 'Figures & Dolls' },
        { key: 'COMICS',  label: 'Comics' },
        { key: 'ARCADE',  label: 'Arcade' }
    ],

    /* --- Tipos de mesa --------------------------------------
       price     = precio de tarifa (se muestra TACHADO)
       earlyBird = descuento aplicado sobre el precio de tarifa
    ---------------------------------------------------------- */
    types: {
        collector: {
            label: 'Collector Table',
            price: 100,
            palette: { light: '#7be3a7', base: '#2ecc71', dark: '#15803d' }
        },
        commercial: {
            label: 'Commercial Table',
            price: 250,
            palette: { light: '#9ed4f7', base: '#3498db', dark: '#1a5f92' }
        }
    },

    /* --- Early bird ------------------------------------------
       active:false  -> el tooltip muestra solo el precio de tarifa
    ---------------------------------------------------------- */
    earlyBird: {
        active: true,
        discount: 0.15,
        label: 'EARLY BIRD −15%'
    },

    /* --- Color de mesa vendida ------------------------------ */
    soldColor: '#e74c3c',
    soldLabel: 'SOLD OUT',

    /* --- Tonos disponibles ---------------------------------- */
    tones: [
        { key: 'light', label: 'Claro' },
        { key: 'base',  label: 'Base' },
        { key: 'dark',  label: 'Oscuro' }
    ],

    /* --- Tamaños por defecto al crear mesas (en % del plano) - */
    defaults: {
        horizontal: { w: 1.10, h: 0.50 },
        vertical:   { w: 0.36, h: 1.42 },
        gapX: 0.02,
        gapY: 0.05,
        cloneGap: 0.30
    }
};

/* ============================================================
   HELPERS COMPARTIDOS — no hace falta tocar nada de aquí abajo
   ============================================================ */
(function () {
    const C = window.ICONS_CONFIG;

    /* Devuelve el color de una mesa según tipo + tono (+ color propio) */
    C.colorFor = function (type, tone, custom) {
        if (custom) return custom;
        const t = C.types[type] || C.types.collector;
        return (t.palette && t.palette[tone]) || t.palette.base;
    };

    /* hex -> rgba con alpha */
    C.rgba = function (hex, alpha) {
        const h = String(hex || '#2ecc71').replace('#', '');
        const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
        const n = parseInt(full, 16);
        const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
        return `rgba(${r},${g},${b},${alpha})`;
    };

    /* Oscurece un hex un % (0-1) para el borde */
    C.shade = function (hex, amount) {
        const h = String(hex || '#2ecc71').replace('#', '');
        const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
        const n = parseInt(full, 16);
        let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
        r = Math.max(0, Math.min(255, Math.round(r * (1 - amount))));
        g = Math.max(0, Math.min(255, Math.round(g * (1 - amount))));
        b = Math.max(0, Math.min(255, Math.round(b * (1 - amount))));
        return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
    };

    /* "DIECAST-A-1" -> "DIECAST-A"  (prefijo de isla) */
    C.groupKey = function (id) {
        id = String(id || '').trim();
        if (!id) return 'SIN-ID';
        return id.replace(/-\d+$/, '');
    };

    /* "DIECAST-A-1" -> 1 */
    C.tableNumber = function (id) {
        const m = String(id || '').match(/-(\d+)$/);
        return m ? parseInt(m[1], 10) : null;
    };

    /* "DIECAST-A-1" -> { cat:'DIECAST', catLabel:'Diecast', zone:'A', num:'1' } */
    C.parseId = function (id) {
        const parts = String(id || '').split('-');
        const catKey = (parts[0] || '').toUpperCase();
        const found = C.categories.find(c => c.key === catKey);
        return {
            cat: catKey,
            catLabel: found ? found.label : (catKey || '—'),
            zone: parts.length >= 3 ? parts[1] : '—',
            num: parts.length >= 3 ? parts[2] : (parts[1] || '—')
        };
    };

    /* Precio formateado en euros españoles */
    C.euro = function (value) {
        return value.toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }) + ' €';
    };

    /* Devuelve { base:'100,00 €', early:'85,00 €'|null } */
    C.priceFor = function (type) {
        const t = C.types[type] || C.types.collector;
        const base = C.euro(t.price);
        if (!C.earlyBird.active) return { base, early: null };
        return { base, early: C.euro(t.price * (1 - C.earlyBird.discount)) };
    };
})();
