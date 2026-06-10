/* App shell + tweaks wiring */
const { useState, useEffect, useRef, useCallback } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "displayFont": "Geist",
  "bodyFont": "Hanken Grotesk",
  "monoFont": "JetBrains Mono",
  "accent": "#B5532A",
  "pageBg": "ivory",
  "theme": "dark",
  "monoMode": false,
  "containerWidth": 1280,
  "density": "comfy",
  "cardStyle": "bordered",
  "animations": true,

  "navLinks": "show",

  "heroLayout": "split",
  "heroDetails": "minimal",
  "heroPhoto": true,
  "portraitShape": "rounded",
  "heroBadge": true,
  "heroPulse": "pulse",

  "showMetrics": true,
  "metricStyle": "bordered",
  "metricLabels": true,

  "showSummary": true,
  "summaryStyle": "side",
  "summaryAlign": "left",
  "summaryTags": true,

  "showGallery": true,
  "galleryStyle": "framed",
  "galleryHeading": "Business Trip <em>Snapshots</em>",

  "showFeatured": true,
  "featStyle": "cards",
  "featCols": "3",
  "featAccent": false,
  "featMetrics": true,

  "showSkills": true,
  "skillView": "grouped",
  "skillIcons": true,

  "showExp": true,
  "expStyle": "line",
  "expLogo": "card",
  "expBullets": true,
  "expTags": true,

  "showCollab": true,
  "collabPos": "early",
  "collabMap": true,
  "collabMapStyle": "arcs",
  "collabStops": true,
  "collabTimeline": true,

  "showEdu": true,
  "eduLayout": "split",
  "eduBg": "none",
  "eduHonor": true,
  "eduPlace": true,
  "showResearch": true,
  "researchCount": 3,
  "researchStyle": "list",
  "researchMeta": true,

  "showAwards": true,
  "awardDesc": true,
  "awardHighlight": true,

  "showContact": true,
  "contactStyle": "card",
  "contactHeadline": "Let's build something secure & global.",
  "contactLinks": true
}/*EDITMODE-END*/;

const FONT_STACKS = {
  "Geist": "'Geist', system-ui, sans-serif",
  "Sora": "'Sora', system-ui, sans-serif",
  "Space Grotesk": "'Space Grotesk', system-ui, sans-serif",
  "Schibsted Grotesk": "'Schibsted Grotesk', system-ui, sans-serif",
  "Manrope": "'Manrope', system-ui, sans-serif",
  "Plus Jakarta Sans": "'Plus Jakarta Sans', system-ui, sans-serif",
  "Instrument Sans": "'Instrument Sans', system-ui, sans-serif",
  "Hanken Grotesk": "'Hanken Grotesk', system-ui, sans-serif",
  "Figtree": "'Figtree', system-ui, sans-serif",
  "System": "system-ui, -apple-system, sans-serif",
};
const MONO_STACKS = {
  "JetBrains Mono": "'JetBrains Mono', ui-monospace, monospace",
  "Space Mono": "'Space Mono', ui-monospace, monospace",
  "IBM Plex Mono": "'IBM Plex Mono', ui-monospace, monospace",
};
// Page background presets (light theme). "tint" derives from the active accent.
const BG_PRESETS = {
  warm:  { paper: "#F6F2EA", paper2: "#EFE9DD", surface: "#FCFAF5", surface2: "#F1EBDF" },
  ivory: { paper: "#FBF9F3", paper2: "#F2EDE2", surface: "#FFFFFF", surface2: "#F6F1E7" },
  cool:  { paper: "#EFF0ED", paper2: "#E6E8E3", surface: "#F8F9F6", surface2: "#E9ECE6" },
};

