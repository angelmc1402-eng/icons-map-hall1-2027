/* ICONS 2027 · HALL 1 · configuración única.
   La leen index.html, filters.html, builder.html y builder-sellers.html.
   Es el único fichero que hay que tocar para precios, colores o categorías. */

window.ICONS_CONFIG = {

    hallName:  'HALL 1',
    hallLabel: 'Pabellón 1 · Diecast, Figures & Dolls, Comics & Arcade',
    mapImage:  'Hall 1.png',

    /* Google Sheets como CSV. La URL de /edit NO sirve, tiene que devolver CSV:
         compartida como lector -> .../d/ID_LIBRO/gviz/tq?tqx=out:csv&gid=NNN
         publicada en la web    -> .../d/e/2PACX-.../pub?gid=NNN&single=true&output=csv
       Columnas (fila 1 = cabecera, se ignora):
         A libre · B estado (VENDIDA/SOLD = agotada) · C id de mesa · D expositor (opcional) */
    csvUrl: 'https://docs.google.com/spreadsheets/d/1b9mT5RqDehK0-28XoN2LCMg80D7Yv8uHFVDbofPK0gw/gviz/tq?tqx=out:csv&gid=672655889',
    csvRefreshMs: 120000,

    /* key = prefijo del id (DIECAST-A-1) · label = lo que ve el público */
    categories: [
        { key: 'DIECAST', label: 'Diecast' },
        { key: 'FIGURES', label: 'Figures & Dolls' },
        { key: 'COMICS',  label: 'Comics' },
        { key: 'ARCADE',  label: 'Arcade' }
    ],

    /* price = tarifa; se muestra tachada y al lado el precio con descuento */
    types: {
        collector: {
            label: 'Collector Table',
            price: 100,
            palette: { light: '#6ee7b7', base: '#10b981', dark: '#047857' }
        },
        commercial: {
            label: 'Commercial Table',
            price: 250,
            palette: { light: '#93c5fd', base: '#3b82f6', dark: '#1d4ed8' }
        }
    },

    /* active:false -> solo se muestra la tarifa. label = solo la leyenda de filters.html */
    earlyBird: { active: true, discount: 0.15, label: 'EARLY BIRD −15%' },

    soldColor: '#e11d48',
    soldLabel: 'SOLD OUT',

    /* RECUENTO DE CLICS en las fichas de sponsors (web / Instagram).
       endpoint = URL /exec del Apps Script de la hoja «ICONS 2027 · Clics sponsors».
       Vacío = no se cuenta nada. Las UTM se añaden solas a las webs (no a Instagram);
       si un enlace ya trae sus propias utm_, se respeta. */
    tracking: {
        endpoint: 'https://script.google.com/macros/s/AKfycbyCYgCFn9OIzmw4MzK5EHW34pGYBkW3jRATBKQVbL_AQ3AlnWHuzEuSuQ8La1S0BeuE/exec',
        utm: { utm_source: 'iconscollectibles', utm_medium: 'floor_map', utm_campaign: 'icons2027' },
        /* webs a las que NO se les añaden UTM porque se rompen con parámetros en la URL.
           También se puede desactivar por seller en el builder (casilla «Sin UTM»). */
        noUtm: ['pcagrade.com']
    },

    /* size y border en px de pantalla · zoom = aumento sobre la vista completa
       enabled:false -> sin lupa, y en ×1 vuelven las fichas de mesa */
    loupe: { enabled: true, size: 280, zoom: 3, border: 3 },

    tones: [
        { key: 'light', label: 'Claro' },
        { key: 'base',  label: 'Base' },
        { key: 'dark',  label: 'Oscuro' }
    ],

    /* STANDS · huecos verdes del plano (relleno #8BEDC3, borde #00857C), en px del PNG.
       Los usa builder-sellers.html para crear sellers encajados al milímetro, y el mapa
       público para el redondeo del logo. Si cambia el PNG, se regeneran con el script de detección.
       r = radio de esquina en px del plano. */
    stands: {
        imageW: 7499, imageH: 5675,
        freeRadius: 14,
        list: [
            { id:'S01', group:'Stands · fila superior', x:1947, y:841, w:354, h:337, r:27 },
            { id:'S02', group:'Stands · fila superior', x:2314, y:841, w:355, h:337, r:27 },
            { id:'S03', group:'Stands · fila superior', x:2682, y:841, w:355, h:337, r:27 },
            { id:'S04', group:'Stands · fila superior', x:3050, y:841, w:354, h:337, r:27 },
            { id:'S05', group:'Stands · zona central', x:1949, y:2720, w:232, h:381, r:27 },
            { id:'S06', group:'Stands · zona central', x:2378, y:2720, w:232, h:381, r:27 },
            { id:'S07', group:'Stands · zona central', x:2807, y:2720, w:232, h:381, r:27 },
            { id:'S08', group:'Stands · zona central', x:3236, y:2720, w:232, h:381, r:27 },
            { id:'S09', group:'Stands · zona central', x:3665, y:2720, w:232, h:381, r:27 },
            { id:'S10', group:'Stands · zona central', x:4094, y:2720, w:232, h:381, r:27 },
            { id:'S11', group:'Stands · zona central', x:4523, y:2720, w:232, h:381, r:27 },
            { id:'S12', group:'Stands · zona central', x:4952, y:2720, w:232, h:381, r:27 },
            { id:'S13', group:'Stands · zona central', x:5381, y:2720, w:232, h:381, r:27 },
            { id:'S14', group:'Stands · zona central', x:5849, y:2722, w:233, h:381, r:27 },
            { id:'S15', group:'Stands Diecast', x:619, y:3354, w:355, h:337, r:27 },
            { id:'S16', group:'Stands Diecast', x:987, y:3354, w:355, h:337, r:27 },
            { id:'S17', group:'Stands Diecast', x:1355, y:3354, w:354, h:337, r:27 },
            { id:'S18', group:'Stands · zona central', x:1949, y:3341, w:232, h:381, r:27 },
            { id:'S19', group:'Stands · zona central', x:2378, y:3341, w:232, h:381, r:27 },
            { id:'S20', group:'Stands · zona central', x:2807, y:3341, w:232, h:381, r:27 },
            { id:'S21', group:'Stands · zona central', x:3236, y:3341, w:232, h:381, r:27 },
            { id:'S22', group:'Stands · zona central', x:3665, y:3341, w:232, h:381, r:27 },
            { id:'S23', group:'Stands · zona central', x:4094, y:3341, w:232, h:381, r:27 },
            { id:'S24', group:'Stands · zona central', x:4523, y:3341, w:232, h:381, r:27 },
            { id:'S25', group:'Stands · zona central', x:4952, y:3341, w:232, h:381, r:27 },
            { id:'S26', group:'Stands · zona central', x:5381, y:3341, w:232, h:381, r:27 },
            { id:'S27', group:'Stands · zona central', x:5859, y:3340, w:764, h:232, r:27 },
            { id:'S28', group:'Stands · pasillo inferior', x:1491, y:4034, w:154, h:146, r:17 },
            { id:'S29', group:'Stands · pasillo inferior', x:1656, y:4034, w:154, h:146, r:17 },
            { id:'S30', group:'Stands · pasillo inferior', x:1821, y:4034, w:154, h:146, r:17 },
            { id:'S31', group:'Stands · pasillo inferior', x:1986, y:4034, w:154, h:146, r:17 },
            { id:'S32', group:'Stands · pasillo inferior', x:2151, y:4034, w:154, h:146, r:17 },
            { id:'S33', group:'Stands · pasillo inferior', x:2316, y:4034, w:154, h:145, r:17 },
            { id:'S34', group:'Stands · pasillo inferior', x:2891, y:4034, w:153, h:146, r:17 },
            { id:'S35', group:'Stands · pasillo inferior', x:3056, y:4034, w:153, h:146, r:17 },
            { id:'S36', group:'Stands · pasillo inferior', x:3221, y:4034, w:153, h:146, r:17 },
            { id:'S37', group:'Stands · pasillo inferior', x:3386, y:4034, w:153, h:145, r:17 },
            { id:'S38', group:'Stands · pasillo inferior', x:3551, y:4034, w:153, h:145, r:17 },
            { id:'S39', group:'Stands · pasillo inferior', x:3716, y:4034, w:153, h:146, r:17 },
            { id:'S40', group:'Stands · pasillo inferior', x:4092, y:4034, w:153, h:145, r:17 },
            { id:'S41', group:'Stands · pasillo inferior', x:4257, y:4034, w:153, h:145, r:17 },
            { id:'S42', group:'Stands · pasillo inferior', x:4422, y:4034, w:153, h:146, r:17 },
            { id:'S43', group:'Stands · pasillo inferior', x:5031, y:4034, w:153, h:146, r:17 },
            { id:'S44', group:'Stands · pasillo inferior', x:5196, y:4034, w:153, h:146, r:17 },
            { id:'S45', group:'Stands · pasillo inferior', x:5361, y:4034, w:153, h:145, r:17 }
        ]
    },

    /* medidas del builder, en % del plano. Mesa real de HALL 1: 85x25 px sobre 7499x5675 */
    defaults: {
        horizontal: { w: 1.1335, h: 0.4405 },
        vertical:   { w: 0.3334, h: 1.4978 },
        gapX: 0.04,
        gapY: 0.07,
        cloneGap: 0.30,
        /* hueco máximo en px del plano para que el builder considere dos mesas
           de la misma isla: mayor que el hueco interior del anillo (~79 px) y
           menor que la separación entre anillos (>165 px) */
        islandGapPx: 110,
        ring: { top: 2, side: 4, bottom: 2 }
    }
};

