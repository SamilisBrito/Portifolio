"use strict";
const NAV_TOGGLE_ID = 'navToggle';
const NAV_DRAWER_ID = 'navDrawer';
const NAV_OVERLAY_ID = 'navOverlay';
const NAV_LINKS_SELECTOR = '.nav__drawer-menu a, .nav__menu a';
const MOBILE_BREAKPOINT = 768;

function initMobileMenu() {
    const toggle = document.getElementById(NAV_TOGGLE_ID);
    const drawer = document.getElementById(NAV_DRAWER_ID);
    const overlay = document.getElementById(NAV_OVERLAY_ID);
    if (!toggle || !drawer)
        return;

    function isMobile() {
        return window.innerWidth < MOBILE_BREAKPOINT;
    }

    function closeMenu() {
        drawer.classList.remove('is-open');
        toggle.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menu');
        document.body.style.overflow = '';
        drawer.setAttribute('aria-hidden', 'true');
        if (typeof drawer.inert !== 'undefined') {
            drawer.inert = true;
        }
        if (overlay) {
            overlay.classList.remove('is-visible');
            overlay.setAttribute('aria-hidden', 'true');
        }
    }

    function openMenu() {
        drawer.classList.add('is-open');
        toggle.classList.add('is-active');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Fechar menu');
        document.body.style.overflow = 'hidden';
        drawer.setAttribute('aria-hidden', 'false');
        if (typeof drawer.inert !== 'undefined') {
            drawer.inert = false;
        }
        if (overlay) {
            overlay.classList.add('is-visible');
        }
    }

    function toggleMenu() {
        const isOpen = drawer.classList.contains('is-open');
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    function handleEscape(e) {
        if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
            closeMenu();
            toggle.focus();
        }
    }

    function handleResize() {
        if (window.innerWidth >= MOBILE_BREAKPOINT && drawer.classList.contains('is-open')) {
            closeMenu();
        }
    }

    toggle.addEventListener('click', toggleMenu);
    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }
    document.addEventListener('keydown', handleEscape);
    window.addEventListener('resize', handleResize);

    document.querySelectorAll(NAV_LINKS_SELECTOR).forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    drawer.setAttribute('aria-hidden', 'true');
    if (typeof drawer.inert !== 'undefined') {
        drawer.inert = true;
    }
}
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#' || !href)
                return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
            }
        });
    });
}
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header)
        return;
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 100) {
            header.classList.add('is-scrolled');
        }
        else {
            header.classList.remove('is-scrolled');
        }
        lastScroll = currentScroll;
    }, { passive: true });
}
function init() {
    initMobileMenu();
    initSmoothScroll();
    initHeaderScroll();
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
}
else {
    init();
}
