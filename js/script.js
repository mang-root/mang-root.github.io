/* ==========================================================================
   Tance Mang — Personal Blog interactions
   ========================================================================== */

(function () {
  'use strict';

  /* -------- Mobile nav toggle -------- */
  function initMobileNav() {
    var toggle = document.querySelector('.mobile-nav-toggle');
    var nav = document.querySelector('.main-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      nav.classList.toggle('is-open');
    });

    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('is-open');
      }
    });
  }

  /* -------- Filter chips (Projects & Blog) -------- */
  function initFilters() {
    var chips = document.querySelectorAll('.filter-chip');
    if (!chips.length) return;

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');

        var filter = chip.getAttribute('data-filter');

        // Projects page: each category section has data-category
        var sections = document.querySelectorAll('section[data-category]');
        if (sections.length) {
          sections.forEach(function (s) {
            var cat = s.getAttribute('data-category');
            s.style.display = (filter === 'all' || cat === filter) ? '' : 'none';
          });
          return;
        }

        // Blog page: each article has data-tag (space-separated)
        var items = document.querySelectorAll('.article-item');
        items.forEach(function (item) {
          var tagAttr = item.getAttribute('data-tag') || '';
          var tags = tagAttr.split(/\s+/);
          var show = filter === 'all' || tags.indexOf(filter) !== -1;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* -------- Reveal on scroll (lightweight) -------- */
  function initReveal() {
    if (!('IntersectionObserver' in window)) return;
    var targets = document.querySelectorAll('.section, .about-block, .widget');
    if (!targets.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    targets.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      io.observe(el);
    });
  }

  /* -------- Subtle card tilt on hover (project cards) -------- */
  function initCardTilt() {
    var cards = document.querySelectorAll('.project-card');
    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = 'translateY(-4px) rotateX(' + (-y * 4) + 'deg) rotateY(' + (x * 4) + 'deg)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  /* -------- Smooth anchor scroll -------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var hash = link.getAttribute('href');
        if (hash.length <= 1) return;
        var target = document.querySelector(hash);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  /* -------- Init -------- */
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    initMobileNav();
    initFilters();
    initReveal();
    initCardTilt();
    initSmoothScroll();
  });
})();
