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

  const openSheet = () => {
    sheet.classList.add("open");
    document.body.classList.add("sheet-open");
  };
  const closeSheet = () => {
    sheet.classList.remove("open");
    document.body.classList.remove("sheet-open");
  };

  if (burgerBtn && sheet) {
    burgerBtn.addEventListener("click", openSheet);
  }
  if (sheetClose && sheet) {
    sheetClose.addEventListener("click", closeSheet);
  }
  sheetLinks.forEach(link => {
    link.addEventListener("click", closeSheet);
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
  // Gallery arrows
  const track = document.querySelector('.gallery-track');
  const btnLeft = document.querySelector('.gal-arrow[aria-label="Scroll left"]');
  const btnRight = document.querySelector('.gal-arrow[aria-label="Scroll right"]');

  if (track && btnLeft && btnRight) {
    const getScrollAmount = () => {
      const card = track.firstElementChild;
      if (!card) return 300;
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      // Scroll by exactly one card width + gap so cards perfectly align
      return card.offsetWidth + gap;
    };
    
    btnLeft.addEventListener('click', () => {
      track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });

    btnRight.addEventListener('click', () => {
      track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });
  }

});
