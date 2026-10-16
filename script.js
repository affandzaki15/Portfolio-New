const $ = (s) => document.querySelector(s);

const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- projects: hover parallax on the preview ---------- */

document.querySelectorAll(".proj").forEach((c) =>
  c.addEventListener(
    "pointermove",
    (e) => {
      const r = c.getBoundingClientRect();
      c.style.setProperty(
        "--mx",
        ((e.clientX - r.left) / r.width - 0.5).toFixed(2),
      );
      c.style.setProperty(
        "--my",
        ((e.clientY - r.top) / r.height - 0.5).toFixed(2),
      );
    },
    { passive: true },
  ),
);

/* ---------- skills ---------- */

const T = [
  ["HTML", "devicon-html5-plain colored"],
  ["CSS", "devicon-css3-plain colored"],
  ["JavaScript", "devicon-javascript-plain colored"],
  ["TypeScript", "devicon-typescript-plain colored"],
  ["React.js", "devicon-react-original colored"],
  ["Tailwind CSS", "devicon-tailwindcss-original colored"],
  ["Node.js", "devicon-nodejs-plain colored"],
  ["Express.js", "devicon-express-original"],
  ["PostgreSQL", "devicon-postgresql-plain colored"],
  ["PHP", "devicon-php-plain colored"],
  ["MySQL", "devicon-mysql-original colored"],
  ["Bootstrap", "devicon-bootstrap-plain colored"],
];


$("#slist").innerHTML =
  `<div class="sm:col-span-2 lg:col-span-4"><h3 class="lbl border-b border-bd pb-2">Core Stack</h3><ul class="mt-5 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">${T.map(
    ([n, icon]) => `
  <li class="border border-bd rounded-sm py-4 px-1 flex flex-col items-center gap-2 text-center">
    <i class="${icon}" style="font-size: 32px" aria-hidden="true"></i>
    <span class="text-xs font-medium">${n}</span>
  </li>
`,
  ).join(
    "",
  )}</ul></div><div class="sm:col-span-2 lg:col-span-4"><h3 class="lbl border-b border-bd pb-2">Tools &amp; Workflow</h3><ul class="mt-4 flex flex-wrap gap-2">${["Git", "GitHub", "REST APIs", "Responsive Design", "Debugging", "Basic Testing"].map((x) => `<li class="tag">${x}</li>`).join("")}</ul></div>`;

/* ---------- footer year + copy email ---------- */

$("#yr").textContent = new Date().getFullYear();

$("#copy").addEventListener("click", async () => {
  const t = $("#toast");
  try {
    await navigator.clipboard.writeText($("#copy").dataset.copy);
    t.textContent = "Email copied to clipboard.";
  } catch (e) {
    t.textContent =
      "Could not copy automatically — please copy it from the email link.";
  }
  setTimeout(() => (t.textContent = ""), 3000);
});

/* ---------- theme ---------- */

const root = document.documentElement,
  tb = $("#theme");

const syncT = () =>
  tb.setAttribute("aria-pressed", root.dataset.theme === "dark");
syncT();

tb.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  try {
    localStorage.setItem("theme", root.dataset.theme);
  } catch (e) {}
  syncT();
  dispatchEvent(new Event("themechange"));
});

/* ---------- nav ---------- */

const hdr = $("#hdr"),
  dr = $("#drawer"),
  mb = $("#menu");

const onS = () => {
  hdr.style.background = scrollY > 8 ? "var(--bg)" : "transparent";
  hdr.style.borderColor = scrollY > 8 ? "var(--bd)" : "transparent";
};
addEventListener("scroll", onS, { passive: true });
onS();

const tog = (o) => {
  dr.classList.toggle("hidden", !o);
  dr.classList.toggle("flex", o);
  mb.setAttribute("aria-expanded", o);
};

mb.addEventListener("click", () =>
  tog(mb.getAttribute("aria-expanded") !== "true"),
);

dr.addEventListener("click", (e) => {
  if (e.target.closest("a")) tog(false);
});
addEventListener("keydown", (e) => {
  if (e.key === "Escape") tog(false);
});

const secs = ["home", "about", "education", "skills", "experience", "projects", "contact"].map((id) =>
  document.getElementById(id),
);

const navIO = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting)
        document
          .querySelectorAll("[data-nav]")
          .forEach((a) =>
            a.setAttribute("aria-current", a.dataset.nav === e.target.id),
          );
    }),
  { rootMargin: "-40% 0px -55% 0px" },
);
secs.forEach((s) => navIO.observe(s));

const rIO = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        rIO.unobserve(e.target);
      }
    }),
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((el) => rIO.observe(el));

/* ---------- photo: change the image path in index.html (#photo) ---------- */

(() => {
  const img = $("#photo");
  const box = $("#stage");

  img.addEventListener("error", () => {
    console.error("Foto tidak ditemukan:", img.src);
  });

  if (!reduce && matchMedia("(hover:hover)").matches && box) {
    box.addEventListener("pointermove", (e) => {
      const r = box.getBoundingClientRect();

      box.style.setProperty(
        "--rx",
        ((e.clientX - r.left) / r.width - 0.5).toFixed(2)
      );

      box.style.setProperty(
        "--ry",
        ((e.clientY - r.top) / r.height - 0.5).toFixed(2)
      );
    });

    box.addEventListener("pointerleave", () => {
      box.style.setProperty("--rx", 0);
      box.style.setProperty("--ry", 0);
    });
  }
})();
