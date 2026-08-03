/* ============================================================
   PORTFÓLIO — João Gabriel Franco Andrade
   script.js — interações: nav, parallax, scroll reveal,
   barras de skill e lightbox da galeria
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. Nav: efeito glass ao rolar + menu mobile ---------- */
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // fecha o menu mobile ao clicar em um link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  /* ---------- 2. Parallax suave no fundo do hero ---------- */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      // move o fundo mais devagar que o scroll = sensação de profundidade
      heroBg.style.transform = `translateY(${y * 0.25}px)`;
    }, { passive: true });
  }

  /* ---------- 3. Scroll reveal (fade-in ao aparecer na tela) ---------- */
  const revealTargets = document.querySelectorAll('.reveal, .timeline-item');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => revealObserver.observe(el));

  /* ---------- 4. Barras de skill: animam até o nível quando visíveis ---------- */
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const level = target.dataset.level || '0';
        target.style.width = level + '%';
        skillObserver.unobserve(target);
      }
    });
  }, { threshold: 0.4 });

  skillBars.forEach(bar => skillObserver.observe(bar));

  /* ---------- 5. Galeria: detecta orientação de cada foto e encaixa
     no formato de célula ideal (retrato = alta, paisagem = larga,
     quase quadrada = padrão) para preencher o grid sem buracos ---------- */
  function classifyGalleryImages() {
    document.querySelectorAll('.gallery-item').forEach(item => {
      const img = item.querySelector('img');
      if (!img) return;

      const applyOrientation = () => {
        if (!img.naturalWidth || !img.naturalHeight) return;
        const ratio = img.naturalWidth / img.naturalHeight;

        item.classList.remove('wide', 'tall');
        if (ratio >= 1.25) {
          item.classList.add('wide');   // foto horizontal: ocupa 2 colunas
        } else if (ratio <= 0.8) {
          item.classList.add('tall');   // foto vertical: ocupa 2 linhas
        }
        // ratio entre 0.8 e 1.25 fica no tamanho padrão (quase quadrada)
      };

      if (img.complete && img.naturalWidth) {
        applyOrientation();
      } else {
        img.addEventListener('load', applyOrientation);
      }
    });
  }
  classifyGalleryImages();

  /* ---------- 6. Lightbox da galeria ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox.querySelector('img');
  const lightboxClose = lightbox.querySelector('.lightbox-close');
  const galleryImages = document.querySelectorAll('.gallery-item img');

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  galleryImages.forEach(img => {
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

});
