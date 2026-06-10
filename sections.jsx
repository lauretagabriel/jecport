/* Section components — read window.DATA + window.I */
const { useEffect, useRef } = React;

function SecHead({ num, title, sub, children }) {
  return (
    <div className="sec-head reveal">
      <div>
        <h2 className="sec-title" dangerouslySetInnerHTML={{ __html: title }} />
        {sub && <p className="sec-sub">{sub}</p>}
        {children}
      </div>
    </div>);

}

/* ---------- HERO ---------- */
function Hero({ t, onResume }) {
  const d = window.DATA,I = window.I;
  const details = t.heroDetails || "minimal";
  const showBadge = true;
  const roleChips = details === "chips";
  return (
    <section className={`section first hero hero--${t.heroLayout}`} id="top" data-details={details}>
      <div className="shell">
        <div className="hero-grid">
          <div className="hero-head">
            {t.heroBadge &&
            <div className="hero-avail reveal" style={{ backgroundColor: "rgb(19, 18, 16)", borderWidth: "0px", borderRadius: "0px" }}><span className="dot" data-pulse={t.heroPulse || "pulse"} /> Open to work</div>
            }
            <h1 className="hero-name reveal" style={{ "--d": "60ms" }}>
              {d.name.first}{" "}<span className="ln2"><em>{d.name.last}</em></span>
            </h1>
            {roleChips ?
            <div className="hero-role reveal" style={{ "--d": "140ms" }}>
                {d.roleChips.map((c, i) => <span className="rk" key={i}>{c}</span>)}
              </div> :

            <div className="hero-roletext reveal" style={{ "--d": "140ms" }}>{d.role}</div>
            }
            <p className="hero-lead reveal" style={{ "--d": "200ms" }}>
              {d.tagline} <b>{d.taglineAccent}</b>
            </p>
            {details === "list" &&
            <div className="hero-contact reveal" style={{ "--d": "260ms" }}>
                <div className="hc-item"><span className="hc-k">Location</span><span className="hc-v">{d.location}</span></div>
                <div className="hc-item"><span className="hc-k">LinkedIn</span><a className="hc-v" href={d.linkedinUrl} target="_blank" rel="noreferrer">jessica-laureta</a></div>
              </div>
            }
            {details === "cards" &&
            <div className="hero-cards reveal" style={{ "--d": "260ms" }}>
                <div className="hcard"><span className="hc-ico">{I.pin}</span><div><span className="hc-k">Based in</span><span className="hc-v">{d.location}</span></div></div>
                <a className="hcard" href={d.linkedinUrl} target="_blank" rel="noreferrer"><span className="hc-ico">{I.linkedin}</span><div><span className="hc-k">LinkedIn</span><span className="hc-v">jessica-laureta</span></div></a>
              </div>
            }
            {details === "inline" &&
            <div className="hero-inline reveal" style={{ "--d": "260ms" }}>
                <span>{d.location}</span>
                <a href={d.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn</a>
              </div>
            }
            {(details === "minimal" || details === "chips") &&
            <div className="hero-loc reveal" style={{ "--d": "260ms" }}>
                <span className="it">{I.pin}{d.location}</span>
              </div>
            }
            <div className="hero-cta reveal" style={{ "--d": "320ms" }}>
              <a className="btn btn-primary" href={`mailto:${d.email}`}>{I.mail} Send Email</a>
              <a className="btn btn-ghost" href={d.linkedinUrl} target="_blank" rel="noreferrer">{I.linkedin} LinkedIn</a>
            </div>
          </div>

          {t.heroPhoto &&
          <div className="hero-portrait-wrap reveal" style={{ "--d": "120ms" }}>
              <div className="hero-portrait">
                <img src="assets/jessica-laureta.jpg" alt="Jessica Laureta" />

              </div>
            </div>
          }
        </div>
      </div>
    </section>);

}

/* ---------- METRICS ---------- */
function Metrics({ t }) {
  if (!t.showMetrics) return null;
  const d = window.DATA;
  return (
    <section className="section metrics" style={{ paddingTop: 0 }}>
      <div className="shell">
        <div className="metrics-grid reveal">
          {d.metrics.map((m, i) =>
          <div className="metric" key={i} style={{ "--d": `${i * 70}ms` }}>
              <div className="m-num">{m.num}<span className="u">{m.unit}</span></div>
              {t.metricLabels && <div className="m-lbl">{m.label}</div>}
            </div>
          )}
        </div>
      </div>
    </section>);

}

/* ---------- SUMMARY ---------- */
function Summary({ t }) {
  if (!t.showSummary) return null;
  const d = window.DATA;
  const center = t.summaryAlign === "center";
  return (
    <section className="section" id="about">
      <div className="shell">
        <SecHead num="01" title="Professional <em>Summary</em>" />
        <div className="summary-grid" data-align={center ? "center" : "left"}>
          <div className="summary-lead-col reveal">
            <span className="summary-kicker">Profile</span>
            <p className="lead-quote">
              {d.summaryLead.split("Samsung Wallet")[0]}
              <span className="hl">Samsung Wallet</span>
              {d.summaryLead.split("Samsung Wallet")[1]}
            </p>
            <div className="summary-meta">
              <span className="sm-stat"><b>3+</b> yrs</span>
              <span className="sm-sep" />
              <span className="sm-stat"><b>4</b> countries</span>
              <span className="sm-sep" />
              <span className="sm-stat"><b>M+</b> users</span>
            </div>
          </div>
          <div className="summary-main reveal" style={{ "--d": "80ms" }}>
            <div className="summary-body">
              {d.summary.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            {t.summaryTags &&
            <div className="summary-tags">
                {d.summaryTags.map((tg, i) => <span className="tag" key={i}><b>#</b>{tg}</span>)}
              </div>
            }
          </div>
        </div>
      </div>
    </section>);

}

/* ---------- GALLERY (auto-scroll business-trips photos) ---------- */
function Gallery({ t }) {
  if (!t.showGallery) return null;
  const d = window.DATA,I = window.I;
  const trackRef = useRef(null);
  const scrollByCard = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(".trip-card");
    const step = (card ? card.getBoundingClientRect().width + 18 : 340) * dir;
    const start = el.scrollLeft;
    const max = el.scrollWidth - el.clientWidth;
    const target = Math.max(0, Math.min(max, start + step));
    const dist = target - start;
    if (!dist) return;
    const dur = 420,t0 = performance.now();
    const ease = (p) => 1 - Math.pow(1 - p, 3);
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      el.scrollLeft = start + dist * ease(p);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  return (
    <section className="section gallery-sec" data-gallery={t.galleryStyle || "framed"}
    aria-label="Business trip snapshots gallery">
      <div className="shell gallery-head reveal">
        <div className="gallery-head-row">
          <div>
            <h2 className="gallery-title" dangerouslySetInnerHTML={{ __html: t.galleryHeading || "Business Trip <em>Snapshots</em>" }} />
            <p className="gallery-sub">On-site collaboration across South Korea, the U.S., and beyond.</p>
          </div>
          <div className="gallery-nav">
            <button className="gal-arrow" onClick={() => scrollByCard(-1)} aria-label="Scroll left">{I.chevLeft}</button>
            <button className="gal-arrow" onClick={() => scrollByCard(1)} aria-label="Scroll right">{I.chevRight}</button>
          </div>
        </div>
      </div>
      <div className="shell">
        <div className="gallery-track" ref={trackRef}>
          {d.trips.map((item, i) =>
          <figure className="trip-card" key={i}>
              <div className="trip-img">
                <img src={item.img} alt={item.place} loading="lazy" />
              </div>
              <figcaption className="trip-cap">
                <span className="trip-place">{item.place}</span>
                <span className="trip-note">{item.note}</span>
              </figcaption>
            </figure>
          )}
        </div>
      </div>
    </section>);

}

/* ---------- FEATURED WORK ---------- */
function Featured({ t }) {
  if (!t.showFeatured) return null;
  const d = window.DATA,I = window.I;
  return (
    <section className="section" id="work">
      <div className="shell">
        <SecHead num="02" title="Featured <em>Work</em>" sub="Production features shipped to a global user base — secure identity, payments, and cost-saving architecture." />
        <div className="feature-grid">
          {d.featured.map((f, i) =>
          <article className={`feat reveal ${t.featAccent && f.accent ? "accent" : ""} ${f.span ? "span-2" : ""}`} key={i} style={{ "--d": `${i * 90}ms` }}>
              <div className="feat-kicker"><span className="feat-ico">{I[f.icon]}</span>{f.kicker}</div>
              <h3 className="feat-title">{f.title}</h3>
              <p className="feat-desc">{f.desc}</p>
              {t.featMetrics &&
            <div className="feat-metric"><b>{f.metric.big}</b>{f.metric.small}</div>
            }
              <div className="feat-chips">
                {f.chips.map((c, j) => <span className="feat-chip" key={j}>{c}</span>)}
              </div>
              {f.links && f.links.length > 0 &&
            <div className="feat-links">
                  {f.links.map((l, j) =>
              <a className="feat-link" key={j} href={l.url} target="_blank" rel="noreferrer">
                      {l.label}{I.ext}
                    </a>
              )}
                </div>
            }
            </article>
          )}
        </div>
      </div>
    </section>);

}

/* ---------- SKILLS ---------- */
function Skills({ t }) {
  if (!t.showSkills) return null;
  const d = window.DATA,I = window.I;
  // pseudo-levels for the "bars" view
  const lvl = (group, idx) => [92, 86, 80, 74, 70][idx % 5];
  return (
    <section className="section" id="skills" data-skill-view={t.skillView}>
      <div className="shell">
        <SecHead num="03" title="Technical <em>Skills</em>" sub="A native-Android core, extended across full-stack web, data systems, and emerging device technologies." />
        <div className="skills-grid">
          {d.skills.map((g, i) =>
          <div className="skill-group reveal" key={i} style={{ "--d": `${i * 60}ms` }}>
              <h4><span className="gi">{I[g.icon]}</span>{g.group}</h4>
              <div className="skill-chips">
                {g.items.map((s, j) =>
              <span className="skill-chip" key={j}>
                    {s}
                    {t.skillView === "bars" && <span className="bar"><i style={{ "--w": `${lvl(i, j)}%` }} /></span>}
                  </span>
              )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

/* ---------- EXPERIENCE ---------- */
function Experience({ t }) {
  if (!t.showExp) return null;
  const d = window.DATA,I = window.I;
  return (
    <section className="section" id="experience" data-exp={t.expStyle}>
      <div className="shell">
        <SecHead num="04" title="Work <em>Experience</em>" />
        <div className="exp-list">
          {d.experience.map((e, i) =>
          <article className="exp reveal" key={i} style={{ "--d": `${i * 80}ms` }}>
              <div className="exp-when">
                <div className="yr">{e.start} — {e.end}</div>
                <div className="loc">{I.pin}{e.loc}</div>
              </div>
              <div className="exp-co-wrap">
                <div className="exp-co">
                  <div className={`exp-logo ${e.logo ? "has-img" : ""}`}>
                    {e.logo ? <img src={e.logo} alt={e.org} /> : e.mark}
                  </div>
                  <div>
                    <div className="exp-role">{e.role}</div>
                    <div className="exp-org">{e.org}</div>
                  </div>
                </div>
                {t.expBullets &&
              <ul className="exp-bullets">
                    {e.bullets.map((b, j) => <li key={j} dangerouslySetInnerHTML={{ __html: b }} />)}
                  </ul>
              }
                {t.expTags &&
              <div className="exp-tags">
                    {e.tags.map((tg, j) => <span className="feat-chip" key={j}>{tg}</span>)}
                  </div>
              }
              </div>
            </article>
          )}
        </div>
      </div>
    </section>);

}

/* ---------- WORLD MAP DATA (equirectangular, 60×30 @ 6°) ---------- */
// Land cells per row: list of inclusive [colStart, colEnd] segments.
// col c → lon −180 + (c+0.5)·6 ; row r → lat 90 − (r+0.5)·6.
const WORLD_LAND = {
  2: [[12, 20], [23, 26], [41, 58]], 3: [[4, 20], [24, 27], [29, 58]], 4: [[5, 21], [24, 26], [29, 58]],
  5: [[6, 21], [29, 58]], 6: [[7, 22], [29, 58]], 7: [[8, 22], [29, 58]], 8: [[9, 21], [28, 58]],
  9: [[11, 19], [28, 53]], 10: [[12, 17], [27, 50]], 11: [[13, 16], [27, 37], [42, 44], [46, 51]],
  12: [[15, 17], [26, 38], [42, 44], [46, 51]], 13: [[19, 23], [26, 37], [46, 51]],
  14: [[19, 24], [28, 36], [46, 52]], 15: [[19, 25], [30, 37], [46, 53]], 16: [[20, 25], [31, 38], [47, 54]],
  17: [[20, 26], [32, 39], [50, 55]], 18: [[21, 26], [33, 40], [49, 56]], 19: [[22, 26], [33, 37], [49, 56]],
  20: [[22, 25], [33, 36], [50, 55]], 21: [[22, 24], [52, 54], [58, 58]], 22: [[22, 24]], 23: [[22, 23]]
};
const MAP_PINS = [
{ name: "United States", lon: -98, lat: 39 },
{ name: "India", lon: 80, lat: 22 },
{ name: "South Korea", lon: 128.3, lat: 36.5, side: "left" },
{ name: "Philippines", lon: 121, lat: 13, home: true }];

const mapX = (lon) => (lon + 180) / 360 * 1000;
const mapY = (lat) => (90 - lat) / 180 * 500;

function WorldMap() {
  const cell = 1000 / 60;
  // Build all land dots, flag those near a highlighted pin.
  const pinG = MAP_PINS.map((p) => ({ ...p, gc: (p.lon + 180) / 6, gr: (90 - p.lat) / 6 }));
  const dots = [];
  for (const r in WORLD_LAND) {
    for (const [c0, c1] of WORLD_LAND[r]) {
      for (let c = c0; c <= c1; c++) {
        const hit = pinG.some((p) => Math.hypot(c - p.gc, Number(r) - p.gr) < 1.5);
        dots.push({ x: (c + 0.5) * cell, y: (Number(r) + 0.5) * cell, hot: hit });
      }
    }
  }
  const home = pinG.find((p) => p.home);
  const arc = (ax, ay, bx, by) => {
    const mx = (ax + bx) / 2,my = (ay + by) / 2;
    const lift = Math.min(70, Math.hypot(bx - ax, by - ay) * 0.22 + 18);
    return `M ${ax} ${ay} Q ${mx} ${my - lift} ${bx} ${by}`;
  };
  return (
    <svg className="worldmap" viewBox="40 70 920 320" role="img" aria-label="World map highlighting Philippines, United States, South Korea and India">
      {/* connection arcs from home base (Manila) */}
      {pinG.filter((p) => !p.home).map((p, i) =>
      <path key={"a" + i} className="wm-arc" d={arc(mapX(home.lon), mapY(home.lat), mapX(p.lon), mapY(p.lat))} />
      )}
      {/* land dots */}
      {dots.map((dt, i) =>
      <circle key={i} cx={dt.x} cy={dt.y} r={dt.hot ? 4.4 : 2.7}
      className={dt.hot ? "wm-dot hot" : "wm-dot"} />
      )}
      {/* highlighted country pins + labels */}
      {pinG.map((p, i) => {
        const x = mapX(p.lon),y = mapY(p.lat);
        const left = p.side === "left";
        return (
          <g key={"p" + i} className={p.home ? "wm-pin home" : "wm-pin"}>
            <circle className="wm-ping" cx={x} cy={y} r="9" style={{ animationDelay: i * 0.45 + "s" }} />
            <circle className="wm-core" cx={x} cy={y} r={p.home ? 6 : 5} />
            <text className="wm-label" x={left ? x - 13 : x + 13} y={y + 1}
            textAnchor={left ? "end" : "start"}>{p.name}</text>
          </g>);

      })}
    </svg>);

}

/* ---------- GLOBAL COLLABORATION ---------- */
function Collab({ t }) {
  if (!t.showCollab) return null;
  const d = window.DATA;
  const mapStyle = t.collabMapStyle || "world";
  const partner = (d.offices || []).find((o) => /partner/i.test(o.kind)) || null;
  // node positions (x along an abstract west->east timezone axis) — "arcs" view
  const nodes = [
  { x: 150, label: "USA", utc: "UTC−5" },
  { x: 470, label: "India", utc: "UTC+5:30" },
  { x: 700, label: "Manila", utc: "UTC+8", home: true },
  { x: 850, label: "Gumi", utc: "UTC+9" }];

  const home = nodes.find((n) => n.home);
  const baseY = 150;
  const arc = (a, b) => {
    const mx = (a + b) / 2;
    const lift = Math.min(90, Math.abs(b - a) * 0.34 + 30);
    return `M ${a} ${baseY} Q ${mx} ${baseY - lift} ${b} ${baseY}`;
  };
  const bands = [
  { label: "United States", utc: "UTC−5", x: 120 },
  { label: "India", utc: "UTC+5:30", x: 430 },
  { label: "Philippines", utc: "UTC+8", x: 660, home: true },
  { label: "South Korea", utc: "UTC+9", x: 840 }];

  return (
    <section className="section collab" id="global">
      <div className="shell">
        <div className="collab-wrap">
          <div className="collab-head reveal">
            <h2 className="collab-title">Shipping across <em>four time zones</em> — including on-site at Samsung in Korea & the U.S.</h2>
            <p className="collab-sub">Steered cross-functional technical collaboration with engineers, product managers, and architects across the United States, South Korea, India, and the Philippines — executing on-site debugging and rapid feature iteration during high-priority international business trips.</p>
          </div>

          {t.collabMap && mapStyle === "world" &&
          <div className="collab-map worldmap-wrap reveal" style={{ "--d": "80ms" }}>
              <WorldMap />
            </div>
          }

          {t.collabMap && mapStyle === "arcs" &&
          <div className="collab-map reveal" style={{ "--d": "80ms" }}>
              <svg viewBox="0 0 1000 216" role="img" aria-label="Collaboration across time zones">
                <line x1="40" y1={baseY} x2="960" y2={baseY} stroke="color-mix(in oklab, var(--ink) 16%, transparent)" strokeWidth="1" strokeDasharray="3 6" />
                {nodes.filter((n) => !n.home).map((n, i) =>
              <path key={i} d={arc(home.x, n.x)} fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeOpacity=".8" />
              )}
                {nodes.map((n, i) =>
              <g key={i}>
                    <circle cx={n.x} cy={baseY} r={n.home ? 9 : 6} fill={n.home ? "var(--accent)" : "var(--ink)"} />
                    {n.home && <circle cx={n.x} cy={baseY} r="15" fill="none" stroke="var(--accent)" strokeWidth="1.4" strokeOpacity=".6" />}
                    <text x={n.x} y={baseY + 34} textAnchor="middle" fill="var(--ink)" fontFamily="var(--font-display)" fontSize="19">{n.label}</text>
                    <text x={n.x} y={baseY + 54} textAnchor="middle" fill="color-mix(in oklab, var(--ink) 55%, transparent)" fontFamily="var(--font-mono)" fontSize="12" letterSpacing="1">{n.utc}</text>
                  </g>
              )}
              </svg>
            </div>
          }

          {t.collabMap && mapStyle === "bands" &&
          <div className="collab-map collab-bands reveal" style={{ "--d": "80ms" }}>
              {bands.map((b, i) =>
            <div className={`tz-band ${b.home ? "home" : ""}`} key={i}>
                  <div className="tz-utc">{b.utc}</div>
                  <div className="tz-place">{b.label}</div>
                </div>
            )}
            </div>
          }

          {t.collabStops &&
          <div className="collab-stops">
              {d.collabStops.map((s, i) =>
            <div className={`stop reveal ${s.home ? "home" : ""}`} key={i} style={{ "--d": `${i * 70}ms` }}>
                  <div className="flag">{s.flag}</div>
                  <div className="city">{s.city}</div>
                  <div className="ctry">{s.ctry}</div>
                  <div className="note">{s.note}</div>
                </div>
            )}
            </div>
          }

          {partner &&
          <a className="partner-card reveal" href={partner.url} target="_blank" rel="noreferrer">
              <div className="partner-meta">
                <div className="partner-label"><span className="partner-ico">{window.I.building}</span>{partner.kind}</div>
                <div className="partner-org">{partner.org}</div>
                <div className="partner-site">{partner.site}</div>
              </div>
              <div className="partner-detail">
                <div className="partner-addr">{partner.addr}</div>
                <div className="partner-link">Visit {partner.urlLabel}{window.I.ext}</div>
              </div>
            </a>
          }

          {t.collabTimeline &&
          <div className="collab-timeline reveal">
              {d.collabTimeline.map((tl, i) =>
            <div className="tl-item" key={i} style={{ "--d": `${i * 60}ms` }}>
                  <div className="tl-dot" />
                  <div className="tl-date">{tl.date}</div>
                  <div className="tl-txt">{tl.txt}</div>
                </div>
            )}
            </div>
          }
        </div>
      </div>
    </section>);

}

/* ---------- EDUCATION + RESEARCH ---------- */
function EduResearch({ t }) {
  const d = window.DATA,I = window.I;
  if (!t.showEdu && !t.showResearch) return null;
  return (
    <section className="section" id="education">
      <div className="shell">
        <SecHead title="Education, Research & <em>Publications</em>" sub="The academic foundation and peer-reviewed work behind the engineering." />
        <div className="split-2 edu-split">
          {t.showEdu &&
          <div className="edu-col">
              <div className="col-label">Education</div>
              <div className="edu-item reveal">
                {d.education.logo &&
              <div className="edu-seal"><img src={d.education.logo} alt={d.education.school} /></div>
              }
                <div className="edu-text">
                  <div className="edu-school">{d.education.school}</div>
                  <div className="edu-deg">{d.education.degree}</div>
                  <div className="edu-meta">
                    {t.eduHonor && <span className="edu-honor">{I.cap}{d.education.honor}</span>}
                    <span>{d.education.date}</span>
                    {t.eduPlace && <span>{d.education.place}</span>}
                  </div>
                </div>
              </div>
            </div>
          }
          {t.showResearch &&
          <div className="edu-col">
              <div className="col-label">Research &amp; Publication</div>
              <div className="pub-list" data-research={t.researchStyle || "list"}>
                {d.publications.slice(0, t.researchCount).map((p, i) =>
              <div className="pub reveal" key={i} style={{ "--d": `${i * 70}ms` }}>
                    <div className="pub-no">{String(i + 1).padStart(2, "0")}</div>
                    <div className="pub-main">
                      <div className="pub-type">{p.type}</div>
                      <div className="pub-title">{p.title}</div>
                      {t.researchMeta && <div className="pub-meta">{p.meta}</div>}
                      {p.link &&
                  <a className="pub-link" href={p.link} target="_blank" rel="noreferrer">{p.linkLabel || "View publication"}{I.ext}</a>
                  }
                    </div>
                  </div>
              )}
              </div>
            </div>
          }
        </div>
      </div>
    </section>);

}

/* ---------- AWARDS ---------- */
function Awards({ t }) {
  if (!t.showAwards) return null;
  const d = window.DATA,I = window.I;
  return (
    <section className="section" id="awards">
      <div className="shell">
        <SecHead num="07" title="Awards & <em>Recognition</em>" />
        <div className="split-2 awards-grid">
          <div className="awards-col">
            {d.awards.map((a, i) =>
            <div className="award reveal" key={i} style={{ "--d": `${i * 80}ms` }}>
                <div className="award-medal">{i === 0 ? I.trophy : I.star}</div>
                <div>
                  <div className="award-title">{a.title}</div>
                  <div className="award-org">{a.org}</div>
                  {t.awardDesc && <div className="award-desc">{a.desc}</div>}
                  {t.awardDesc && a.highlights &&
                <ul className="award-highlights">
                      {a.highlights.map((h, j) => <li key={j}>{h}</li>)}
                    </ul>
                }
                </div>
              </div>
            )}
          </div>
          {t.awardHighlight &&
          <div className="card award-impact reveal" style={{ "--d": "120ms" }}>
              <div className="feat-kicker">{I.dollar} Signature Impact</div>
              <div className="feat-metric" style={{ marginTop: 14 }}><b style={{ fontSize: 44 }}>$200K+</b>saved annually by replacing a third-party vendor SDK</div>
              <p style={{ color: "var(--ink-2)", fontSize: 15, marginTop: 14, marginBottom: 0 }}>A single custom-architected solution that removed external licensing costs entirely — the work that earned Team Member of the Month.</p>
            </div>
          }
        </div>
      </div>
    </section>);

}

window.Sections = { SecHead, Hero, Metrics, Summary, Gallery, Featured, Skills, Experience, Collab, EduResearch, Awards };