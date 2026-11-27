document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('navMenu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      toggle.textContent = open ? 'Close' : 'Menu';
    });
  }

  // Store hours indicator (10:00 AM - 10:00 PM)
  const badge = document.getElementById('hoursBadge');
  if (badge) {
    const hr = new Date().getHours();
    const open = hr >= 10 && hr < 22;
    const label = badge.querySelector('.hours-text');

    badge.classList.add(open ? 'is-open' : 'is-closed');
    label.textContent = open ? 'Open now · Until 10 PM' : 'Closed · Opens 10 AM';
  }

  // Calm scroll fade-in
  const fades = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window && fades.length) {
    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    fades.forEach((el) => io.observe(el));
  } else {
    fades.forEach((el) => el.classList.add('visible'));
  }

  // Collection filter
  const filters = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.catalog-item');

  if (filters.length && items.length) {
    filters.forEach((btn) => {
      btn.addEventListener('click', () => {
        filters.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const group = btn.dataset.filter;
        items.forEach((item) => {
          item.classList.toggle('hidden', group !== 'all' && item.dataset.category !== group);
        });
      });
    });
  }

  // Custom tailoring inquiry builder (services.html)
  const styleSel = document.getElementById('planGarment');
  const clothSel = document.getElementById('planFabric');
  const lookSel = document.getElementById('planPattern');
  const fitSel = document.getElementById('planFit');
  const waBtn = document.getElementById('waPlanBtn');

  function syncPlan() {
    if (!styleSel || !waBtn) return;

    const style = styleSel.value;
    const cloth = clothSel.value;
    const look = lookSel.value;
    const fit = fitSel.value;

    document.getElementById('sumGarment').textContent = style;
    document.getElementById('sumFabric').textContent = cloth;
    document.getElementById('sumPattern').textContent = look;
    document.getElementById('sumFit').textContent = fit;

    const text =
      `Hello MILAN Fabrics & Tailoring, I'd like to enquire about custom stitching:\n` +
      `- Style: ${style}\n` +
      `- Fabric: ${cloth}\n` +
      `- Pattern: ${look}\n` +
      `- Fit: ${fit}`;

    waBtn.href = `https://wa.me/919486653515?text=${encodeURIComponent(text)}`;
  }

  if (styleSel) {
    [styleSel, clothSel, lookSel, fitSel].forEach((el) => el.addEventListener('change', syncPlan));
    syncPlan();
  }

  // Contact inquiry form (contact.html)
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (form && status) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('custName').value.trim();
      const phone = document.getElementById('custPhone').value.trim();
      const dept = document.getElementById('custService').value;
      const notes = document.getElementById('custNotes').value.trim();

      if (!name || phone.replace(/\D/g, '').length < 10) {
        status.className = 'form-status err';
        status.textContent = 'Please enter your name and a valid 10-digit phone number.';
        return;
      }

      const waUrl = `https://wa.me/919486653515?text=${encodeURIComponent(
        `Hi MILAN Fabrics & Tailoring, I'm ${name} (${phone}). Looking for: ${dept}. ${notes}`
      )}`;

      status.className = 'form-status ok';
      status.innerHTML = `Thank you, ${name}. Your note for <strong>${dept}</strong> is ready — <a href="${waUrl}" target="_blank" rel="noopener" style="text-decoration:underline;color:#f2ede3;">send on WhatsApp &rarr;</a>`;
      form.reset();
    });
  }
});
