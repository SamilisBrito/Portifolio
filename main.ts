const NAV_TOGGLE_ID = 'navToggle';
const NAV_MENU_SELECTOR = '.nav__menu';
const NAV_LINKS_SELECTOR = '.nav__menu a';

function initMobileMenu(): void {
  const toggle = document.getElementById(NAV_TOGGLE_ID);
  const menu = document.querySelector(NAV_MENU_SELECTOR);

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('is-open');
    toggle.classList.toggle('is-active');
    toggle.setAttribute(
      'aria-label',
      menu.classList.contains('is-open') ? 'Fechar menu' : 'Abrir menu'
    );
  });

  const links = document.querySelectorAll(NAV_LINKS_SELECTOR);
  links.forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      toggle.classList.remove('is-active');
    });
  });
}

function initSmoothScroll(): void {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#' || !href) return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function initHeaderScroll(): void {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener(
    'scroll',
    () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 100) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
      lastScroll = currentScroll;
    },
    { passive: true }
  );
}

function init(): void {
  initMobileMenu();
  initSmoothScroll();
  initHeaderScroll();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
