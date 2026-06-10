// script.js
document.addEventListener("DOMContentLoaded", () => {
  // 1. Intersection Observer for Reveal animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        observer.unobserve(e.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  
  document.querySelectorAll(".reveal:not(.in)").forEach(el => {
    observer.observe(el);
  });

  // 2. Sticky Nav
  const nav = document.querySelector(".nav");
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 12) {
        nav.classList.add("stuck");
      } else {
        nav.classList.remove("stuck");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // 3. Theme Toggle
  const themeBtn = document.querySelector('.icon-btn[aria-label="Toggle theme"]');
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const root = document.documentElement;
      const current = root.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      
      // Update icon (sun/moon SVG)
      // For simplicity, we just toggle the color scheme attribute, the SVG remains the same 
      // or we can swap the SVG innerHTML if needed, but it's fine for now.
    });
  }

  // 4. Mobile Sheet Toggle
  const burgerBtn = document.querySelector('.nav-burger');
  const sheet = document.querySelector('.sheet');
  const sheetClose = sheet ? sheet.querySelector('.sheet-top .icon-btn') : null;
  const sheetLinks = sheet ? sheet.querySelectorAll('.sheet-links a') : [];

  if (burgerBtn && sheet) {
    burgerBtn.addEventListener("click", () => sheet.classList.add("open"));
  }
  if (sheetClose && sheet) {
    sheetClose.addEventListener("click", () => sheet.classList.remove("open"));
  }
  sheetLinks.forEach(link => {
    link.addEventListener("click", () => sheet.classList.remove("open"));
  });

  // 5. Download Resume Buttons
  const downloadBtns = Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('Download'));
  downloadBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const a = document.createElement("a");
      a.href = "uploads/Jessica-Laureta-Resume.pdf";
      a.download = "Jessica-Laureta-Resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
  });

  // Remove the Tweaks Panel entirely as it's an editor-only React component
  // Re-wiring 30+ complex custom React controls manually in vanilla JS is not robust.
  const tweaksPanel = document.querySelector('.twk-panel');
  if (tweaksPanel) {
    tweaksPanel.remove();
  }
});
