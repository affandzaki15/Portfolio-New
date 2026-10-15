/* ---------- CONFIG: replace placeholders here ---------- */

const CONFIG = {
  email: "YOUR_EMAIL",
  github: "YOUR_GITHUB_URL",
  linkedin: "YOUR_LINKEDIN_URL",
  photo: "",
  cv: "YOUR_CV_URL",

  projects: {
    movie: {
      demo: "YOUR_MOVIE_TRACKER_DEMO_URL",
      src: "YOUR_MOVIE_TRACKER_REPO_URL",
    },

    sentiment: {
      demo: "YOUR_SENTIMENT_DEMO_URL",
      src: "YOUR_SENTIMENT_REPO_URL",
    },

    concertix: {
      demo: "YOUR_CONCERTIX_DEMO_URL",
      src: "YOUR_CONCERTIX_REPO_URL",
    },
  },
};

const $ = (s) => document.querySelector(s),
  href = (u) => (/^YOUR_/.test(u) ? "#" : u);

const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- content ---------- */

const PV = {
  movie: `<div class="p-5 h-full flex flex-col gap-3"><div class="h-7 border border-bd rounded px-3 text-[10px] text-mute flex items-center">Search shows…</div><div class="grid grid-cols-4 gap-2 flex-1">${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<div class="rounded-sm ${i % 3 == 0 ? "bg-brand" : i % 3 == 1 ? "bg-sage" : "bg-bd"}" style="opacity:${0.45 + (i % 4) * 0.15}"></div>`).join("")}</div></div>`,

  sentiment: `<div class="p-6 h-full flex flex-col justify-end gap-3 text-[10px] text-mute"><div class="flex items-end gap-6 h-3/4"><div class="flex-1 bg-sage rounded-t" style="height:72%"></div><div class="flex-1 bg-brand rounded-t" style="height:85.15%"></div></div><div class="flex gap-6"><span class="flex-1">Naive Bayes</span><span class="flex-1">SVM · 85.15%</span></div></div>`,

  concertix: `<div class="h-full grid place-items-center p-6"><div class="w-full max-w-[240px] border border-brand rounded-md flex"><div class="flex-1 p-4"><div class="h-2 w-16 bg-brand mb-2"></div><div class="h-2 w-24 bg-bd"></div></div><div class="border-l border-dashed border-brand px-4 grid place-items-center text-gold text-xs font-bold">№</div></div></div>`,
};

const P = [
  {
    k: "movie",
    t: "Movie Tracker",
    c: "Frontend Development",
    d: "A movie discovery and watchlist application that allows users to search for shows, review details, and organize titles they want to watch.",
    f: [
      "Search integration with the TVMaze API",
      "Dynamic rendering of search results",
      "Watchlist: add and remove items",
      "Responsive layout and light/dark theme",
    ],
    g: ["HTML", "Tailwind CSS", "JavaScript", "TVMaze API"],
    w: "md:grid-cols-12",
    a: "md:col-span-7",
    b: "md:col-span-5",
  },

  {
    k: "sentiment",
    t: "Indonesian Sentiment Analysis",
    c: "Machine Learning / Web Application",
    d: "A web-based sentiment analysis application for Indonesian YouTube comments, comparing Naive Bayes and Support Vector Machine models.",
    f: [
      "File upload and prediction workflow",
      "Text classification and model comparison",
      "FastAPI backend",
      "Results summary and evaluation metrics",
    ],
    g: ["Python", "FastAPI", "Scikit-learn", "TF-IDF", "SVM", "Naive Bayes"],
    n: "SVM reached 85.15% accuracy on the evaluated dataset; this is not a guarantee for all real-world data.",
    w: "md:grid-cols-12",
    a: "md:col-span-7 md:order-2",
    b: "md:col-span-5 md:order-1",
  },

  {
    k: "concertix",
    t: "Concertix",
    c: "Fullstack Web Development",
    d: "A web-based ticketing application concept designed to organize event discovery and ticket purchasing workflows.",
    f: [],
    g: ["Laravel", "PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    w: "md:grid-cols-12",
    a: "md:col-span-5",
    b: "md:col-span-6 md:col-start-7",
  },
];

$("#plist").innerHTML = P.map((p, i) => {
  const L = CONFIG.projects[p.k];
  return `<article data-cursor="view" class="proj reveal grid ${p.w} gap-8 items-center">

 <div class="${p.a}"><div class="pv aspect-[16/10] bg-bg border border-bd rounded-md overflow-hidden" aria-hidden="true">${PV[p.k]}</div></div>

 <div class="${p.b}"><p class="text-gold text-sm font-bold">0${i + 1}</p><p class="lbl mt-1">${p.c}</p><h3 class="text-2xl font-bold mt-1 tracking-tight">${p.t}</h3>

 <p class="mt-3 text-mute text-sm leading-relaxed">${p.d}</p>

 ${p.f.length ? `<ul class="mt-3 text-sm text-mute space-y-1">${p.f.map((x) => `<li class="flex gap-2"><span class="text-sage">—</span>${x}</li>`).join("")}</ul>` : ""}

 ${p.n ? `<p class="mt-3 text-xs text-mute border-l border-gold pl-3">${p.n}</p>` : ""}

 <ul class="mt-4 flex flex-wrap gap-2">${p.g.map((x) => `<li class="tag">${x}</li>`).join("")}</ul>

 <div class="mt-5 flex gap-3"><a class="btn btn-p !py-2 !text-xs" href="${href(L.demo)}" target="_blank" rel="noopener" aria-label="View ${p.t} project">View Project</a><a class="btn btn-s !py-2 !text-xs" href="${href(L.src)}" target="_blank" rel="noopener" aria-label="${p.t} source code">Source Code</a></div></div></article>`;
}).join("");

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

const tx = (t, c, y = 16, s = 9, x = 12, a = "middle") =>
  `<text x="${x}" y="${y}" font-size="${s}" font-weight="700" text-anchor="${a}" fill="${c}">${t}</text>`;

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
  <li class="border border-bd rounded-md py-4 px-1 flex flex-col items-center gap-2 text-center">
    <i class="${icon}" style="font-size: 32px" aria-hidden="true"></i>
    <span class="text-xs font-medium">${n}</span>
  </li>
`,
  ).join(
    "",
  )}</ul></div><div class="sm:col-span-2 lg:col-span-4"><h3 class="lbl border-b border-bd pb-2">Tools &amp; Workflow</h3><ul class="mt-4 flex flex-wrap gap-2">${["Git", "GitHub", "REST APIs", "Responsive Design", "Debugging", "Basic Testing"].map((x) => `<li class="tag">${x}</li>`).join("")}</ul></div>`;

$("#steps").innerHTML = [
  ["Understand", "Clarify the problem, user needs, and project constraints."],
  [
    "Structure",
    "Break the problem into manageable components and define the implementation approach.",
  ],
  ["Build", "Develop responsive interfaces and application logic."],
  ["Refine", "Test important flows, debug edge cases, and improve usability."],
]
  .map(
    ([t, d], i) =>
      `<li class="step reveal"><i></i><p class="text-gold text-sm font-bold mt-4">0${i + 1}</p><h3 class="font-semibold mt-1">${t}</h3><p class="text-sm text-mute mt-2 leading-relaxed">${d}</p></li>`,
  )
  .join("");

/* ---------- contact ---------- */

$("#mail").href = "mailto:" + CONFIG.email;
$("#gh").href = href(CONFIG.github);
$("#li").href = href(CONFIG.linkedin);

$("#mailv").textContent = CONFIG.email;
$("#ghv").textContent = CONFIG.github.replace(/^https?:\/\/(www\\.)?/, "");
$("#liv").textContent = CONFIG.linkedin.replace(/^https?:\/\/(www\\.)?/, "");

document
  .querySelectorAll("[data-cv]")
  .forEach((a) => (a.href = href(CONFIG.cv)));
$("#yr").textContent = new Date().getFullYear();

$("#copy").addEventListener("click", async () => {
  const t = $("#toast");
  try {
    await navigator.clipboard.writeText(CONFIG.email);
    t.textContent = "Email copied to clipboard.";
  } catch (e) {
    t.textContent =
      "Could not copy automatically — please copy it from the Email Me link.";
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

const secs = ["home", "about", "projects", "skills", "contact"].map((id) =>
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

/* ---------- cursor ---------- */

if (matchMedia("(hover:hover) and (pointer:fine)").matches && !reduce) {
  const cur = $("#cur"),
    tt = $("#curt");
  root.classList.add("has-cursor");

  let mx = -100,
    my = -100,
    x = -100,
    y = -100,
    st = "";

  addEventListener(
    "pointermove",
    (e) => {
      mx = e.clientX;
      my = e.clientY;
      cur.style.opacity = 1;
    },
    { passive: true },
  );

  document.addEventListener("pointerleave", () => (cur.style.opacity = 0));

  addEventListener("pointerdown", () => cur.classList.add("down"));
  addEventListener("pointerup", () => cur.classList.remove("down"));

  document.addEventListener("pointerover", (e) => {
    const el = e.target.closest("[data-cursor],a,button");
    const s = el ? el.dataset.cursor || "link" : "";
    if (s !== st) {
      st = s;
      cur.dataset.s = s;
      tt.textContent = s === "view" ? "VIEW" : s === "copy" ? "COPY" : "";
    }
  });

  (function f() {
    x += (mx - x) * 0.2;
    y += (my - y) * 0.2;
    cur.style.transform = `translate3d(${x}px,${y}px,0)`;
    requestAnimationFrame(f);
  })();
}

/* ---------- photo: set CONFIG.photo to your image path/URL ---------- */

(() => {
  const img = $("#photo");
  const box = $("#stage");

  if (CONFIG.photo) {
    img.src = CONFIG.photo;
  }

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