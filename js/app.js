// ═══════════════════════════════════════════════════════════════════════════
//  Portfolio · escritorio estilo macOS
// ═══════════════════════════════════════════════════════════════════════════

(() => {
  const C = window.CONTENT;
  const LANGS = { es: "Español", en: "English", pt: "Português" };
  const LOCALES = { es: "es-ES", en: "en-GB", pt: "pt-PT" };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const isMobile = () => matchMedia("(max-width: 767px)").matches;
  const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

  let lang = detectLang();
  const t = key => C.ui[lang][key] ?? C.ui.es[key] ?? key;
  const L = v => (v && typeof v === "object" ? (v[lang] ?? v.es) : v ?? "");
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function detectLang() {
    try {
      const saved = localStorage.getItem("lang");
      if (saved && LANGS[saved]) return saved;
    } catch (e) {}
    const nav = (navigator.language || "es").slice(0, 2);
    return LANGS[nav] ? nav : "es";
  }

  // ─── Iconos ───────────────────────────────────────────────────────────────

  const GLYPH = {
    about: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
    projects: '<path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
    education: '<path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11.2V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.8"/>',
    experience: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5h6v2M3 13h18"/>',
    certs: '<circle cx="12" cy="9" r="6"/><path d="M8.6 14 7 22l5-3 5 3-1.6-8"/>',
    tools: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.4 2.4-2.6-.4-.4-2.6z"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 7 8.5-7"/>',
    doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>'
  };
  const glyph = (name, cls = "") =>
    `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${GLYPH[name]}</svg>`;

  const ICON = {
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 5-7 7 7 7"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>',
    external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 3 10 14M21 3l-7 18-4-7-7-4z"/></svg>',
    close: '<svg viewBox="0 0 10 10" aria-hidden="true"><path d="m2.5 2.5 5 5m0-5-5 5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>',
    min: '<svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2 5h6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>',
    zoom: '<svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2.6 6.8V2.6h4.2zM7.4 3.2v4.2H3.2z" fill="currentColor"/></svg>',
    pdf: '<svg viewBox="0 0 44 56" aria-hidden="true"><path d="M4 1h25l14 14v37a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3z" fill="#fff" stroke="#c7cbd1" stroke-width="1.4"/><path d="M29 1v11a3 3 0 0 0 3 3h11" fill="#eceef1" stroke="#c7cbd1" stroke-width="1.4"/><rect x="1" y="31" width="30" height="13" rx="2" fill="#e5352b"/><text x="16" y="40.6" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-size="9" font-weight="700" fill="#fff">PDF</text></svg>'
  };

  // Carpeta azul al estilo de macOS, con el símbolo grabado en la parte delantera
  function folderSVG(name, cls = "folder-svg") {
    const id = "f" + Math.random().toString(36).slice(2, 8);
    // Las hojas asoman solo en las carpetas grandes del escritorio; en los títulos pequeños quedarían como ruido
    const papers = cls === "folder-svg";
    const mark = (dx, dy, color, op) =>
      `<g transform="translate(${26 + dx} ${25 + dy}) scale(.8)" fill="none" stroke="${color}" stroke-opacity="${op}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${GLYPH[name] || ""}</g>`;
    return `<svg class="${cls}" viewBox="0 0 72 60" aria-hidden="true">
      <defs>
        <linearGradient id="${id}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3f95ea"/><stop offset="1" stop-color="#2a70d2"/></linearGradient>
        <linearGradient id="${id}f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fcdff"/><stop offset="1" stop-color="#4b9ff0"/></linearGradient>
      </defs>
      <path d="M7 5h18.5c1.8 0 3 .7 4 2.1L32 11h33a5 5 0 0 1 5 5v35a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V10a5 5 0 0 1 5-5z" fill="url(#${id}b)"/>
      ${papers ? `<rect x="9" y="8" width="52" height="32" rx="3" fill="#fff" transform="rotate(-2.4 35 24)"/>
      <rect x="12" y="10" width="52" height="32" rx="3" fill="#eef1f6" transform="rotate(2 38 26)"/>
      <path d="M18 18h22M18 23h30M18 28h18" stroke="#c4cad6" stroke-width="1.6" stroke-linecap="round" transform="rotate(2 38 26)"/>` : ""}
      <path d="M7 16.5h58a5 5 0 0 1 5 5V51a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V21.5a5 5 0 0 1 5-5z" fill="url(#${id}f)"/>
      <path d="M7.5 17h57" stroke="#fff" stroke-opacity=".7" stroke-width="1"/>
      <path d="M2 48v3a5 5 0 0 0 5 5h58a5 5 0 0 0 5-5v-3" fill="none" stroke="#2b6fc4" stroke-opacity=".35" stroke-width="1"/>
      ${mark(.7, .9, "#fff", ".6")}${mark(0, 0, "#1f63bd", ".62")}
    </svg>`;
  }

  // ─── Documentos (CV y certificados) ───────────────────────────────────────

  function docFor(key) {
    if (key === "cv") return { key, title: "CV_Daniel_Diaz.pdf", file: C.links.cv };
    const cert = C.certs[Number(key)];
    return { key, title: L(cert.name), file: cert.file, more: cert.more };
  }

  // ─── Gestor de ventanas ───────────────────────────────────────────────────

  const windowsEl = $("#windows");
  const desktopEl = $("#desktop");
  const wins = new Map();
  let zTop = 100;
  let cascade = 0;
  let focused = null;

  const deskSize = () => ({ w: desktopEl.clientWidth, h: desktopEl.clientHeight });
  const dockSpace = () => ($(".dock").offsetHeight || 64) + 18;

  function createWindow({ id, kind, sidebar = false, width, height, from = null }) {
    const el = document.createElement("section");
    el.className = "window resizable" + (sidebar ? "" : " no-sidebar");
    el.setAttribute("role", "dialog");
    el.dataset.id = id;

    const traffic = `<div class="traffic">
      <button class="t-close" data-win="close">${ICON.close}</button>
      <button class="t-min" data-win="min">${ICON.min}</button>
      <button class="t-zoom" data-win="zoom">${ICON.zoom}</button>
    </div>`;

    el.innerHTML = `
      ${sidebar ? `<aside class="win-sidebar"><div class="win-sidebar-top" data-drag>${traffic}</div><div class="side-body"></div></aside>` : ""}
      <div class="win-main">
        <div class="win-toolbar" data-drag>
          ${sidebar ? "" : traffic}
          <button class="win-home" data-win="close">${ICON.left}<span></span></button>
          ${kind === "finder" ? `<div class="win-nav"><button class="icon-btn" data-win="back">${ICON.left}</button><button class="icon-btn" data-win="forward">${ICON.right}</button></div>` : ""}
          <div class="win-title"></div>
          <div class="win-tools"></div>
        </div>
        <div class="win-content"></div>
        ${kind === "finder" ? '<div class="win-status"></div>' : ""}
      </div>`;

    const { w: dw, h: dh } = deskSize();
    const w = Math.min(width, dw - 32);
    const h = Math.min(height, dh - dockSpace() - 24);
    const iconsSpace = ($("#desktopIcons").offsetWidth || 100) + 28;
    let x = Math.round((dw - iconsSpace - w) / 2) + cascade * 30;
    let y = 22 + cascade * 26;
    x = Math.max(12, Math.min(x, dw - iconsSpace - w));
    y = Math.max(8, Math.min(y, dh - h - dockSpace()));
    cascade = (cascade + 1) % 6;

    Object.assign(el.style, { left: x + "px", top: y + "px", width: w + "px", height: h + "px" });
    windowsEl.appendChild(el);

    // La barra de navegación (móvil) muestra su línea inferior al desplazar el contenido
    const scroller = $(".win-content", el);
    scroller.addEventListener("scroll", () => el.classList.toggle("scrolled", scroller.scrollTop > 4), { passive: true });

    const win = { id, kind, el, history: [], hi: -1, folder: null, filter: "all", doc: null, minimized: false, maximized: false };
    wins.set(id, win);
    bindDrag(win);
    el.addEventListener("pointerdown", () => focusWindow(win), true);

    if (isMobile()) {
      // La app se abre (y se cierra) desde el icono que la lanzó, como en iOS
      const r = from && from.getBoundingClientRect();
      el.style.transformOrigin = r && r.width ? `${r.left + r.width / 2}px ${r.top + r.height / 2}px` : "50% 100%";
      try { history.pushState({ win: id }, ""); } catch (e) {}
    }
    return win;
  }

  function focusWindow(win) {
    if (!win || win.minimized) return;
    if (zTop > 7000) {
      [...wins.values()].sort((a, b) => a.el.style.zIndex - b.el.style.zIndex)
        .forEach((w, i) => { w.el.style.zIndex = 100 + i; });
      zTop = 100 + wins.size;
    }
    win.el.style.zIndex = ++zTop;
    focused = win;
    wins.forEach(w => w.el.classList.toggle("focused", w === win));
    updateMenuApp();
    syncMobileState();
  }

  function syncMobileState() {
    document.body.classList.toggle("win-open", isMobile() && [...wins.values()].some(w => !w.minimized));
  }

  function topWindow() {
    return [...wins.values()].filter(w => !w.minimized)
      .sort((a, b) => b.el.style.zIndex - a.el.style.zIndex)[0] || null;
  }

  function closeWindow(win, { fromHistory = false } = {}) {
    if (!win || !wins.has(win.id)) return;
    if (isMobile() && !fromHistory && history.state && history.state.win === win.id) {
      history.back();          // el evento popstate cerrará la ventana
      return;
    }
    wins.delete(win.id);
    removeMinTile(win.id);
    const el = win.el;
    el.classList.add("closing");
    const done = () => el.remove();
    if (reducedMotion()) done(); else el.addEventListener("animationend", done, { once: true });
    setTimeout(done, 400);
    if (focused === win) { focused = null; focusWindow(topWindow()); }
    updateMenuApp();
    updateDock();
    syncMobileState();
  }

  function minimizeWindow(win) {
    if (isMobile()) return closeWindow(win);
    win.minimized = true;
    const tile = addMinTile(win);
    const r = win.el.getBoundingClientRect();
    const tr = tile.getBoundingClientRect();
    const dx = tr.left + tr.width / 2 - (r.left + r.width / 2);
    const dy = tr.top + tr.height / 2 - (r.top + r.height / 2);
    const s = Math.max(.05, tr.width / r.width);
    win.el.classList.add("minimizing");
    win.el.style.transform = `translate(${dx}px, ${dy}px) scale(${s})`;
    setTimeout(() => { if (win.minimized) win.el.hidden = true; }, 330);
    if (focused === win) { focused = null; focusWindow(topWindow()); }
    updateMenuApp();
  }

  function restoreWindow(win) {
    win.minimized = false;
    win.el.hidden = false;
    removeMinTile(win.id);
    requestAnimationFrame(() => {
      win.el.style.transform = "";
      win.el.classList.remove("minimizing");
      focusWindow(win);
    });
  }

  function toggleZoom(win) {
    if (isMobile()) return;
    const el = win.el;
    if (!win.maximized) {
      win.prevRect = { left: el.style.left, top: el.style.top, width: el.style.width, height: el.style.height };
      const { w, h } = deskSize();
      Object.assign(el.style, { left: "0px", top: "0px", width: w + "px", height: h - dockSpace() + "px" });
    } else if (win.prevRect) {
      Object.assign(el.style, win.prevRect);
    }
    win.maximized = !win.maximized;
    el.classList.toggle("maximized", win.maximized);
  }

  function bindDrag(win) {
    const el = win.el;
    $$("[data-drag]", el).forEach(handle => {
      handle.addEventListener("pointerdown", e => {
        if (isMobile() || e.button !== 0 || e.target.closest("button, a, input, .segmented")) return;
        const startX = e.clientX, startY = e.clientY;
        const left = el.offsetLeft, top = el.offsetTop;
        el.classList.add("dragging");
        handle.setPointerCapture(e.pointerId);
        const move = ev => {
          const { w: dw, h: dh } = deskSize();
          const nx = Math.min(Math.max(left + ev.clientX - startX, 80 - el.offsetWidth), dw - 80);
          const ny = Math.min(Math.max(top + ev.clientY - startY, 0), dh - 52);
          el.style.left = nx + "px";
          el.style.top = ny + "px";
          if (win.maximized) { win.maximized = false; el.classList.remove("maximized"); }
        };
        const up = () => {
          el.classList.remove("dragging");
          handle.removeEventListener("pointermove", move);
          handle.removeEventListener("pointerup", up);
          handle.removeEventListener("pointercancel", up);
        };
        handle.addEventListener("pointermove", move);
        handle.addEventListener("pointerup", up);
        handle.addEventListener("pointercancel", up);
      });
      handle.addEventListener("dblclick", e => {
        if (!e.target.closest("button, a, input, .segmented")) toggleZoom(win);
      });
    });
  }

  // Mantiene las ventanas dentro de la pantalla al cambiar su tamaño
  let wasMobile = isMobile();
  addEventListener("resize", () => {
    syncMobileState();
    if (isMobile() !== wasMobile) {
      // Al cruzar entre escritorio y móvil, "Sobre mí" cambia de página corta a larga
      wasMobile = isMobile();
      wins.forEach(w => { if (w.kind === "finder" && w.folder === "about") renderWindow(w); });
    }
    if (isMobile()) return;
    const { w: dw, h: dh } = deskSize();
    wins.forEach(win => {
      const el = win.el;
      if (win.maximized) {
        Object.assign(el.style, { width: dw + "px", height: dh - dockSpace() + "px" });
        return;
      }
      el.style.left = Math.min(el.offsetLeft, Math.max(0, dw - 120)) + "px";
      el.style.top = Math.min(el.offsetTop, Math.max(0, dh - 80)) + "px";
    });
  });

  // ─── Apertura de ventanas ─────────────────────────────────────────────────

  function openFolder(folder) {
    const existing = [...wins.values()].find(w => w.kind === "finder" && w.folder === folder);
    if (existing) {
      if (existing.minimized) restoreWindow(existing); else focusWindow(existing);
      return existing;
    }
    const big = folder === "about" || folder === "projects";
    const win = createWindow({ id: "finder-" + Date.now(), kind: "finder", sidebar: true, width: big ? 900 : 760, height: big ? 620 : 540, from: $(`.desk-icon[data-folder="${folder}"] .app-icon`) });
    win.folder = folder;
    win.history = [folder];
    win.hi = 0;
    renderWindow(win);
    focusWindow(win);
    updateDock();
    return win;
  }

  function navigate(win, folder) {
    if (win.folder === folder) return;
    const other = [...wins.values()].find(w => w !== win && w.kind === "finder" && w.folder === folder);
    if (other && !isMobile()) {
      if (other.minimized) restoreWindow(other); else focusWindow(other);
      return;
    }
    win.history = win.history.slice(0, win.hi + 1);
    win.history.push(folder);
    win.hi = win.history.length - 1;
    win.folder = folder;
    win.filter = "all";
    renderWindow(win);
    updateDock();
  }

  function goHistory(win, step) {
    const next = win.hi + step;
    if (next < 0 || next >= win.history.length) return;
    win.hi = next;
    win.folder = win.history[next];
    win.filter = "all";
    renderWindow(win);
    updateDock();
  }

  function openPreview(key) {
    const id = "preview-" + key;
    const existing = wins.get(id);
    if (existing) {
      if (existing.minimized) restoreWindow(existing); else focusWindow(existing);
      return;
    }
    const { h } = deskSize();
    const win = createWindow({ id, kind: "preview", width: 720, height: Math.max(520, h - 60), from: key === "cv" ? $('[data-dock="cv"] .dock-icon') : null });
    win.doc = docFor(key);
    renderWindow(win);
    focusWindow(win);
    bounceDock(key === "cv" ? "cv" : null);
    updateDock();
  }

  function openMail() {
    const existing = wins.get("mail");
    if (existing) {
      if (existing.minimized) restoreWindow(existing); else focusWindow(existing);
      return;
    }
    const win = createWindow({ id: "mail", kind: "mail", width: 600, height: 640, from: $('[data-dock="mail"] .dock-icon') });
    renderWindow(win);
    focusWindow(win);
    bounceDock("mail");
    updateDock();
  }

  // ─── Pintado de ventanas ──────────────────────────────────────────────────

  function renderWindow(win) {
    const el = win.el;
    const title = $(".win-title", el);
    const tools = $(".win-tools", el);
    const content = $(".win-content", el);
    $(".win-home span", el).textContent = t("win.home");
    $$("[data-win=close]", el).forEach(b => b.setAttribute("aria-label", t("win.close")));
    $$("[data-win=min]", el).forEach(b => b.setAttribute("aria-label", t("win.minimize")));
    $$("[data-win=zoom]", el).forEach(b => b.setAttribute("aria-label", t("win.zoom")));

    if (win.kind === "finder") {
      const name = t("folder." + win.folder);
      el.dataset.folder = win.folder;
      el.setAttribute("aria-label", name);
      title.innerHTML = folderSVG(win.folder, "") + `<span>${esc(name)}</span>`;
      const back = $("[data-win=back]", el), fwd = $("[data-win=forward]", el);
      back.disabled = win.hi <= 0;
      fwd.disabled = win.hi >= win.history.length - 1;
      back.setAttribute("aria-label", t("win.back"));
      fwd.setAttribute("aria-label", t("win.forward"));

      const view = FOLDERS[win.folder](win);
      content.innerHTML = view.html;
      tools.innerHTML = view.tools || "";
      $(".win-status", el).textContent = view.status || "";
      $(".side-body", el).innerHTML = sidebarHTML(win.folder);
      content.scrollTop = 0;
      win.section = win.folder;
      bindSectionSpy(win);
    }

    if (win.kind === "preview") {
      const d = win.doc;
      el.setAttribute("aria-label", d.title);
      title.innerHTML = `<span>${esc(d.title)}</span>`;
      tools.innerHTML = `
        ${d.more ? `<a class="btn btn-sm" href="${d.more}" target="_blank" rel="noopener">${t("certs.viewMore")}</a>` : ""}
        <a class="icon-btn" href="${d.file}" download title="${t("preview.download")}" aria-label="${t("preview.download")}">${ICON.download}</a>
        <a class="icon-btn" href="${d.file}" target="_blank" rel="noopener" title="${t("preview.newTab")}" aria-label="${t("preview.newTab")}">${ICON.external}</a>`;
      const inline = !isMobile() && navigator.pdfViewerEnabled !== false;
      if (inline) {
        if (!$("iframe", content)) content.innerHTML = `<iframe class="preview-frame" src="${d.file}#view=FitH" title="${esc(d.title)}"></iframe>`;
        $("iframe", content).title = d.title;
      } else {
        content.innerHTML = `<div class="preview-fallback">
          ${ICON.pdf}
          <strong>${esc(d.title)}</strong>
          <span style="color:var(--text-3)">${t("preview.fallback")}</span>
          <div class="about-actions" style="justify-content:center">
            <a class="btn btn-primary" href="${d.file}" target="_blank" rel="noopener">${ICON.external}${t("preview.newTab")}</a>
            <a class="btn" href="${d.file}" download>${ICON.download}${t("preview.download")}</a>
          </div>
        </div>`;
      }
    }

    if (win.kind === "mail") renderMail(win, title, tools, content);
    updateMenuApp();
  }

  function sidebarHTML(active) {
    const fav = C.folders.map(f => `
      <button class="side-item${f === active ? " active" : ""}" data-action="open" data-target="${f}">${glyph(f)}<span>${esc(t("folder." + f))}</span></button>`).join("");
    return `
      <div class="side-group"><p class="side-heading">${t("side.favorites")}</p>${fav}</div>
      <div class="side-group"><p class="side-heading">${t("side.links")}</p>
        <button class="side-item" data-action="mail">${glyph("mail")}<span>${t("dock.mail")}</span></button>
        <button class="side-item" data-action="cv">${glyph("doc")}<span>${t("dock.cv")}</span></button>
        <a class="side-item" href="${C.links.github}" target="_blank" rel="noopener">${glyph("link")}<span>GitHub</span></a>
        <a class="side-item" href="${C.links.linkedin}" target="_blank" rel="noopener">${glyph("link")}<span>LinkedIn</span></a>
      </div>`;
  }

  const count = n => (n === 1 ? t("status.item") : t("status.items").replace("{n}", n));

  const langSwitcher = () => `<div class="lang-switch" role="group" aria-label="${esc(t("menu.lang"))}">${glyph("globe")}<div class="segmented">${
    Object.entries(LANGS).map(([code, name]) =>
      `<button data-action="lang" data-value="${code}" aria-pressed="${code === lang}" title="${name}" lang="${code}">${code.toUpperCase()}</button>`).join("")
  }</div></div>`;

  const FOLDERS = {
    about: () => ({
      status: t("status.about"),
      tools: langSwitcher(),
      html: `<div class="pane">
        <div class="about-hero">
          <img class="about-photo" src="assets/img/fotoHome.jpg" alt="Daniel Díaz Canosa" width="150" height="190">
          <div>
            <span class="badge">${t("about.availability")}</span>
            <h2 class="about-name">Daniel Díaz Canosa</h2>
            <p>${t("about.text")}</p>
            <div class="about-actions">
              <button class="btn btn-primary" data-action="open" data-target="projects"><span class="btn-ico">${glyph("projects")}</span>${t("about.btnProjects")}</button>
              <button class="btn" data-action="cv"><span class="btn-ico">${glyph("doc")}</span>${t("about.btnCv")}</button>
              <button class="btn" data-action="mail"><span class="btn-ico">${glyph("mail")}</span>${t("about.btnContact")}</button>
            </div>
          </div>
        </div>
        <div class="about-body">
          <p class="lead">${t("about.lead")}</p>
          <p>${t("about.p2")}</p>
          <p>${t("about.p3")}</p>
        </div>
      </div>`
    }),

    projects: win => {
      const list = C.projects.filter(p => win.filter === "all" || p.category === win.filter);
      const seg = ["all", "web", "java"].map(f =>
        `<button data-action="filter" data-value="${f}" aria-pressed="${win.filter === f}">${t("proj." + f)}</button>`).join("");
      return {
        status: count(list.length),
        tools: `<div class="segmented" role="group">${seg}</div>`,
        html: `<div class="pane">
          <h2 class="pane-title">${t("proj.title")}</h2>
          <div class="projects-grid">${list.map(p => `
            <article class="project">
              <img class="project-thumb" src="${p.image}" alt="" loading="lazy">
              <div class="project-body">
                <h3 class="project-name">${esc(L(p.name))}</h3>
                <p>${L(p.desc)}</p>
                ${p.note ? `<p class="project-note">${L(p.note)}</p>` : ""}
                <div class="tags">${p.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}</div>
                <div class="project-links">
                  ${p.web ? `<a class="btn btn-sm btn-primary" href="${p.web}" target="_blank" rel="noopener">${t("proj.linkWeb")} ${ICON.external}</a>` : ""}
                  ${p.code ? `<a class="btn btn-sm" href="${p.code}" target="_blank" rel="noopener">${t("proj.linkCode")} ${ICON.external}</a>` : ""}
                </div>
              </div>
            </article>`).join("")}
          </div>
        </div>`
      };
    },

    education: () => ({
      status: count(C.education.length + C.languages.length),
      html: `<div class="pane">
        <h2 class="pane-title">${t("edu.title")}</h2>
        <div class="list">${C.education.map(e => `
          <div class="row">
            <span class="row-icon">${glyph("education")}</span>
            <div>
              <h3 class="row-title">${esc(L(e.title))}</h3>
              <p class="row-meta">${esc(L(e.period))} · ${esc(L(e.place))}</p>
            </div>
          </div>`).join("")}
        </div>
        <h3 class="pane-sub">${t("edu.languages")}</h3>
        <div class="list lang-table">${C.languages.map(l =>
          `<div class="lang-name">${esc(L(l.name))}</div><div class="lang-level">${esc(L(l.level))}</div>`).join("")}
        </div>
      </div>`
    }),

    experience: () => ({
      status: count(C.experience.length),
      html: `<div class="pane">
        <h2 class="pane-title">${t("exp.title")}</h2>
        <div class="list">${C.experience.map(x => `
          <div class="row">
            <span class="row-icon">${glyph("experience")}</span>
            <div>
              <h3 class="row-title">${esc(L(x.role))} · ${esc(L(x.org))}</h3>
              <p class="row-meta">${esc(L(x.period))} · ${esc(L(x.type))}</p>
              <p class="row-desc">${esc(L(x.desc))}</p>
            </div>
          </div>`).join("")}
        </div>
      </div>`
    }),

    certs: () => ({
      status: count(C.certs.length + C.otherCerts.length),
      html: `<div class="pane">
        <h2 class="pane-title">${t("certs.title")}</h2>
        <div class="list">
          <div class="cert-head"><span>${t("certs.colName")}</span><span>${t("certs.colIssuer")}</span><span>${t("certs.colDate")}</span><span></span></div>
          ${C.certs.map((c, i) => `
          <div class="cert-row" role="button" tabindex="0" data-action="cert" data-key="${i}" title="${t("certs.viewCert")}">
            <span class="cert-name">${ICON.pdf}<span>${esc(L(c.name))}</span></span>
            <span class="cert-issuer">${esc(L(c.issuer))}</span>
            <span class="cert-date">${esc(L(c.date))}</span>
            ${c.more ? `<a class="cert-more" href="${c.more}" target="_blank" rel="noopener" data-stop>${t("certs.viewMore")}</a>` : "<span></span>"}
            ${c.desc ? `<p class="cert-desc">${esc(L(c.desc))}</p>` : ""}
          </div>`).join("")}
        </div>
        <h3 class="pane-sub">${t("certs.others")}</h3>
        <div class="list">${C.otherCerts.map(c => `
          <div class="cert-row cert-static">
            <span class="cert-name"><span class="row-icon" style="width:22px;height:22px;border-radius:6px">${glyph("certs")}</span><span>${esc(L(c.name))}</span></span>
            <span class="cert-issuer">${esc(L(c.issuer))}</span>
            <span class="cert-date">${esc(L(c.date))}</span>
            <span></span>
          </div>`).join("")}
        </div>
      </div>`
    }),

    tools: () => ({
      status: count(C.tools.reduce((n, g) => n + g.items.length, 0)),
      html: `<div class="pane">
        <h2 class="pane-title">${t("tools.title")}</h2>
        ${C.tools.map(g => `
          <section class="tool-group">
            <h3>${esc(L(g.group))}</h3>
            <div class="chips">${g.items.map(i => `<span class="chip">${i}</span>`).join("")}</div>
          </section>`).join("")}
      </div>`
    }),

    trash: () => ({
      status: count(0),
      html: `<div class="empty"><strong>${t("trash.empty")}</strong><span>${t("trash.joke")}</span></div>`
    })
  };

  // En el móvil, "Sobre mí" es una sola página larga que recorre todas las secciones
  const LONG_SECTIONS = ["projects", "education", "experience", "certs", "tools"];
  const aboutOnly = FOLDERS.about;
  FOLDERS.about = win => {
    const view = aboutOnly(win);
    if (!isMobile()) return view;
    const rest = LONG_SECTIONS.map(f =>
      `<section class="scroll-section" data-section="${f}">${FOLDERS[f](win).html}</section>`).join("");
    return { ...view, html: view.html + rest, status: "" };
  };

  // El título de la ventana sigue a la sección que se está viendo
  function setFinderTitle(win, folder) {
    if (win.section === folder) return;
    win.section = folder;
    $(".win-title", win.el).innerHTML = folderSVG(folder, "") + `<span>${esc(t("folder." + folder))}</span>`;
  }

  function bindSectionSpy(win) {
    const content = $(".win-content", win.el);
    if (content._spy) return;
    content._spy = true;
    content.addEventListener("scroll", () => {
      if (!isMobile() || win.folder !== "about") return;
      const sections = $$("[data-section]", content);
      const limit = content.getBoundingClientRect().top + 70;
      let current = "about";
      sections.forEach(s => {
        if (s.getBoundingClientRect().top <= limit) current = s.dataset.section;
      });
      // Al llegar al final, la última sección cuenta aunque no pueda subir hasta arriba
      if (sections.length && content.scrollTop + content.clientHeight >= content.scrollHeight - 4) {
        current = sections[sections.length - 1].dataset.section;
      }
      setFinderTitle(win, current);
    }, { passive: true });
  }

  function renderMail(win, title, tools, content) {
    win.el.setAttribute("aria-label", t("mail.title"));
    title.innerHTML = `<span>${t("mail.title")}</span>`;
    tools.innerHTML = `<button class="btn btn-sm btn-primary" type="submit" form="mailForm">${ICON.send}<span>${t("mail.send")}</span></button>`;

    // Conserva lo escrito si se cambia de idioma con la ventana abierta
    const old = $("form", content);
    const values = old ? Object.fromEntries(new FormData(old)) : null;

    content.innerHTML = `<form class="mail" id="mailForm" novalidate>
      <div class="mail-intro">
        <h2 class="pane-title">${t("mail.heading")}</h2>
        <p>${t("mail.text")}</p>
      </div>
      <div class="mail-field"><span class="lbl">${t("mail.to")}</span><span class="mail-to">Daniel Díaz Canosa &lt;${C.links.email}&gt;</span></div>
      <div class="mail-field"><label for="mfName">${t("mail.name")}</label><input id="mfName" name="name" required autocomplete="name"></div>
      <div class="mail-field"><label for="mfEmail">${t("mail.email")}</label><input id="mfEmail" name="email" type="email" required autocomplete="email"></div>
      <div class="mail-field"><label for="mfSubject">${t("mail.subject")}</label><input id="mfSubject" name="_subject" value="${esc(t("mail.subjectDefault"))}"></div>
      <textarea name="message" required placeholder="${esc(t("mail.message"))}" aria-label="${esc(t("mail.message"))}"></textarea>
      <input class="mail-honey" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true">
      <p class="mail-status" aria-live="polite">${t("mail.note")}</p>
    </form>`;

    const form = $("form", content);
    if (values) Object.entries(values).forEach(([k, v]) => { if (form.elements[k]) form.elements[k].value = v; });
    form.addEventListener("submit", e => sendMail(e, form, tools));
  }

  async function sendMail(e, form, tools) {
    e.preventDefault();
    const status = $(".mail-status", form);
    const btn = $("button[type=submit]", tools);
    if (form.elements._honey.value) return;
    if (!form.checkValidity()) { form.reportValidity(); return; }

    btn.disabled = true;
    $("span", btn).textContent = t("mail.sending");
    status.className = "mail-status";
    status.textContent = t("mail.sending");
    try {
      const data = Object.fromEntries(new FormData(form));
      delete data._honey;
      const res = await fetch(C.links.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, _template: "table" })
      });
      if (!res.ok) throw new Error(res.status);
      status.className = "mail-status ok";
      status.textContent = t("mail.sent");
      toast(t("mail.sent"));
      form.elements.name.value = "";
      form.elements.email.value = "";
      form.elements.message.value = "";
    } catch (err) {
      status.className = "mail-status err";
      status.textContent = t("mail.error");
    } finally {
      btn.disabled = false;
      $("span", btn).textContent = t("mail.send");
    }
  }

  // ─── Acciones (delegación de eventos) ─────────────────────────────────────

  function winOf(node) {
    const el = node.closest(".window");
    return el ? wins.get(el.dataset.id) : null;
  }

  windowsEl.addEventListener("click", e => {
    if (e.target.closest("[data-stop]")) return;
    const ctl = e.target.closest("[data-win]");
    if (ctl) {
      const win = winOf(ctl);
      const a = ctl.dataset.win;
      if (a === "close") closeWindow(win);
      if (a === "min") minimizeWindow(win);
      if (a === "zoom") toggleZoom(win);
      if (a === "back") goHistory(win, -1);
      if (a === "forward") goHistory(win, 1);
      return;
    }
    const act = e.target.closest("[data-action]");
    if (act) runAction(act, winOf(act));
  });

  windowsEl.addEventListener("keydown", e => {
    const row = e.target.closest(".cert-row[data-action]");
    if (row && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); runAction(row, winOf(row)); }
  });

  function runAction(node, win) {
    const a = node.dataset.action;
    if (a === "open") {
      // En móvil, desde "Sobre mí" se baja hasta la sección en lugar de abrir otra ventana
      const section = isMobile() && win && win.folder === "about" && $(`[data-section="${node.dataset.target}"]`, win.el);
      if (section) section.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
      else if (win && win.kind === "finder") navigate(win, node.dataset.target);
      else openFolder(node.dataset.target);
    }
    if (a === "filter" && win) { win.filter = node.dataset.value; renderWindow(win); }
    if (a === "lang") setLang(node.dataset.value);
    if (a === "cv") openPreview("cv");
    if (a === "mail") openMail();
    if (a === "cert") openPreview(node.dataset.key);
  }

  // ─── Escritorio ───────────────────────────────────────────────────────────

  // Iconos de app (solo se ven en móvil; en escritorio se ve la carpeta)
  const APP_TILE = {
    doc: ["#9aa3b2", "#5f6776"],
    mail: ["#5ac8fa", "#1a7cf0"],
    link: ["#a1a6b0", "#6a6f7a"]
  };

  // Cuadrado de app con degradado, brillo y borde de luz; "__" se sustituye por un id único
  let artN = 0;
  function appTile(bg, inner, defs = "") {
    const id = "ai" + (++artN);
    const fix = s => s.replace(/__/g, id);
    const stops = bg.map((c, i) => `<stop offset="${i / (bg.length - 1)}" stop-color="${c}"/>`).join("");
    return `<svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="${id}g" x1="0" y1="0" x2="0" y2="1">${stops}</linearGradient><clipPath id="${id}c"><rect width="64" height="64" rx="14.5"/></clipPath>${fix(defs)}</defs><g clip-path="url(#${id}c)"><rect width="64" height="64" fill="url(#${id}g)"/>${fix(inner)}<path d="M0 0h64v26C46 31 18 31 0 26z" fill="#fff" opacity=".13"/></g><rect x=".4" y=".4" width="63.2" height="63.2" rx="14.2" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width=".8"/></svg>`;
  }

  const GOLD = `<linearGradient id="__a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffdf6e"/><stop offset="1" stop-color="#d79614"/></linearGradient>`;
  const BROWN = `<linearGradient id="__b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a06942"/><stop offset="1" stop-color="#5b3720"/></linearGradient>`;

  // Contactos, Terminal, birrete, maletín, medalla y Ajustes
  const APP_ART = {
    about: () => appTile(["#fdfdfe", "#d2d3d9"],
      `<g fill="#c3c4cb">${[9, 17, 25, 33, 41, 49].map(y => `<rect x="57" y="${y}" width="8" height="3" rx="1.5"/>`).join("")}</g><circle cx="30" cy="23" r="9.5" fill="#8d8e96"/><path d="M12 56c1.5-12 8.5-18 18-18s16.5 6 18 18z" fill="#8d8e96"/>`),
    projects: () => appTile(["#3b3b40", "#0c0c0e"],
      `<path d="M16 21l14 11-14 11" fill="none" stroke="#32d74b" stroke-width="5.2" stroke-linecap="round" stroke-linejoin="round"/><rect x="34" y="40" width="16" height="5.2" rx="2.6" fill="#32d74b"/>`),
    education: () => appTile(["#8fe36d", "#2ca843"],
      `<path d="M16 34v11c4.5 4.5 10 6.5 16 6.5s11.5-2 16-6.5V34l-16 7z" fill="#34343b"/><path d="M32 15L6 28l26 13 26-13z" fill="#2a2a30"/><path d="M32 15L6 28l26 6z" fill="#44444c"/><path d="M32 15l26 13-26 6z" fill="#3a3a42"/><path d="M52 29.5v14" stroke="#ffd25a" stroke-width="2" stroke-linecap="round"/><rect x="49.8" y="43" width="4.4" height="7" rx="2" fill="#ffd25a"/>`),
    experience: () => appTile(["#ffc45e", "#f08700"],
      `<path d="M24 25v-4.5a4.5 4.5 0 0 1 4.5-4.5h7a4.5 4.5 0 0 1 4.5 4.5V25" fill="none" stroke="#5a3820" stroke-width="3.6"/><rect x="9" y="24" width="46" height="29" rx="5.5" fill="url(#__b)"/><path d="M9 36h46" stroke="#4a2c16" stroke-opacity=".55" stroke-width="2.6"/><rect x="27.5" y="32.5" width="9" height="8.5" rx="2.2" fill="#ffd25a" stroke="#b98311" stroke-width="1"/>`, BROWN),
    certs: () => appTile(["#fffdf6", "#ece3cd"],
      `<path d="M25 40L18 58l9-4 4.5 7 3-21z" fill="#e5484d"/><path d="M39 40l7 18-9-4-4.5 7-3-21z" fill="#c93a3f"/><circle cx="32" cy="27" r="16" fill="url(#__a)"/><circle cx="32" cy="27" r="11.5" fill="none" stroke="#fff4c4" stroke-width="1.6"/><path d="M32 20.5l2.1 4.3 4.7.7-3.4 3.3.8 4.7-4.2-2.2-4.2 2.2.8-4.7-3.4-3.3 4.7-.7z" fill="#fff4c4"/>`, GOLD),
    tools: () => appTile(["#b3b5bd", "#6a6c75"],
      `<g transform="translate(32 32)"><g fill="#f1f2f5">${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<rect x="-3.4" y="-22" width="6.8" height="10" rx="1.8" transform="rotate(${i * 45})"/>`).join("")}</g><circle r="16" fill="#f1f2f5"/><circle r="7" fill="#80828b"/></g>`)
  };

  const appIcon = name => {
    if (APP_ART[name]) return `<span class="app-icon app-art">${APP_ART[name]()}</span>`;
    const [a, b] = APP_TILE[name];
    return `<span class="app-icon" style="--g1:${a};--g2:${b}">${glyph(name)}</span>`;
  };

  function renderDesktop() {
    const icons = $("#desktopIcons");
    icons.setAttribute("aria-label", t("side.favorites"));
    icons.innerHTML = C.folders.map(f => `
      <button class="desk-icon" data-folder="${f}" type="button">
        ${folderSVG(f)}${appIcon(f)}
        <span class="desk-icon-label">${esc(t("folder." + f))}</span>
      </button>`).join("");
  }

  $("#desktopIcons").addEventListener("click", e => {
    const icon = e.target.closest(".desk-icon");
    if (!icon) return;
    $$(".desk-icon").forEach(i => i.classList.toggle("selected", i === icon));
    openFolder(icon.dataset.folder);
  });

  desktopEl.addEventListener("pointerdown", e => {
    if (e.target === desktopEl || e.target === windowsEl || e.target.id === "desktopIcons") {
      $$(".desk-icon.selected").forEach(i => i.classList.remove("selected"));
    }
  });

  $("#widgetProfile").addEventListener("click", () => openFolder("about"));
  $("#widgetCal").addEventListener("click", openMail);
  $("#homeIndicator").addEventListener("click", () => { const top = topWindow(); if (top) closeWindow(top); });

  // ─── Dock ─────────────────────────────────────────────────────────────────

  const dock = $("#dock");

  function setupDock() {
    $('[data-dock="github"]').href = C.links.github;
    $('[data-dock="linkedin"]').href = C.links.linkedin;
    $('[data-dock="mail"]').addEventListener("click", openMail);
    $('[data-dock="cv"]').addEventListener("click", () => openPreview("cv"));
    $('[data-dock="trash"]').addEventListener("click", () => openFolder("trash"));

    $("#dockMinimized").addEventListener("click", e => {
      const tile = e.target.closest("[data-restore]");
      const win = tile && wins.get(tile.dataset.restore);
      if (win) restoreWindow(win);
    });

    // Efecto lupa al pasar el ratón
    const BASE = 54, EXTRA = 26, RANGE = 150;
    dock.addEventListener("mousemove", e => {
      if (isMobile() || reducedMotion()) return;
      $$(".dock-item", dock).forEach(item => {
        const r = item.getBoundingClientRect();
        const d = Math.abs(e.clientX - (r.left + r.width / 2));
        const f = d < RANGE ? (Math.cos((d / RANGE) * Math.PI) + 1) / 2 : 0;
        item.style.setProperty("--size", (BASE + EXTRA * f).toFixed(1) + "px");
      });
    });
    dock.addEventListener("mouseleave", () => $$(".dock-item", dock).forEach(i => i.style.removeProperty("--size")));
  }

  function bounceDock(name) {
    if (!name || reducedMotion()) return;
    const item = $(`[data-dock="${name}"]`);
    if (!item) return;
    item.classList.remove("bounce");
    void item.offsetWidth;
    item.classList.add("bounce");
    setTimeout(() => item.classList.remove("bounce"), 750);
  }

  function updateDock() {
    $('[data-dock="mail"]').classList.toggle("running", wins.has("mail"));
    $('[data-dock="cv"]').classList.toggle("running", wins.has("preview-cv"));
    $('[data-dock="trash"]').classList.toggle("running", [...wins.values()].some(w => w.folder === "trash"));
  }

  function addMinTile(win) {
    const label = win.kind === "finder" ? t("folder." + win.folder) : win.kind === "mail" ? t("mail.title") : win.doc.title;
    const icon = win.kind === "finder" ? folderSVG(win.folder, "") : win.kind === "mail" ? glyph("mail") : ICON.pdf;
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = "dock-item dock-min-item";
    tile.dataset.restore = win.id;
    tile.innerHTML = `<span class="dock-icon">${icon}</span><span class="dock-label">${esc(label)}</span>`;
    $("#dockMinimized").appendChild(tile);
    return tile;
  }

  function removeMinTile(id) {
    const tile = $(`#dockMinimized [data-restore="${id}"]`);
    if (tile) tile.remove();
  }

  // ─── Barra de menú ────────────────────────────────────────────────────────

  function updateMenuApp() {
    const w = focused && !focused.minimized ? focused : null;
    $("#menuApp").textContent = !w || w.kind === "finder" ? t("app.finder") : w.kind === "mail" ? t("app.mail") : t("app.preview");
  }

  function buildMenus() {
    $("#menuMain").innerHTML = `
      <button class="menu-item" role="menuitem" data-menu-act="about">${t("menu.about")}</button>
      <div class="menu-sep"></div>
      <button class="menu-item" role="menuitem" data-menu-act="cv">${t("menu.cv")}</button>
      <button class="menu-item" role="menuitem" data-menu-act="mail">${t("menu.contact")}</button>`;

    $("#menuGo").innerHTML = C.folders.map(f =>
      `<button class="menu-item" role="menuitem" data-menu-act="folder" data-folder="${f}">${esc(t("folder." + f))}</button>`).join("") +
      `<div class="menu-sep"></div><button class="menu-item" role="menuitem" data-menu-act="folder" data-folder="trash">${t("folder.trash")}</button>`;

    $("#menuLang").innerHTML = Object.entries(LANGS).map(([code, name]) =>
      `<button class="menu-item" role="menuitemradio" aria-checked="${code === lang}" data-menu-act="lang" data-lang="${code}"><span class="check">${code === lang ? "✓" : ""}</span>${name}</button>`).join("");
    $("#langTitle").innerHTML = `${glyph("globe")}<span>${lang.toUpperCase()}</span>`;
    $("#langTitle").setAttribute("aria-label", t("menu.lang"));
  }

  function buildWindowMenu() {
    const list = [...wins.values()];
    $("#menuWindow").innerHTML = list.length
      ? list.map(w => {
          const name = w.kind === "finder" ? t("folder." + w.folder) : w.kind === "mail" ? t("mail.title") : w.doc.title;
          return `<button class="menu-item" role="menuitem" data-menu-act="win" data-id="${w.id}"><span class="check">${w === focused ? "✓" : ""}</span>${esc(name)}</button>`;
        }).join("") + `<div class="menu-sep"></div><button class="menu-item" role="menuitem" data-menu-act="closeAll">${t("menu.closeAll")}</button>`
      : `<span class="menu-item" aria-disabled="true">${t("menu.noWindows")}</span>`;
  }

  function closeMenus() {
    $$(".menu.open").forEach(m => {
      m.classList.remove("open");
      $(".menu-title", m).setAttribute("aria-expanded", "false");
    });
  }

  function openMenu(menu) {
    closeMenus();
    if (menu.dataset.menu === "window") buildWindowMenu();
    menu.classList.add("open");
    $(".menu-title", menu).setAttribute("aria-expanded", "true");
  }

  $("#menubar").addEventListener("click", e => {
    const title = e.target.closest(".menu-title");
    if (title) {
      const menu = title.closest(".menu");
      if (menu.classList.contains("open")) closeMenus(); else openMenu(menu);
      return;
    }
    const item = e.target.closest("[data-menu-act]");
    if (!item) return;
    const act = item.dataset.menuAct;
    closeMenus();
    if (act === "about") openFolder("about");
    if (act === "cv") openPreview("cv");
    if (act === "mail") openMail();
    if (act === "folder") openFolder(item.dataset.folder);
    if (act === "lang") setLang(item.dataset.lang);
    if (act === "win") { const w = wins.get(item.dataset.id); if (w) (w.minimized ? restoreWindow(w) : focusWindow(w)); }
    if (act === "closeAll") [...wins.values()].forEach(w => closeWindow(w));
  });

  // Como en macOS: con un menú abierto, pasar por encima de otro lo abre
  $("#menubar").addEventListener("mouseover", e => {
    const title = e.target.closest(".menu-title");
    if (!title || !$(".menu.open")) return;
    const menu = title.closest(".menu");
    if (!menu.classList.contains("open")) openMenu(menu);
  });

  document.addEventListener("pointerdown", e => {
    if (!e.target.closest(".menu")) closeMenus();
  });

  document.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    if ($(".menu.open")) { closeMenus(); return; }
    if (focused && !e.target.closest("input, textarea")) closeWindow(focused);
  });

  addEventListener("popstate", () => {
    if (!isMobile()) return;
    const top = topWindow();
    if (top) closeWindow(top, { fromHistory: true });
  });

  // ─── Reloj ────────────────────────────────────────────────────────────────

  function tick() {
    const now = new Date();
    const loc = LOCALES[lang];
    const date = new Intl.DateTimeFormat(loc, { weekday: "short", day: "numeric", month: "short" }).format(now).replace(/\./g, "");
    const time = new Intl.DateTimeFormat(loc, { hour: "2-digit", minute: "2-digit" }).format(now);
    const clock = $("#clock");
    clock.textContent = `${date} ${time}`;
    clock.dateTime = now.toISOString();
    $(".menubar-left").dataset.time = time;
    $("#calDay").textContent = new Intl.DateTimeFormat(loc, { weekday: "long" }).format(now);
    $("#calNum").textContent = now.getDate();
  }

  // ─── Idioma ───────────────────────────────────────────────────────────────

  function setLang(code) {
    if (!LANGS[code]) return;
    lang = code;
    try { localStorage.setItem("lang", code); } catch (e) {}
    applyLang();
  }

  function applyLang() {
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
    $$(".dock-item[data-dock]").forEach(el => el.setAttribute("aria-label", t("dock." + el.dataset.dock)));
    renderDesktop();
    buildMenus();
    wins.forEach(w => {
      if (w.kind === "preview" && w.doc.key !== "cv") w.doc = docFor(w.doc.key);
      renderWindow(w);
    });
    $$("#dockMinimized [data-restore]").forEach(tile => {
      const w = wins.get(tile.dataset.restore);
      if (w) $(".dock-label", tile).textContent = w.kind === "finder" ? t("folder." + w.folder) : w.kind === "mail" ? t("mail.title") : w.doc.title;
    });
    updateMenuApp();
    tick();
  }

  // ─── Avisos ───────────────────────────────────────────────────────────────

  let toastTimer;
  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 3200);
  }

  // ─── Arranque ─────────────────────────────────────────────────────────────

  // ─── Búsqueda estilo iPhone (móvil) ───────────────────────────────────────

  const spot = $("#spotlight");
  const spotInput = $("#spotlightInput");
  const spotResults = $("#spotlightResults");
  const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  let spotItems = [];

  function spotCatalog() {
    return [
      ...C.folders.map(f => ({ group: "sections", label: t("folder." + f), icon: f, run: () => openFolder(f) })),
      { group: "links", label: t("dock.cv"), icon: "doc", run: () => openPreview("cv") },
      { group: "links", label: t("dock.mail"), icon: "mail", run: openMail },
      { group: "links", label: "GitHub", icon: "link", href: C.links.github },
      { group: "links", label: "LinkedIn", icon: "link", href: C.links.linkedin }
    ];
  }

  function renderSpot() {
    const q = norm(spotInput.value.trim());
    spotItems = spotCatalog().filter(i => !q || norm(i.label).includes(q));
    if (!spotItems.length) {
      spotResults.innerHTML = `<p class="spot-none">${t("search.none")}</p>`;
      return;
    }
    let html = "", group = "";
    spotItems.forEach((i, idx) => {
      if (i.group !== group) { group = i.group; html += `<h3>${t("search." + group)}</h3>`; }
      const inner = `${appIcon(i.icon)}<span>${esc(i.label)}</span>`;
      html += i.href
        ? `<a class="spot-item" href="${i.href}" target="_blank" rel="noopener">${inner}</a>`
        : `<button class="spot-item" type="button" data-spot="${idx}">${inner}</button>`;
    });
    spotResults.innerHTML = html;
  }

  function openSpot() {
    spot.hidden = false;
    spotInput.value = "";
    spotInput.placeholder = t("search.placeholder");
    renderSpot();
    requestAnimationFrame(() => spotInput.focus());
  }
  function closeSpot() { spot.hidden = true; spotInput.blur(); }

  $("#searchPill").addEventListener("click", openSpot);
  $("#spotlightCancel").addEventListener("click", closeSpot);
  spotInput.addEventListener("input", renderSpot);
  spotInput.addEventListener("keydown", e => {
    if (e.key === "Escape") closeSpot();
    if (e.key === "Enter") { const first = $(".spot-item", spotResults); if (first) first.click(); }
  });
  spot.addEventListener("click", e => { if (e.target === spot) closeSpot(); });
  spotResults.addEventListener("click", e => {
    const btn = e.target.closest("[data-spot]");
    if (btn) { const item = spotItems[Number(btn.dataset.spot)]; closeSpot(); item.run(); }
    else if (e.target.closest("a")) closeSpot();
  });

  setupDock();
  applyLang();
  setInterval(tick, 15000);
  if (!isMobile()) openFolder("about");
})();
