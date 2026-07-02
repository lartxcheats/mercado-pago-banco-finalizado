(() => {
  // ── Button press feedback ─────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    .nav-press { transform: scale(0.96) !important; transition: transform 100ms ease !important; }
  `;
  document.head.appendChild(style);

  document.addEventListener('pointerdown', e => {
    const btn = e.target.closest('button, a, [role="button"], .search-input-wrap');
    if (!btn) return;
    btn.classList.add('nav-press');
    const up = () => { btn.classList.remove('nav-press'); window.removeEventListener('pointerup', up); };
    window.addEventListener('pointerup', up);
  }, { passive: true });

  // Expõe navegação global (compatibilidade com onclicks existentes)
  window.navigateTo = (url) => { window.location.href = url; };
})();