/* ---- helpers compartidos · no hace falta tocar nada de aquí abajo ---- */
(function () {
    const C = window.ICONS_CONFIG;

    /* color de una mesa: tipo + tono, o color propio si lo trae */
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

    /* oscurece un hex un % (0-1) */
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

    /* ---- STANDS (huecos verdes) ------------------------------------ */
    /* slot en px del plano -> caja en % del plano + radio en % de la propia caja */
    C.standBox = function (s) {
        const W = C.stands.imageW, H = C.stands.imageH;
        return { id: s.id, group: s.group, r: s.r,
                 l: s.x / W * 100, t: s.y / H * 100, w: s.w / W * 100, h: s.h / H * 100 };
    };
    C.standById = function (id) {
        const s = ((C.stands && C.stands.list) || []).find(function (x) { return x.id === id; });
        return s ? C.standBox(s) : null;
    };
    /* stand cuyo marco contiene el punto (x, y en % del plano) */
    C.standAt = function (x, y) {
        const l = (C.stands && C.stands.list) || [];
        for (let i = 0; i < l.length; i++) {
            const b = C.standBox(l[i]);
            if (x >= b.l && x <= b.l + b.w && y >= b.t && y <= b.t + b.h) return b;
        }
        return null;
    };
    /* border-radius CSS para una caja de wPct x hPct (% del plano) con radio rPx (px del plano).
       En % de la propia caja, así escala con el zoom y nunca se sale del marco. */
    C.radiusCss = function (wPct, hPct, rPx) {
        const W = (C.stands && C.stands.imageW) || 1, H = (C.stands && C.stands.imageH) || 1;
        const wpx = wPct / 100 * W, hpx = hPct / 100 * H;
        if (!(wpx > 0 && hpx > 0)) return '';
        const r = Math.min(rPx, wpx / 2, hpx / 2);
        return (r / wpx * 100).toFixed(3) + '% / ' + (r / hpx * 100).toFixed(3) + '%';
    };

    /* encaja un .sponsor-zone del mapa público: si trae data-slot (o cae dentro de un
       stand verde con tamaño parecido) toma la geometría exacta del stand, y le pone el
       mismo redondeo. Devuelve false si el seller no tiene ni nombre ni logo (no se pinta). */
    C.fitSeller = function (el) {
        if (!(el.dataset.name || '').trim() && !(el.dataset.logo || '').trim()) return false;
        const p = function (v) { return parseFloat(String(v || '').replace('%', '')) || 0; };
        let w = p(el.style.width), h = p(el.style.height);
        let b = el.dataset.slot ? C.standById(el.dataset.slot) : null;
        if (!b && C.stands) {
            const c = C.standAt(p(el.style.left) + w / 2, p(el.style.top) + h / 2);
            if (c && (w * h) / (c.w * c.h) >= 0.4) b = c;
        }
        let r = parseFloat(el.dataset.r) || (C.stands && C.stands.freeRadius) || 14;
        if (b) {
            el.style.left = b.l + '%'; el.style.top = b.t + '%';
            el.style.width = b.w + '%'; el.style.height = b.h + '%';
            w = b.w; h = b.h; r = b.r;
        }
        const css = C.radiusCss(w, h, r);
        if (css) el.style.borderRadius = css;
        return true;
    };

    /* añade las UTM de tracking.utm a una web (no a Instagram ni a enlaces que ya traen utm_) */
    C.withUtm = function (url, off) {
        const utm = C.tracking && C.tracking.utm;
        if (off || !url || !utm || /instagram\.com/i.test(url) || /[?&]utm_/i.test(url)) return url;
        try {
            const u = new URL(url);
            const host = u.hostname.replace(/^www\./, '');
            const skip = (C.tracking.noUtm || []).some(function (d) {
                d = String(d).replace(/^www\./, '');
                return host === d || host.endsWith('.' + d);
            });
            if (skip) return url;
            Object.keys(utm).forEach(function (k) { u.searchParams.set(k, utm[k]); });
            return u.toString();
        } catch (e) { return url; }
    };

    /* cuenta un clic en la hoja (sin cookies ni identificadores: solo sponsor, tipo, pabellón y dispositivo) */
    C.trackClick = (function () {
        let last = '', lastT = 0;
        return function (data) {
            const ep = C.tracking && C.tracking.endpoint;
            if (!ep) return;
            const key = data.sponsor + '|' + data.type;
            if (key === last && Date.now() - lastT < 3000) return;   /* doble clic = 1 */
            last = key; lastT = Date.now();
            const body = JSON.stringify(Object.assign({
                hall: C.hallName,
                device: window.matchMedia('(hover: none)').matches ? 'mobile' : 'desktop',
                lang: (navigator.language || '').slice(0, 5)
            }, data));
            try {
                if (navigator.sendBeacon && navigator.sendBeacon(ep, body)) return;
            } catch (e) {}
            try { fetch(ep, { method: 'POST', body: body, mode: 'no-cors', keepalive: true }); } catch (e) {}
        };
    })();

    /* "DIECAST-A-1" -> "DIECAST-A" */
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

    /* "DIECAST-A-1" -> { cat, catLabel, zone, num } */
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

    /* 100 -> "100,00 €" */
    C.euro = function (value) {
        return value.toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }) + ' €';
    };

    /* -> { base:'100,00 €', early:'85,00 €'|null }
       units = nº de mesas (las esquinas van de dos en dos) */
    C.priceFor = function (type, units) {
        const t = C.types[type] || C.types.collector;
        const n = units > 0 ? units : 1;
        const total = t.price * n;
        const base = C.euro(total);
        if (!C.earlyBird.active) return { base, early: null };
        return { base, early: C.euro(total * (1 - C.earlyBird.discount)) };
    };

    /* ---- ESQUINAS ---------------------------------------------------
       Las mesas que hacen esquina se contratan juntas, nunca sueltas.
       Una esquina son dos mesas de la misma isla, una horizontal y una
       vertical, que se tocan por un extremo y comparten el borde de
       arriba o el de abajo. Se detecta sobre la geometría real del
       plano, así que si se redibuja no hay que tocar nada de aquí. */
    C.corner = {
        tol: 0.14,          /* % del plano; menor que el ancho de una mesa (0.33) */
        pairs: new Map(),   /* id de mesa -> id de su pareja */

        /* recibe los nodos .mesa ya insertados y rellena el mapa */
        build: function (nodes) {
            const caja = function (el) {
                const x = parseFloat(el.style.left), y = parseFloat(el.style.top);
                const w = parseFloat(el.style.width), h = parseFloat(el.style.height);
                return { id: el.dataset.info || '', x: x, y: y, x2: x + w, y2: y + h,
                         isla: String(el.dataset.info || '').replace(/-\d+$/, ''),
                         horiz: w > h, ok: isFinite(x) && isFinite(y) && isFinite(w) && isFinite(h) };
            };
            const todas = Array.prototype.map.call(nodes, caja).filter(function (b) { return b.id && b.ok; });
            const H = todas.filter(function (b) { return b.horiz; });
            const V = todas.filter(function (b) { return !b.horiz; });
            const t = C.corner.tol, pares = new Map();
            H.forEach(function (h) {
                V.forEach(function (v) {
                    if (h.isla !== v.isla) return;
                    if (pares.has(h.id) || pares.has(v.id)) return;
                    const tocan  = Math.abs(v.x2 - h.x) < t || Math.abs(h.x2 - v.x) < t;
                    if (!tocan) return;
                    const alinea = Math.abs(h.y - v.y) < t || Math.abs(h.y2 - v.y2) < t;
                    if (!alinea) return;
                    pares.set(h.id, v.id);
                    pares.set(v.id, h.id);
                });
            });
            C.corner.pairs = pares;
            return pares.size / 2;
        },

        partner: function (id) { return C.corner.pairs.get(id) || null; },
        is:      function (id) { return C.corner.pairs.has(id); }
    };
})();
