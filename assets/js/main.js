(function () {
  "use strict";

  /* Header scroll effect */
  var header = document.getElementById("SITE_HEADER") || document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* Mobile nav — supports both nav-toggle and menu-btn */
  var toggle = document.getElementById("nav-toggle") || document.getElementById("menu-btn");
  var drawer = document.getElementById("side-drawer");
  var overlay = document.getElementById("drawer-overlay");
  var closeBtn = document.getElementById("drawer-close");

  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add("open");
    if (overlay) overlay.classList.add("open");
    if (toggle) toggle.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove("open");
    if (overlay) overlay.classList.remove("open");
    if (toggle) toggle.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (toggle) toggle.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (overlay) overlay.addEventListener("click", closeDrawer);
  if (drawer) {
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeDrawer);
    });
  }

  /* Slideshow with dots */
  document.querySelectorAll(".slideshow").forEach(function (slideshow) {
    var slides = slideshow.querySelectorAll(".slide");
    var prev = slideshow.querySelector(".slide-prev");
    var next = slideshow.querySelector(".slide-next");
    var dotsWrap = slideshow.querySelector(".slide-dots");
    var current = 0;

    if (dotsWrap && slides.length) {
      slides.forEach(function (_, i) {
        var dot = document.createElement("button");
        dot.setAttribute("aria-label", "Go to slide " + (i + 1));
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", function () { showSlide(i); });
        dotsWrap.appendChild(dot);
      });
    }

    function showSlide(n) {
      if (!slides.length) return;
      current = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle("active", i === current); });
      if (dotsWrap) {
        dotsWrap.querySelectorAll("button").forEach(function (d, i) {
          d.classList.toggle("active", i === current);
        });
      }
    }

    showSlide(0);
    if (prev) prev.addEventListener("click", function () { showSlide(current - 1); });
    if (next) next.addEventListener("click", function () { showSlide(current + 1); });

    /* Auto-advance every 6s */
    var timer = setInterval(function () { showSlide(current + 1); }, 6000);
    slideshow.addEventListener("mouseenter", function () { clearInterval(timer); });
    slideshow.addEventListener("mouseleave", function () {
      timer = setInterval(function () { showSlide(current + 1); }, 6000);
    });
  });

  /* Scroll reveal */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* Footer year */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Contact forms */
  document.querySelectorAll(".contact-form-el").forEach(function (form) {
    var statusBox = form.querySelector(".form-status");
    if (!statusBox) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var key = form.querySelector('input[name="access_key"]');
      if (key && key.value === "YOUR_WEB3FORMS_ACCESS_KEY") {
        statusBox.className = "form-status error";
        statusBox.textContent = "Form not configured yet. Please email suyogastudio@gmail.com directly.";
        return;
      }

      var btn = form.querySelector(".form-submit, button[type='submit']");
      var orig = btn ? btn.textContent : "Submit";
      if (btn) { btn.disabled = true; btn.textContent = "Sending..."; }

      fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          var ok = data.success === true || data.success === "true";
          statusBox.className = "form-status " + (ok ? "success" : "error");
          statusBox.textContent = ok
            ? "Thank you! Your message has been sent successfully."
            : (data.message || "Something went wrong. Email suyogastudio@gmail.com.");
          if (ok) form.reset();
        })
        .catch(function () {
          statusBox.className = "form-status error";
          statusBox.textContent = "Something went wrong. Email suyogastudio@gmail.com.";
        })
        .finally(function () {
          if (btn) { btn.disabled = false; btn.textContent = orig; }
        });
    });
  });
})();