function lum(hex) {
  const h = hex.replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h;
  const n = parseInt(x.slice(0, 6), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return (r * 299 + g * 587 + b * 114) / 1000;
}

/* ---------- NAV ---------- */
const NAV_LINKS = [
  ["About", "about"], ["Work", "work"], ["Skills", "skills"],
  ["Experience", "experience"], ["Global", "global"], ["Education", "education"], ["Awards", "awards"],
];

function Nav({ t, setTweak, onResume, onMenu }) {
  const I = window.I, d = window.DATA;
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const on = () => setStuck(window.scrollY > 12);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const toggleTheme = () => setTweak("theme", t.theme === "dark" ? "light" : "dark");
  return (
    <nav className={`nav ${stuck ? "stuck" : ""}`}>
      <div className="shell nav-in">
        <div className="nav-left">
          <span className="nav-role">Software Engineer · Native Android Engineer</span>
        </div>
        <div className="nav-right">
          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {t.theme === "dark" ? I.sun : I.moon}
          </button>
          <a className="btn btn-primary" href={`mailto:${d.email}`}>
            {I.mail}<span className="btn-resume-text">Send Email</span>
          </a>
          <button className="icon-btn nav-burger" onClick={onMenu} aria-label="Menu">{I.menu}</button>
        </div>
      </div>
    </nav>
  );
}

/* ---------- MOBILE SHEET ---------- */
function Sheet({ open, onClose, onResume }) {
  const I = window.I, d = window.DATA;
  return (
    <div className={`sheet ${open ? "open" : ""}`}>
      <div className="shell" style={{ display: "flex", flexDirection: "column", flex: 1, padding: 0 }}>
        <div className="sheet-top">
          <span className="brand"><span className="mono-mark">JL</span></span>
          <button className="icon-btn" onClick={onClose} aria-label="Close">{I.close}</button>
        </div>
        <div className="sheet-links">
          {NAV_LINKS.map(([label, id], i) => (
            <a key={id} href={`#${id}`} onClick={onClose}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>{label}
            </a>
          ))}
        </div>
        <div className="sheet-foot">
          <button className="btn btn-primary" onClick={() => { onClose(); onResume(); }}>{I.download} Download Résumé</button>
          <a className="btn btn-ghost" href={d.linkedinUrl} target="_blank" rel="noreferrer">{I.linkedin} LinkedIn</a>
        </div>
      </div>
    </div>
  );
}

/* ---------- CONTACT + FOOTER ---------- */
function Contact({ t, onResume }) {
  if (!t.showContact) return null;
  const I = window.I, d = window.DATA;
  const parts = t.contactHeadline.split(/(secure|global)/i);
  return (
    <section className="section" id="contact">
      <div className="shell">
        <div className="contact-wrap reveal">
          <div className="contact-text">
            <div className="eyebrow" style={{ marginBottom: 18 }}>Get in touch</div>
            <h2 className="contact-title">
              {parts.map((p, i) => /^(secure|global)$/i.test(p) ? <em key={i}>{p}</em> : p)}
            </h2>
            <p className="contact-sub">Available for senior &amp; staff native-Android roles, secure mobile systems, and payments engineering — remote or on-site.</p>
          </div>
          <div className="contact-actions">
            <div className="contact-cta">
              <a className="btn btn-primary" href={`mailto:${d.email}`}>{I.mail} {d.email}</a>
              <button className="btn btn-ghost" onClick={onResume}>{I.download} Download Résumé</button>
            </div>
            {t.contactLinks && (
              <div className="contact-links">
                <span>{I.pin} {d.location}</span>
                <a href={d.linkedinUrl} target="_blank" rel="noreferrer">{I.linkedin} LinkedIn</a>
              </div>
            )}
          </div>
        </div>
        <div className="footer">
          <div className="footer-in">
            <span>© {new Date().getFullYear()} Jessica P. Laureta — Built with care.</span>
            <span className="to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>{I.arrowUp} Back to top</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- TWEAKS ---------- */
function Panel({ t, setTweak }) {
  const ACCENTS = ["#B5532A", "#1A4D8F", "#1F6F54", "#3A3A3A", "#6E56CF"];
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Global" />
      <TweakSelect label="Heading font" value={t.displayFont}
        options={["Geist", "Sora", "Space Grotesk", "Schibsted Grotesk", "Manrope", "Plus Jakarta Sans", "Instrument Sans"]}
        onChange={v => setTweak("displayFont", v)} />
      <TweakSelect label="Body font" value={t.bodyFont}
        options={["Hanken Grotesk", "Schibsted Grotesk", "Figtree", "Geist", "Sora", "Manrope", "System"]}
        onChange={v => setTweak("bodyFont", v)} />
      <TweakSelect label="Mono font" value={t.monoFont}
        options={["JetBrains Mono", "Space Mono", "IBM Plex Mono"]}
        onChange={v => setTweak("monoFont", v)} />
      <TweakColor label="Accent" value={t.accent} options={ACCENTS} onChange={v => setTweak("accent", v)} />
      <TweakSelect label="Page background" value={t.pageBg}
        options={[{value:"warm",label:"Warm sand"},{value:"ivory",label:"Ivory"},{value:"cool",label:"Cool mist"},{value:"tint",label:"Accent-matched"}]}
        onChange={v => setTweak("pageBg", v)} />
      <TweakRadio label="Theme" value={t.theme} options={["light", "dark"]} onChange={v => setTweak("theme", v)} />
      <TweakSlider label="Container width" value={t.containerWidth} min={920} max={1280} step={20} unit="px" onChange={v => setTweak("containerWidth", v)} default={1280} />
      <TweakRadio label="Density" value={t.density} options={["compact", "comfy", "airy"]} onChange={v => setTweak("density", v)} />
      <TweakRadio label="Card style" value={t.cardStyle} options={["bordered", "filled", "plain"]} onChange={v => setTweak("cardStyle", v)} />

      <TweakSection label="Header" />
      <TweakRadio label="Main navigation" value={t.navLinks} options={[{value:"show",label:"Show"},{value:"hide",label:"Hide"}]} onChange={v => setTweak("navLinks", v)} />

      <TweakSection label="Hero" />
      <TweakSelect label="Layout" value={t.heroLayout}
        options={[{value:"split",label:"Split (text + photo)"},{value:"showcase",label:"Showcase (big name)"},{value:"compact",label:"Compact"},{value:"feature",label:"Feature card"}]}
        onChange={v => setTweak("heroLayout", v)} />
      <TweakSelect label="Detail style" value={t.heroDetails}
        options={[{value:"minimal",label:"Minimal row"},{value:"chips",label:"Role chips"},{value:"list",label:"Labeled list"},{value:"inline",label:"Inline meta"},{value:"cards",label:"Detail cards"}]}
        onChange={v => setTweak("heroDetails", v)} />
      <TweakRadio label="Photo shape" value={t.portraitShape} options={[{value:"arch",label:"Arch"},{value:"rounded",label:"Round"},{value:"circle",label:"Circle"}]} onChange={v => setTweak("portraitShape", v)} />
      <TweakSelect label="Status pulse" value={t.heroPulse}
        options={[{value:"pulse",label:"Pulse"},{value:"ping",label:"Radar ping"},{value:"breathe",label:"Breathe"},{value:"blink",label:"Blink"},{value:"glow",label:"Glow"},{value:"none",label:"None"}]}
        onChange={v => setTweak("heroPulse", v)} />

      <TweakSection label="Impact metrics" />
      <TweakRadio label="Style" value={t.metricStyle} options={[{value:"bordered",label:"Boxed"},{value:"plain",label:"Plain"},{value:"filled",label:"Filled"}]} onChange={v => setTweak("metricStyle", v)} />

      <TweakSection label="Summary" />
      <TweakSelect label="Layout" value={t.summaryStyle}
        options={[{value:"side",label:"Side-by-side"},{value:"stacked",label:"Stacked"},{value:"card",label:"Card panel"},{value:"statement",label:"Statement"}]}
        onChange={v => setTweak("summaryStyle", v)} />
      <TweakRadio label="Align" value={t.summaryAlign} options={["left", "center"]} onChange={v => setTweak("summaryAlign", v)} />

      <TweakSection label="Business trips" />
      <TweakSelect label="Card style" value={t.galleryStyle}
        options={[{value:"framed",label:"Framed cards"},{value:"polaroid",label:"Polaroid"},{value:"overlay",label:"Caption overlay"},{value:"editorial",label:"Editorial"},{value:"plain",label:"Plain rounded"}]}
        onChange={v => setTweak("galleryStyle", v)} />
      <TweakSlider label="Scroll time" value={t.gallerySpeed} min={24} max={90} step={2} unit="s" onChange={v => setTweak("gallerySpeed", v)} />
      <TweakSlider label="Scroll time" value={t.gallerySpeed} min={24} max={90} step={2} unit="s" onChange={v => setTweak("gallerySpeed", v)} />
      <TweakText label="Heading" value={t.galleryHeading} onChange={v => setTweak("galleryHeading", v)} />
      <TweakText label="Eyebrow" value={t.galleryEyebrow} onChange={v => setTweak("galleryEyebrow", v)} />
      <TweakText label="Eyebrow" value={t.galleryEyebrow} onChange={v => setTweak("galleryEyebrow", v)} />

      <TweakSection label="Featured work" />
      <TweakRadio label="Style" value={t.featStyle} options={[{value:"cards",label:"Cards"},{value:"outline",label:"Outline"},{value:"editorial",label:"List"}]} onChange={v => setTweak("featStyle", v)} />
      <TweakRadio label="Columns" value={t.featCols} options={["2", "3"]} onChange={v => setTweak("featCols", v)} />
      <TweakRadio label="Accent first card" value={t.featAccent ? "on" : "off"} options={[{value:"off",label:"Off"},{value:"on",label:"On"}]} onChange={v => setTweak("featAccent", v === "on")} />

      <TweakSection label="Skills" />
      <TweakRadio label="View" value={t.skillView} options={[{value:"grouped",label:"Grouped"},{value:"cloud",label:"Cloud"},{value:"bars",label:"Bars"}]} onChange={v => setTweak("skillView", v)} />

      <TweakSection label="Experience" />
      <TweakRadio label="Timeline" value={t.expStyle} options={[{value:"default",label:"Rows"},{value:"line",label:"Line"},{value:"cards",label:"Cards"}]} onChange={v => setTweak("expStyle", v)} />
      <TweakSelect label="Company logo" value={t.expLogo}
        options={[{value:"card",label:"Framed card"},{value:"plain",label:"Plain mark"},{value:"tint",label:"Tinted card"},{value:"xl",label:"Extra large"}]}
        onChange={v => setTweak("expLogo", v)} />

      <TweakSection label="Global collaboration" />
      <TweakRadio label="Position" value={t.collabPos} options={[{value:"early",label:"After summary"},{value:"late",label:"After exp."}]} onChange={v => setTweak("collabPos", v)} />
      <TweakSelect label="Map design" value={t.collabMapStyle}
        options={[{value:"arcs",label:"Time-zone arcs"},{value:"world",label:"Flat world map"},{value:"bands",label:"Time-zone bands"}]}
        onChange={v => setTweak("collabMapStyle", v)} />
      <TweakToggle label="City stops" value={t.collabStops} onChange={v => setTweak("collabStops", v)} />

      <TweakSection label="Education & research" />
      <TweakSelect label="Layout" value={t.eduLayout}
        options={[{value:"split",label:"Split"},{value:"stacked",label:"Stacked"},{value:"cards",label:"Cards"},{value:"feature",label:"Feature"}]}
        onChange={v => setTweak("eduLayout", v)} />
      <TweakSelect label="Section background" value={t.eduBg}
        options={[{value:"tint",label:"Accent wash"},{value:"surface",label:"Neutral panel"},{value:"ink",label:"Dark band"},{value:"none",label:"None"}]}
        onChange={v => setTweak("eduBg", v)} />
      <TweakSelect label="Research style" value={t.researchStyle}
        options={[{value:"list",label:"List"},{value:"numbered",label:"Numbered"},{value:"cards",label:"Cards"}]}
        onChange={v => setTweak("researchStyle", v)} />
      <TweakSlider label="Research items" value={t.researchCount} min={1} max={3} step={1} onChange={v => setTweak("researchCount", v)} />

      <TweakSection label="Contact" />
      <TweakSelect label="Layout" value={t.contactStyle}
        options={[{value:"card",label:"Centered card"},{value:"banner",label:"Wide banner"},{value:"split",label:"Split"},{value:"ink",label:"Dark panel"},{value:"minimal",label:"Minimal"}]}
        onChange={v => setTweak("contactStyle", v)} />
      <TweakText label="Headline" value={t.contactHeadline} onChange={v => setTweak("contactHeadline", v)} />
    </TweaksPanel>
  );
}

/* ---------- APP ---------- */
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [menu, setMenu] = useState(false);
  const S = window.Sections;

  // apply theme / tokens
  useEffect(() => {
    const r = document.documentElement;
    r.setAttribute("data-theme", t.theme);
    r.setAttribute("data-density", t.density);
    r.setAttribute("data-cards", t.cardStyle);
    r.setAttribute("data-portrait", t.portraitShape);
    r.setAttribute("data-metrics", t.metricStyle);
    r.setAttribute("data-feat-cols", t.featCols);
    r.setAttribute("data-feat-style", t.featStyle);
    r.setAttribute("data-summary", t.summaryStyle);
    r.setAttribute("data-gallery", t.galleryStyle);
    r.setAttribute("data-edu", t.eduLayout);
    r.setAttribute("data-exp-logo", t.expLogo);
    r.setAttribute("data-edu-bg", t.eduBg);
    r.setAttribute("data-contact", t.contactStyle);
    r.setAttribute("data-nav-links", t.navLinks);
    r.style.setProperty("--font-display", FONT_STACKS[t.displayFont] || FONT_STACKS.Geist);
    r.style.setProperty("--font-body", FONT_STACKS[t.bodyFont] || FONT_STACKS["Hanken Grotesk"]);
    r.style.setProperty("--font-mono", MONO_STACKS[t.monoFont] || MONO_STACKS["JetBrains Mono"]);
    r.style.setProperty("--container", t.containerWidth + "px");
    let accent = t.accent;
    if (t.monoMode) accent = t.theme === "dark" ? "#9b9488" : "#56524b";
    r.style.setProperty("--accent", accent);
    r.style.setProperty("--accent-ink", lum(accent) > 150 ? "#1a1714" : "#ffffff");

    // page background (light theme only — dark theme keeps its own palette)
    const bgVars = ["--paper", "--paper-2", "--surface", "--surface-2"];
    if (t.theme === "light") {
      let p;
      if (t.pageBg === "tint") {
        p = {
          paper: `color-mix(in oklab, ${accent} 7%, #F7F4EC)`,
          paper2: `color-mix(in oklab, ${accent} 12%, #F1ECE0)`,
          surface: `color-mix(in oklab, ${accent} 4%, #FFFFFF)`,
          surface2: `color-mix(in oklab, ${accent} 9%, #F4EFE4)`,
        };
      } else {
        p = BG_PRESETS[t.pageBg] || BG_PRESETS.warm;
      }
      r.style.setProperty("--paper", p.paper);
      r.style.setProperty("--paper-2", p.paper2);
      r.style.setProperty("--surface", p.surface);
      r.style.setProperty("--surface-2", p.surface2);
    } else {
      bgVars.forEach(v => r.style.removeProperty(v));
    }
  }, [t]);

  // skill icon visibility
  useEffect(() => {
    document.documentElement.setAttribute("data-skillicons", t.skillIcons ? "1" : "0");
  }, [t.skillIcons]);

  // animations on/off
  useEffect(() => {
    document.body.classList.toggle("anim-on", !!t.animations);
  }, [t.animations]);

  // reveal observer
  useEffect(() => {
    if (!t.animations) {
      document.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    const els = document.querySelectorAll(".reveal:not(.in)");
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });

  const onResume = useCallback(() => {
    const a = document.createElement("a");
    a.href = window.DATA.resume;
    a.download = "Jessica-Laureta-Resume.pdf";
    document.body.appendChild(a); a.click(); a.remove();
  }, []);

  const collab = <S.Collab t={t} />;

  return (
    <>
      <Nav t={t} setTweak={setTweak} onResume={onResume} onMenu={() => setMenu(true)} />
      <Sheet open={menu} onClose={() => setMenu(false)} onResume={onResume} />
      <main>
        <S.Hero t={t} onResume={onResume} />
        <S.Metrics t={t} />
        <S.Summary t={t} />
        {t.collabPos === "early" && t.showCollab && collab}
        <S.Featured t={t} />
        <S.Gallery t={t} />
        <S.Skills t={t} />
        <S.Experience t={t} />
        {t.collabPos === "late" && t.showCollab && collab}
        <S.EduResearch t={t} />
        <S.Awards t={t} />
        <Contact t={t} onResume={onResume} />
      </main>
      <Panel t={t} setTweak={setTweak} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
