const $ = (selector) => document.querySelector(selector);
const pad = (n) => String(n).padStart(2, "0");
const specs = (rows) =>
  Object.entries(rows)
    .map(
      ([key, value]) => `<div><span>${key}</span><span>${value}</span></div>`,
    )
    .join("");
const head = (title, count = "") =>
  `<h2 class="head label"><b>${title}</b><i class="diamond"></i><i class="rule"></i>${count ? `<i class="diamond"></i><span>${count}</span>` : ""}</h2>`;
const frame = (media, ratio, index) => {
  const content =
    media.type === "video"
      ? `<video src="${media.src}" muted loop playsinline preload="metadata"></video>`
      : `<img src="${media.src}" alt="${media.caption || ""}" loading="lazy">`;
  return index == null
    ? `<div class="frame" style="--ar:${ratio}">${content}</div>`
    : `<button class="frame" data-i="${index}" style="--ar:${ratio}">${content}</button>`;
};

const id = new URLSearchParams(location.search).get("p");
const index = DATA.projects.findIndex((project) => project.id === id);

function layout(content, project) {
  const brand = project
    ? `<a href="./">← ${DATA.name}</a>`
    : `<span>${DATA.name}</span>`;
  const prefix = project ? "./" : "";
  return `<main class="plate"><div class="engraved"><div class="panel">
    <nav class="nav label">${brand}<div><a href="${prefix}#work">Work</a><a href="${prefix}#about">About</a><a href="${DATA.cv}">CV</a><a href="${prefix}#contact">Contact</a></div></nav>
    ${content}
    <footer class="label"><span>${project ? DATA.name : "2026"}</span><i class="diamond"></i>${project ? "<span>2026</span>" : ""}</footer>
  </div></div></main>`;
}

function home() {
  const cards = DATA.projects
    .map(
      (project) => `<a class="card" href="?p=${project.id}">
    ${frame({ src: project.thumbnail, caption: project.title }, "4/3")}
    <i class="rule"></i><div class="body"><div class="row"><b>${project.title}</b><span class="label">${project.tech[0]}</span></div><p>${project.short}</p></div>
  </a>`,
    )
    .join("");
  const education = DATA.education
    .map(
      (item) =>
        `<div><span>${item.years}</span><span>${item.what}</span></div>`,
    )
    .join("");
  const links = [
    ["Email", DATA.email, `mailto:${DATA.email}`],
    ["GitHub", DATA.github.replace("https://", ""), DATA.github],
    ["LinkedIn", DATA.linkedin.replace("https://", ""), DATA.linkedin],
  ];
  return `<div class="plaque banner"><div class="frame" style="--ar:16/7.5"><video src="assets/maelstrom.mp4" poster="assets/maelstrom-poster.jpg" autoplay muted loop playsinline></video></div></div>
    <section class="about" id="about"><div class="plaque"><div class="frame empty" style="--ar:3/4"><span class="label">portrait</span></div></div><div class="col"><span class="label">About</span><div class="rows label">${education}<a href="${DATA.cv}"><span>Full CV</span><span>PDF ↓</span></a></div></div></section>
    ${head("Contact")}<div class="contact label" id="contact">${links.map(([key, value, href]) => `<a href="${href}"><span>${key}</span><b>${value}</b></a>`).join("")}</div>
    ${head("My work")}<div class="grid2" id="work">${cards}</div>`;
}

function project(item, i) {
  const next = DATA.projects[(i + 1) % DATA.projects.length];
  const videos = item.media.filter((media) => media.type === "video");
  const images = item.media.filter((media) => media.type === "image");
  const media = [...videos, ...images];
  const tiles = (items, offset) =>
    items
      .map(
        (media, n) =>
          `<div class="tile">${frame(media, "16/10", n + offset)}${media.caption ? `<div class="cap label"><b>${media.caption}</b></div>` : ""}</div>`,
      )
      .join("");
  const section = (title, items, offset) =>
    items.length
      ? `<section>${head(title)}<div class="grid2">${tiles(items, offset)}</div></section>`
      : "";
  document.title = `${item.title} | ${DATA.name}`;
  $("#app").innerHTML = layout(
    `<section class="title"><div class="col"><div class="eyebrow label">${item.category}</div><h1>${item.title}</h1><p>${item.short}</p></div><div class="specs label">${specs({ Stack: item.tech.join(" · "), Team: item.collaborators.length ? `${item.collaborators.length + 1} people` : "Solo" })}</div></section>
    <div class="plaque">${frame({ src: item.thumbnail, caption: item.title }, "16/7.5")}</div>
    <div class="repo"><div class="label"><span>Source</span><span>${item.repo.replace("https://", "")}</span></div><a class="label" href="${item.repo}" target="_blank" rel="noopener">Go to the repo ↗</a></div>
    <section class="overview"><div class="col" ${item.overview.length ? "" : "hidden"}><span class="label">Overview</span><div class="col">${item.overview.map((text) => `<p>${text}</p>`).join("")}</div></div><div class="numbered label"><span>Technique</span><i class="rule"></i>${item.features.map((feature, n) => `<div><span>${pad(n + 1)}</span><span>${feature}</span></div>`).join("")}</div></section>
    ${section("Videos", videos, 0)}${section("Images", images, videos.length)}
    ${item.collaborators.length ? `${head("Built with")}<div class="contact label">${item.collaborators.map((person) => `<a href="${person.url}" target="_blank" rel="noopener"><span>Collaborator</span><b>${person.name}</b></a>`).join("")}</div>` : ""}
    ${item.references.length ? `${head("References")}<div class="rows label">${item.references.map((ref) => `<a href="${ref.url}" target="_blank" rel="noopener"><span>${ref.type}</span><span>${ref.title}</span></a>`).join("")}</div>` : ""}
    <div class="next"><a href="./" class="label"><span>Back</span><b>All work</b></a><a href="?p=${next.id}" class="label"><span>Next project</span><b>${next.title} →</b></a></div>`,
    true,
  );
  gallery(media);
}

function gallery(media) {
  const dialog = $("#lightbox");
  let current = 0;
  const show = (n) => {
    current = (n + media.length) % media.length;
    const item = media[current];
    $("#lightbox-media").innerHTML =
      item.type === "video"
        ? `<video src="${item.src}" controls autoplay loop></video>`
        : `<img src="${item.src}" alt="${item.caption || ""}">`;
    dialog.querySelector("figcaption").textContent = item.caption || "";
  };
  document.addEventListener("click", (event) => {
    const tile = event.target.closest("[data-i]");
    const move = event.target.closest("[data-move]");
    if (tile) {
      show(+tile.dataset.i);
      dialog.showModal();
    }
    if (move) show(current + +move.dataset.move);
  });
  $("#close").onclick = () => dialog.close();
  dialog.onclick = (event) => {
    if (event.target === dialog) dialog.close();
  };
  dialog.onclose = () => {
    $("#lightbox-media").innerHTML = "";
  };
}

if (matchMedia("(hover:hover)").matches) {
  const video = (event) => {
    const tile = event.target.closest(".tile");
    return (
      tile && !tile.contains(event.relatedTarget) && tile.querySelector("video")
    );
  };
  document.onpointerover = (event) =>
    video(event)
      ?.play()
      .catch(() => {});
  document.onpointerout = (event) => {
    const item = video(event);
    if (item) {
      item.pause();
      item.currentTime = 0;
    }
  };
}

if (id && index < 0) location.replace("./");
else if (id) project(DATA.projects[index], index);
else $("#app").innerHTML = layout(home(), false);
