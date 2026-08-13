(function () {
  'use strict';

  /* ---------- Preloader ---------- */
  var preloader = document.getElementById('preloader');
  window.addEventListener('load', function () {
    setTimeout(function () {
      preloader.classList.add('hidden');
    }, 400);
  });

  /* ---------- Header scroll state ---------- */
  var header = document.getElementById('siteHeader');

  function onScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  var headerLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));

  function closeNav() {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', function () {
    var open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  headerLinks.forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  /* ---------- Active nav link on scroll ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('section[id], main > section[id]'));

  function setActive() {
    var pos = window.scrollY + 140;
    var currentId = 'beranda';
    sections.forEach(function (sec) {
      if (sec.offsetTop <= pos) currentId = sec.id;
    });
    headerLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
  }
  window.addEventListener('scroll', setActive, { passive: true });
  setActive();

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- Hero parallax ---------- */
  var heroBg = document.querySelector('.hero-bg');
  var ctaBg = document.querySelector('.cta-bg');
  var parallaxTicking = false;

  function parallax() {
    var y = window.scrollY;
    if (heroBg && y < window.innerHeight) {
      heroBg.style.transform = 'translateY(' + y * 0.35 + 'px)';
    }
    if (ctaBg && y > ctaBg.closest('.cta-banner').offsetTop - window.innerHeight) {
      var cy = y - (ctaBg.closest('.cta-banner').offsetTop - window.innerHeight);
      ctaBg.style.transform = 'translateY(' + cy * 0.2 + 'px)';
    }
    parallaxTicking = false;
  }

  window.addEventListener('scroll', function () {
    if (!parallaxTicking) {
      window.requestAnimationFrame(parallax);
      parallaxTicking = true;
    }
  }, { passive: true });

  /* ---------- Stats counter ---------- */
  var statEls = Array.prototype.slice.call(document.querySelectorAll('.stat-num'));
  if ('IntersectionObserver' in window) {
    var statObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        statObserver.unobserve(el);
        var target = parseInt(el.getAttribute('data-count'), 10);
        var duration = 1800;
        var start = null;
        function step(ts) {
          if (!start) start = ts;
          var progress = Math.min((ts - start) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target).toLocaleString('id-ID');
          if (progress < 1) window.requestAnimationFrame(step);
        }
        window.requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    statEls.forEach(function (el) { statObserver.observe(el); });
  }

  /* ---------- Gallery filter ---------- */
  var filterBtns = Array.prototype.slice.call(document.querySelectorAll('.filter-btn'));
  var galleryItems = Array.prototype.slice.call(document.querySelectorAll('.gallery-item'));

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');
      galleryItems.forEach(function (item) {
        var show = filter === 'all' || item.getAttribute('data-cat') === filter;
        item.style.display = show ? '' : 'none';
      });
    });
  });

  /* ---------- Lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var lightboxClose = document.getElementById('lightboxClose');
  var lightboxPrev = document.getElementById('lightboxPrev');
  var lightboxNext = document.getElementById('lightboxNext');
  var lightboxIndex = 0;

  function visibleItems() {
    return galleryItems.filter(function (item) {
      return item.style.display !== 'none';
    });
  }

  function openLightbox(item, index) {
    lightboxIndex = index;
    var img = item.querySelector('img');
    var caption = item.getAttribute('data-caption') || '';
    lightboxImg.src = img.getAttribute('src');
    lightboxImg.alt = img.getAttribute('alt') || '';
    lightboxCaption.textContent = caption;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    var items = visibleItems();
    if (!items.length) return;
    lightboxIndex = (lightboxIndex + dir + items.length) % items.length;
    openLightbox(items[lightboxIndex], lightboxIndex);
  }

  galleryItems.forEach(function (item, i) {
    item.addEventListener('click', function () { openLightbox(item, i); });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', function () { navigate(-1); });
  lightboxNext.addEventListener('click', function () { navigate(1); });

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
