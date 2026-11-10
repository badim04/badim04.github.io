(() => {
  const role = document.body.dataset.role || "general";
  const R = window.ROLES[role] || window.ROLES.general;
  const byId = Object.fromEntries(window.PROJECTS.map(p => [p.id, p]));
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pageFor = key => (key === "general" ? "./" : `./${key}`);
  const resumeHref = `resumes/${R.resume}`;

  // ---------- theme toggle (remembered per browser)
  const themeBtn = $("#theme");
  const setTheme = t => { document.documentElement.dataset.theme = t; try { localStorage.setItem("theme", t); } catch (e) {} };
  try { const t = localStorage.getItem("theme"); if (t) document.documentElement.dataset.theme = t; } catch (e) {}
  themeBtn.addEventListener("click", () => {
    const cur = document.documentElement.dataset.theme || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    setTheme(cur === "light" ? "dark" : "light");
  });

  // ---------- nav
  // role pages stand alone: the other roles' tabs and links appear only on the home page
  const standalone = role !== "general";
  if (standalone) {
    $("#roles").remove();
    $("#footer-roles").remove();
    $(".brand").setAttribute("href", "#");
    $(".top .wrap").style.justifyContent = "space-between";
  } else {
    $("#roles").innerHTML = Object.entries(window.ROLES).map(([k, r]) =>
      `<a href="${pageFor(k)}" ${k === role ? 'aria-current="page"' : ""}>${esc(r.nav)}</a>`).join("");
  }
  const cur = standalone ? null : $("#roles [aria-current]");
  const bar = standalone ? null : $("#roles");
  if (cur) {
    const off = cur.getBoundingClientRect().left - bar.getBoundingClientRect().left;
    if (off + cur.offsetWidth > bar.clientWidth - 24) bar.scrollLeft += off - 16;
  }

  // ---------- hero
  $("#eyebrow").textContent = role === "general" ? "Portfolio · Nigeria · Open to remote" : `Portfolio · ${R.title}`;
  $("#title").innerHTML = `<span class="who">Abdulakeem Adebayo</span>${esc(R.title)}`;
  $("#lead").textContent = R.lead;
  $("#pitch").innerHTML = R.pitch.map(p => `<li>${esc(p)}</li>`).join("");
  document.querySelectorAll("[data-resume]").forEach(a => { a.href = resumeHref; a.setAttribute("download", ""); });

  // the "engine" diagram: how the pieces of my work connect
  const ENGINES = {
    general: [["Data", "collect"], ["Models", "predict"], ["AI agents", "decide"], ["APIs", "serve"], ["Apps", "web · mobile"], ["People", "use it"]],
    "data-science": [["Raw data", "scrape · ingest"], ["Features", "no leakage"], ["Models", "XGBoost · LSTM"], ["Validation", "backtest"], ["Retrain", "weekly"], ["Insight", "explained"]],
    "data-analyst": [["Sources", "SQL · Excel"], ["Clean", "EDA"], ["Analyse", "funnels · A/B"], ["Dashboards", "Power BI"], ["Story", "plain words"], ["Decision", "acted on"]],
    "data-engineer": [["Sources", "APIs · web"], ["Extract", "polite · cached"], ["Transform", "Python"], ["Store", "Postgres · SQLite"], ["Schedule", "Actions · cron"], ["Serve", "apps · models"]],
    "ai-automation": [["Trigger", "email · chat"], ["LLM", "Claude · Gemini"], ["Tools", "real data"], ["Check", "confidence"], ["Human", "approves"], ["Done", "automatically"]],
    "ai-engineer": [["Input", "text · data"], ["LLM", "extract · reason"], ["Tools", "function calls"], ["Guardrails", "untrusted input"], ["Eval", "measured"], ["Product", "shipped"]],
    "ai-trainer": [["Domain", "code · finance"], ["Task", "adversarial"], ["Model", "frontier LLM"], ["Answer", "verifiable"], ["Rubric", "graded"], ["Better AI", "trained"]],
    video: [["Brief", "message"], ["Script", "hook · CTA"], ["Design", "motion"], ["Render", "FFmpeg"], ["Cuts", "16:9 · 1:1"], ["Post", "captions"]],
    "virtual-assistant": [["Inbox", "requests"], ["Organise", "calendar · docs"], ["Research", "summaries"], ["Reports", "Excel"], ["Automate", "AI tools"], ["Delivered", "on time"]],
    "qa-automation": [["Requirements", "what should happen"], ["Test plan", "SIT · UAT"], ["Robot browser", "Playwright"], ["Evidence", "screenshots"], ["Report", "Excel · JSON"], ["Fixed", "re-tested"]],
    "qa-tester": [["Read spec", "requirements"], ["Test cases", "steps · data"], ["Execute", "manual · UAT"], ["Log bugs", "with evidence"], ["Re-test", "regression"], ["Sign-off", "confidence"]],
    "executive-assistant": [["Request", "inbox · calls"], ["Prioritise", "calendar"], ["Prepare", "docs · decks"], ["Coordinate", "people"], ["Report", "Excel"], ["Done", "on time"]],
    "it-support": [["Report", "user issue"], ["Diagnose", "steps · logs"], ["Fix", "or escalate"], ["Verify", "working"], ["Document", "how-to"], ["Prevent", "repeat"]],
    "senior-it-support": [["Incident", "detected"], ["Triage", "impact"], ["Root cause", "found"], ["Fix", "safe change"], ["Automate", "scripts"], ["Runbook", "documented"]],
    mobile: [["Design", "tokens"], ["Screens", "React Native"], ["Storage", "offline-first"], ["Sync", "Supabase"], ["Build", "EAS"], ["Store", "Play · App"]],
    frontend: [["Design", "tokens"], ["Components", "React"], ["State", "data"], ["Motion", "Framer"], ["Access", "a11y"], ["Users", "delighted"]],
    backend: [["Client", "request"], ["API", "REST · WS"], ["Rules", "validated"], ["Database", "RLS · SQL"], ["Jobs", "cron · queues"], ["Response", "correct"]],
    fullstack: [["Idea", "requirements"], ["Database", "schema · RLS"], ["API", "REST · WS"], ["UI", "web · mobile"], ["Tests", "automated"], ["Ship", "Vercel · VPS"]]
  };
  const nodes = ENGINES[role] || ENGINES.general;
  const pos = [[20, 30], [160, 30], [300, 30], [300, 190], [160, 190], [20, 190]];
  const W = 120, H = 56;
  const centers = pos.map(([x, y]) => [x + W / 2, y + H / 2]);
  let wires = "", pulses = "";
  for (let i = 0; i < 5; i++) {
    const [x1, y1] = centers[i], [x2, y2] = centers[i + 1];
    let d;
    if (i === 2) d = `M${x1 + W / 2} ${y1} C ${x1 + W / 2 + 40} ${y1}, ${x2 + W / 2 + 40} ${y2}, ${x2 + W / 2} ${y2}`;
    else if (i < 2) d = `M${x1 + W / 2} ${y1} L${x2 - W / 2} ${y2}`;
    else d = `M${x1 - W / 2} ${y1} L${x2 + W / 2} ${y2}`;
    wires += `<path id="w${i}" class="wire" d="${d}"/>`;
    const cls = ["", "t", "v"][i % 3];
    if (!reduceMotion) pulses += `<circle r="4" class="pulse ${cls}" visibility="hidden"><set attributeName="visibility" to="visible" begin="${i * 0.44}s"/><animateMotion dur="2.2s" begin="${i * 0.44}s" repeatCount="indefinite"><mpath href="#w${i}"/></animateMotion></circle>`;
  }
  const boxes = nodes.map(([t, s], i) => {
    const [x, y] = pos[i];
    return `<g class="node"><rect x="${x}" y="${y}" width="${W}" height="${H}" rx="12"/><text x="${x + 14}" y="${y + 25}">${esc(t)}</text><text class="sub" x="${x + 14}" y="${y + 42}">${esc(s.toUpperCase())}</text></g>`;
  }).join("");
  $("#engine").innerHTML = `<div class="cap"><span class="mono">How my work fits together</span><span class="mono" style="color:var(--good)">● live</span></div>
    <svg viewBox="0 0 460 270" role="img" aria-label="${esc(nodes.map(n => n[0]).join(" to "))}">${wires}${boxes}${pulses}</svg>`;

  // ---------- projects
  const list = R.projects.map(id => byId[id]).filter(Boolean);
  $("#project-count").textContent = `${list.length} projects`;
  $("#projects").innerHTML = list.map((p, i) => `
    <button class="card reveal ${i < 2 ? "feature" : ""}" data-open="${p.id}" aria-haspopup="dialog">
      <span class="mono">${esc(p.kind)}</span>
      <h3>${esc(p.name)}</h3>
      ${p.poster ? `<img class="card-poster" src="${esc(p.poster)}" alt="" loading="lazy">` : ""}
      <p class="tagline">${esc(p.tagline)}</p>
      <div class="mini-flow" aria-hidden="true">${p.flow.slice(0, i < 2 ? 6 : 4).map(f => `<span>${esc(f[0])}</span>`).join("<i></i>")}</div>
      <div class="stats">${p.stats.map(([v, l]) => `<div><b>${esc(v)}</b><span>${esc(l)}</span></div>`).join("")}</div>
      <div class="chips">${p.stack.slice(0, 6).map(s => `<span class="chip">${esc(s)}</span>`).join("")}</div>
      <span class="more">See how it works <span aria-hidden="true">→</span></span>
    </button>`).join("");

  // ---------- case study dialog with step-by-step walkthrough
  const dlg = $("#case");
  let timer = null, step = 0, current = null;

  function renderStep() {
    const f = current.flow;
    dlg.querySelectorAll(".track button").forEach((b, i) => {
      b.classList.toggle("on", i === step);
      b.classList.toggle("done", i < step);
      b.setAttribute("aria-current", i === step ? "step" : "false");
    });
    $(".step-detail .n", dlg).textContent = String(step + 1).padStart(2, "0");
    $(".step-detail h4", dlg).textContent = f[step][0];
    $(".step-detail p", dlg).textContent = f[step][1];
    $(".progress i", dlg).style.width = `${((step + 1) / f.length) * 100}%`;
  }
  function stop() { clearInterval(timer); timer = null; const b = $(".play", dlg); if (b) b.textContent = "▶ Play"; }
  function play() {
    stop();
    $(".play", dlg).textContent = "❚❚ Pause";
    timer = setInterval(() => { step = (step + 1) % current.flow.length; renderStep(); }, 3200);
  }

  // "Key code": a short excerpt of the real source, with a plain-English caption
  const isComment = l => /^\s*(\/\/|#|--|\/\*|\*)/.test(l);
  function codeBlock(id) {
    const c = (window.CODE || {})[id];
    if (!c) return "";
    const lines = c.src.split("\n").map(l => `<span class="ln${isComment(l) ? " cm" : ""}">${esc(l) || " "}</span>`).join("");
    return `
      <h3><span class="mono">05</span> Key code, in plain English</h3>
      <p class="code-cap">${esc(c.caption)}</p>
      <figure class="code">
        <figcaption><span class="mono">${esc(c.file)}</span><span class="mono">excerpt from the real source</span></figcaption>
        <pre tabindex="0"><code>${lines}</code></pre>
      </figure>`;
  }

  function open(id, push = true) {
    const p = byId[id];
    if (!p) return;
    current = p; step = 0;
    dlg.innerHTML = `
      <div class="case-head">
        <div><span class="mono">${esc(p.kind)}</span><h2 id="case-title">${esc(p.name)}</h2></div>
        <button class="icon-btn" data-close aria-label="Close">✕</button>
      </div>
      <div class="case-body">
        <p class="problem"><strong>The problem.</strong> ${esc(p.problem)}</p>
        ${p.video ? `<video class="case-video" controls playsinline preload="metadata" poster="${esc(p.poster || "")}" src="${esc(p.video)}"></video>` : ""}
        <h3><span class="mono">01</span> How it works, step by step</h3>
        <div class="stepper">
          <div class="track" role="list">${p.flow.map((f, i) => `<button role="listitem" data-step="${i}"><span class="dot">${i + 1}</span><span class="lbl">${esc(f[0])}</span></button>`).join("")}</div>
          <div class="step-detail" aria-live="polite"><span class="n"></span><div><h4></h4><p></p></div><button class="btn play">▶ Play</button></div>
          <div class="progress"><i></i></div>
        </div>
        <h3><span class="mono">02</span> The clever bits</h3>
        <ul class="genius">${p.genius.map(g => `<li>${esc(g)}</li>`).join("")}</ul>
        <div class="case-cols">
          <div><h3><span class="mono">03</span> Under the hood</h3><div class="chips">${p.stack.map(s => `<span class="chip">${esc(s)}</span>`).join("")}</div></div>
          <div><h3><span class="mono">04</span> By the numbers</h3><div class="big-stats">${p.stats.map(([v, l]) => `<div><b>${esc(v)}</b><span>${esc(l)}</span></div>`).join("")}</div></div>
        </div>
        ${codeBlock(p.id)}
        ${(() => {
          const ls = [...p.links, ...(p.repo && p.repoPublic ? [["Source on GitHub", p.repo]] : [])];
          return ls.length ? `<div class="links">${ls.map(([l, u]) => `<a class="btn" href="${esc(u)}" target="_blank" rel="noopener">${esc(l)} ↗</a>`).join("")}</div>` : "";
        })()}
      </div>`;
    dlg.setAttribute("aria-labelledby", "case-title");
    dlg.showModal();
    renderStep();
    if (!reduceMotion) play();
    if (push) history.replaceState(null, "", `#${id}`);
  }
  function close() { stop(); dlg.querySelector("video")?.pause(); if (dlg.open) dlg.close(); history.replaceState(null, "", location.pathname); }

  document.addEventListener("click", e => {
    const o = e.target.closest("[data-open]");
    if (o) return open(o.dataset.open);
    if (e.target.closest("[data-close]")) return close();
    const s = e.target.closest("[data-step]");
    if (s) { stop(); step = +s.dataset.step; renderStep(); return; }
    if (e.target.closest(".play")) return timer ? stop() : play();
    if (e.target === dlg) close(); // click on backdrop
  });
  dlg.addEventListener("close", () => { stop(); dlg.querySelector("video")?.pause(); if (location.hash) history.replaceState(null, "", location.pathname); });
  if (location.hash && byId[location.hash.slice(1)]) open(location.hash.slice(1), false);

  // ---------- skills
  $("#skills").innerHTML = R.skills.map(s => `<span>${esc(s)}</span>`).join("");

  // ---------- footer role links
  if (!standalone) $("#footer-roles").innerHTML = Object.entries(window.ROLES).map(([k, r]) => `<a href="${pageFor(k)}">${esc(r.nav)}</a>`).join("");

  // ---------- reveal on scroll
  if (!reduceMotion && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach(el => io.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
  }
})();
